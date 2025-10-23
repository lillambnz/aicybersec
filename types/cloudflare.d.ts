// Type definitions for Cloudflare Pages Functions

interface Env {
  DB: D1Database
  KV: KVNamespace
  R2: R2Bucket
  AI: any
  ANALYTICS?: AnalyticsEngineDataset
  SITE_URL?: string
  CONTACT_EMAIL?: string
}

interface PagesFunction<Env = unknown> {
  (context: {
    request: Request
    env: Env
    params: Record<string, string>
    waitUntil: (promise: Promise<any>) => void
    next: () => Promise<Response>
    data: Record<string, any>
  }): Promise<Response> | Response
}
