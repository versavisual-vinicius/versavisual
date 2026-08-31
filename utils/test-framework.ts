/**
 * VERSAVISUAL E2E Test Framework
 * Ultra-fast, zero-dependency, self-contained test engine with rich assertions,
 * tier categorization, timing, and formatted CLI output.
 */

export interface TestResult {
  tier: string
  suite: string
  name: string
  passed: boolean
  durationMs: number
  error?: Error | unknown
}

export class TestRunner {
  private results: TestResult[] = []
  private currentTier = "Tier 1 - Feature Coverage"
  private currentSuite = "General"
  private queue: Promise<void> = Promise.resolve()

  setTier(tier: string) {
    this.currentTier = tier
  }

  setSuite(suite: string) {
    this.currentSuite = suite
  }

  test(name: string, fn: () => void | Promise<void>) {
    const tierAtCall = this.currentTier
    const suiteAtCall = this.currentSuite
    this.queue = this.queue.then(async () => {
      const start = performance.now()
      try {
        await fn()
        const durationMs = performance.now() - start
        this.results.push({
          tier: tierAtCall,
          suite: suiteAtCall,
          name,
          passed: true,
          durationMs,
        })
        process.stdout.write(
          `  \x1b[32m✓\x1b[0m \x1b[90m[${tierAtCall.split(" - ")[0]}]\x1b[0m ${name} \x1b[90m(${durationMs.toFixed(1)}ms)\x1b[0m\n`,
        )
      } catch (err) {
        const durationMs = performance.now() - start
        this.results.push({
          tier: tierAtCall,
          suite: suiteAtCall,
          name,
          passed: false,
          durationMs,
          error: err,
        })
        process.stdout.write(
          `  \x1b[31m✗\x1b[0m \x1b[90m[${tierAtCall.split(" - ")[0]}]\x1b[0m \x1b[31m${name}\x1b[0m\n`,
        )
        if (err instanceof Error) {
          console.error(`    \x1b[31m${err.message}\x1b[0m`)
          if (err.stack) {
            const stackLines = err.stack.split("\n").slice(1, 4).join("\n")
            console.error(`    \x1b[90m${stackLines}\x1b[0m`)
          }
        } else {
          console.error(`    \x1b[31m${String(err)}\x1b[0m`)
        }
      }
    })
    return this.queue
  }

  async wait() {
    await this.queue
  }

  getResults() {
    return this.results
  }

  printSummary() {
    const total = this.results.length
    const passed = this.results.filter((r) => r.passed).length
    const failed = this.results.filter((r) => !r.passed).length
    const totalDuration = this.results.reduce((acc, r) => acc + r.durationMs, 0)

    // Group by Tier
    const tiers = Array.from(new Set(this.results.map((r) => r.tier)))

    console.log("\n" + "=".repeat(75))
    console.log(
      "\x1b[1m\x1b[36mVERSAVISUAL E2E TEST SUITE EXECUTION SUMMARY\x1b[0m",
    )
    console.log("=".repeat(75))

    for (const tier of tiers) {
      const tierResults = this.results.filter((r) => r.tier === tier)
      const tPassed = tierResults.filter((r) => r.passed).length
      const tFailed = tierResults.filter((r) => !r.passed).length
      const color = tFailed === 0 ? "\x1b[32m" : "\x1b[31m"
      console.log(
        `\x1b[1m${tier.padEnd(42)}\x1b[0m : ${color}${tPassed}/${tierResults.length} passed\x1b[0m ${
          tFailed > 0 ? `(\x1b[31m${tFailed} failed\x1b[0m)` : ""
        }`,
      )
    }

    console.log("-".repeat(75))
    console.log(
      `\x1b[1mTotal Tests:\x1b[0m ${total} | \x1b[32mPassed: ${passed}\x1b[0m | \x1b[31mFailed: ${failed}\x1b[0m | Duration: ${(totalDuration / 1000).toFixed(2)}s`,
    )
    console.log("=".repeat(75) + "\n")

    return { total, passed, failed, totalDuration }
  }
}

export const runner = new TestRunner()

export async function describe(
  suiteName: string,
  fn: () => void | Promise<void>,
) {
  runner.setSuite(suiteName)
  console.log(`\n\x1b[1m\x1b[34m▶ ${suiteName}\x1b[0m`)
  await fn()
  await runner.wait()
}

export function test(testName: string, fn: () => void | Promise<void>) {
  return runner.test(testName, fn)
}

export function it(testName: string, fn: () => void | Promise<void>) {
  return runner.test(testName, fn)
}

export function expect<T>(actual: T) {
  return {
    toBe(expected: T) {
      if (actual !== expected) {
        throw new Error(
          `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`,
        )
      }
    },
    toEqual(expected: unknown) {
      const a = JSON.stringify(actual)
      const b = JSON.stringify(expected)
      if (a !== b) {
        throw new Error(
          `Expected deep equality:\nExpected: ${b}\nReceived: ${a}`,
        )
      }
    },
    toContain(substrOrItem: string | unknown) {
      if (typeof actual === "string" && typeof substrOrItem === "string") {
        if (!actual.includes(substrOrItem)) {
          throw new Error(
            `Expected string to contain "${substrOrItem}", but it was not found`,
          )
        }
      } else if (Array.isArray(actual)) {
        if (
          !actual.some(
            (x) =>
              x === substrOrItem ||
              JSON.stringify(x) === JSON.stringify(substrOrItem),
          )
        ) {
          throw new Error(
            `Expected array to contain item ${JSON.stringify(substrOrItem)}`,
          )
        }
      } else {
        throw new Error(
          `toContain only supports strings and arrays, received: ${typeof actual}`,
        )
      }
    },
    toMatch(regex: RegExp) {
      if (typeof actual !== "string" || !regex.test(actual)) {
        throw new Error(`Expected "${actual}" to match pattern ${regex}`)
      }
    },
    toBeTruthy() {
      if (!actual) {
        throw new Error(
          `Expected truthy value, but got ${JSON.stringify(actual)}`,
        )
      }
    },
    toBeFalsy() {
      if (actual) {
        throw new Error(
          `Expected falsy value, but got ${JSON.stringify(actual)}`,
        )
      }
    },
    toBeNull() {
      if (actual !== null) {
        throw new Error(`Expected null, but got ${JSON.stringify(actual)}`)
      }
    },
    toBeUndefined() {
      if (actual !== undefined) {
        throw new Error(`Expected undefined, but got ${JSON.stringify(actual)}`)
      }
    },
    toBeDefined() {
      if (actual === undefined) {
        throw new Error(`Expected value to be defined, but got undefined`)
      }
    },
    toBeGreaterThan(expected: number) {
      if (typeof actual !== "number" || actual <= expected) {
        throw new Error(`Expected ${actual} to be greater than ${expected}`)
      }
    },
    toBeGreaterThanOrEqual(expected: number) {
      if (typeof actual !== "number" || actual < expected) {
        throw new Error(
          `Expected ${actual} to be greater than or equal to ${expected}`,
        )
      }
    },
    toBeLessThan(expected: number) {
      if (typeof actual !== "number" || actual >= expected) {
        throw new Error(`Expected ${actual} to be less than ${expected}`)
      }
    },
    toBeLessThanOrEqual(expected: number) {
      if (typeof actual !== "number" || actual > expected) {
        throw new Error(
          `Expected ${actual} to be less than or equal to ${expected}`,
        )
      }
    },
    toHaveLength(expected: number) {
      const len = (actual as { length?: number })?.length
      if (len !== expected) {
        throw new Error(`Expected length ${expected}, but got ${len}`)
      }
    },
    toHaveProperty(prop: string, expectedValue?: unknown) {
      if (typeof actual !== "object" || actual === null || !(prop in actual)) {
        throw new Error(`Expected object to have property "${prop}"`)
      }
      if (expectedValue !== undefined) {
        const val = (actual as Record<string, unknown>)[prop]
        if (JSON.stringify(val) !== JSON.stringify(expectedValue)) {
          throw new Error(
            `Expected property "${prop}" to equal ${JSON.stringify(expectedValue)}, but got ${JSON.stringify(val)}`,
          )
        }
      }
    },
    toThrow(expectedMsg?: string | RegExp) {
      if (typeof actual !== "function") {
        throw new Error(
          `toThrow requires a function, received ${typeof actual}`,
        )
      }
      let threw = false
      let thrownError: unknown = null
      try {
        actual()
      } catch (e) {
        threw = true
        thrownError = e
      }
      if (!threw) {
        throw new Error(
          `Expected function to throw an error, but it returned successfully`,
        )
      }
      if (expectedMsg) {
        const msg =
          thrownError instanceof Error
            ? thrownError.message
            : String(thrownError)
        if (typeof expectedMsg === "string" && !msg.includes(expectedMsg)) {
          throw new Error(
            `Expected error message to contain "${expectedMsg}", but got "${msg}"`,
          )
        }
        if (expectedMsg instanceof RegExp && !expectedMsg.test(msg)) {
          throw new Error(
            `Expected error message to match ${expectedMsg}, but got "${msg}"`,
          )
        }
      }
    },
    get not() {
      return {
        toBe(expected: T) {
          if (actual === expected) {
            throw new Error(
              `Expected value NOT to be ${JSON.stringify(expected)}`,
            )
          }
        },
        toEqual(expected: unknown) {
          if (JSON.stringify(actual) === JSON.stringify(expected)) {
            throw new Error(
              `Expected value NOT to equal ${JSON.stringify(expected)}`,
            )
          }
        },
        toContain(substrOrItem: string | unknown) {
          if (typeof actual === "string" && typeof substrOrItem === "string") {
            if (actual.includes(substrOrItem)) {
              throw new Error(
                `Expected string NOT to contain "${substrOrItem}"`,
              )
            }
          } else if (Array.isArray(actual)) {
            if (
              actual.some(
                (x) =>
                  x === substrOrItem ||
                  JSON.stringify(x) === JSON.stringify(substrOrItem),
              )
            ) {
              throw new Error(
                `Expected array NOT to contain ${JSON.stringify(substrOrItem)}`,
              )
            }
          }
        },
        toMatch(regex: RegExp) {
          if (typeof actual === "string" && regex.test(actual)) {
            throw new Error(
              `Expected "${actual}" NOT to match pattern ${regex}`,
            )
          }
        },
        toBeTruthy() {
          if (actual) {
            throw new Error(`Expected value NOT to be truthy`)
          }
        },
        toBeFalsy() {
          if (!actual) {
            throw new Error(`Expected value NOT to be falsy`)
          }
        },
        toBeNull() {
          if (actual === null) {
            throw new Error(`Expected value NOT to be null`)
          }
        },
        toBeUndefined() {
          if (actual === undefined) {
            throw new Error(`Expected value NOT to be undefined`)
          }
        },
        toBeDefined() {
          if (actual !== undefined) {
            throw new Error(`Expected value NOT to be defined`)
          }
        },
        toThrow() {
          if (typeof actual !== "function") {
            throw new Error(`toThrow requires a function`)
          }
          let threw = false
          try {
            actual()
          } catch {
            threw = true
          }
          if (threw) {
            throw new Error(
              `Expected function NOT to throw, but it threw an error`,
            )
          }
        },
      }
    },
    toSatisfy(
      predicate: (val: T) => boolean,
      description = "predicate function",
    ) {
      if (!predicate(actual)) {
        throw new Error(
          `Value ${JSON.stringify(actual)} failed to satisfy ${description}`,
        )
      }
    },
  }
}
