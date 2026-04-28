/**
 * OpenTelemetry provider setup for PostHog LLM analytics.
 * Uses BasicTracerProvider (edge-compatible) instead of sdk-node.
 * Import this module once at the top of any API file that uses Vercel AI SDK.
 */
import { BasicTracerProvider } from '@opentelemetry/sdk-trace-base'
import { Resource } from '@opentelemetry/resources'
import { PostHogSpanProcessor } from '@posthog/ai/otel'

let _initialized = false

export function initOtel() {
  if (_initialized) return
  _initialized = true

  const provider = new BasicTracerProvider({
    resource: new Resource({ 'service.name': 'divysharma-chat' }),
  })

  provider.addSpanProcessor(
    new PostHogSpanProcessor({
      apiKey: process.env.VITE_POSTHOG_PROJECT_TOKEN || '',
      host: process.env.VITE_POSTHOG_HOST || '',
    }),
  )

  provider.register()
}
