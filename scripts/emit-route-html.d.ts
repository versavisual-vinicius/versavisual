export const SITE_URL: string
export const DEFAULT_OG_IMAGE: string

export function absoluteUrl(pathname?: string): string
export function escapeHtmlAttribute(value?: string): string
export function escapeJsonLd(value: unknown): string
export function renderSeoHead(meta: Record<string, unknown>): string
export function injectSeoHead(html: string, renderedHead: string): string
export function routeOutputPath(distDir: string, routePath: string): string
export function buildRouteJsonLd(
  route: string,
  meta: Record<string, unknown>,
): unknown
export function loadSeoManifest(
  projectRoot: string,
): Promise<Map<string, Record<string, unknown>>>
export function emitAllRouteHtml(projectRoot?: string): Promise<number>
