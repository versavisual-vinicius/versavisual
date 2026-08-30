#!/usr/bin/env node

/**
 * VERSAVISUAL E2E Master Test Runner (Tiers 1 to 4)
 * Executes all 4 Tiers across all 32 features with timing, categorization, and formatted summary.
 */

import { runner } from "./utils/test-framework.ts"
import { runTier1NavigationShellTests } from "./tier1/tier1_navigation_shell.test.ts"
import { runTier1DesignTokensTypographyTests } from "./tier1/tier1_design_tokens_typography.test.ts"
import { runTier1TypeScriptRoutingSitemapTests } from "./tier1/tier1_typescript_routing_sitemap.test.ts"
import { runTier1HomeComponentsTests } from "./tier1/tier1_home_components.test.ts"
import { runTier1PortfolioFeaturesTests } from "./tier1/tier1_portfolio_features.test.ts"
import { runTier1SegmentPagesInteractiveTests } from "./tier1/tier1_segment_pages_interactive.test.ts"
import { runTier1DiagnosticLeadApiTests } from "./tier1/tier1_diagnostic_lead_api.test.ts"
import { runTier1SeoBuildSsgTests } from "./tier1/tier1_seo_build_ssg.test.ts"
import { runTier1SeoRouteManifestTests } from "./tier1/tier1_seo_route_manifest.test.ts"
import { runTier1SeoEmitterTests } from "./tier1/tier1_seo_emitter.test.ts"
import { runTier1StructuredDataRoutesTests } from "./tier1/tier1_structured_data_routes.test.ts"
import { runTier2BoundaryCornerCasesTests } from "./tier2/tier2_boundary_corner_cases.test.ts"
import { runTier3CrossFeatureCombinationsTests } from "./tier3/tier3_cross_feature_combinations.test.ts"
import { runTier4RealWorldScenariosTests } from "./tier4/tier4_real_world_scenarios.test.ts"

async function main() {
  console.log(
    "\x1b[1m\x1b[36m===========================================================================\x1b[0m",
  )
  console.log(
    "\x1b[1m\x1b[32m🚀 INICIANDO SUÍTE DE TESTES E2E VERSAVISUAL (TIERS 1 A 4)\x1b[0m",
  )
  console.log(
    "\x1b[1m\x1b[36m===========================================================================\x1b[0m",
  )

  // --- TIER 1: FEATURE COVERAGE (ALL 32 FEATURES) ---
  await runTier1NavigationShellTests()
  await runTier1DesignTokensTypographyTests()
  await runTier1TypeScriptRoutingSitemapTests()
  await runTier1HomeComponentsTests()
  await runTier1PortfolioFeaturesTests()
  await runTier1SegmentPagesInteractiveTests()
  await runTier1DiagnosticLeadApiTests()
  await runTier1SeoBuildSsgTests()
  await runTier1SeoRouteManifestTests()
  await runTier1SeoEmitterTests()
  await runTier1StructuredDataRoutesTests()

  // --- TIER 2: BOUNDARY & CORNER CASES ---
  await runTier2BoundaryCornerCasesTests()

  // --- TIER 3: CROSS-FEATURE COMBINATIONS ---
  await runTier3CrossFeatureCombinationsTests()

  // --- TIER 4: REAL-WORLD APPLICATION SCENARIOS ---
  await runTier4RealWorldScenariosTests()

  // Print Final Summary
  const { total, passed, failed, totalDuration } = runner.printSummary()

  if (failed > 0) {
    console.error(
      `\x1b[31m❌ Execução finalizada com ${failed} falha(s).\x1b[0m\n`,
    )
    process.exit(1)
  } else {
    console.log(
      `\x1b[32m✨ Todos os ${passed} testes foram executados com 100% DE SUCESSO!\x1b[0m\n`,
    )
    process.exit(0)
  }
}

main().catch((err) => {
  console.error("Fatal Error running test suite:", err)
  process.exit(1)
})
