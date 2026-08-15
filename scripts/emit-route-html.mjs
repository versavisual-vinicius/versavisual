import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const distDir = path.join(root, "dist")
const siteUrl = "https://www.versavisual.com.br"
const indexHtml = await readFile(path.join(distDir, "index.html"), "utf8")
const sitemap = await readFile(path.join(root, "public", "sitemap.xml"), "utf8")

const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => new URL(match[1]))
  .filter((url) => url.origin === siteUrl)
  .map((url) => url.pathname.replace(/\/$/, ""))
  .filter((pathname) => pathname && pathname !== "/")

await Promise.all(
  routes.map(async (route) => {
    const routeDir = path.join(distDir, route)
    await mkdir(routeDir, { recursive: true })
    await writeFile(path.join(routeDir, "index.html"), indexHtml)
  }),
)

console.log(`Emitted ${routes.length} route HTML files.`)
