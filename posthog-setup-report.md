<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into divysharma.com. `posthog-js` was installed and initialized in `src/main.js` before the Vue app mounts, with the EU cloud host. The existing Vue `errorHandler` and `window.unhandledrejection` listener were extended to forward exceptions to PostHog via `captureException`. Twelve custom events were instrumented across seven files, placed alongside existing GTM `dataLayer` pushes without replacing them.

| Event | Description | File |
|---|---|---|
| `contact:message_sent` | User successfully submits the contact form — primary conversion | `src/components/ContactForm.vue` |
| `contact:form_error` | Contact form submission fails | `src/components/ContactForm.vue` |
| `click:resume_download` | User downloads the resume via the FAB button | `src/components/ResumeViewer.vue` |
| `cta:book_call` | User opens the 1:1 booking modal — high-intent conversion | `src/components/CTA.vue` |
| `cta:booking_close` | User closes the booking modal | `src/components/CTA.vue` |
| `blog:post_viewed` | User lands on a specific blog post — top of content funnel | `src/views/BlogDetail.vue` |
| `blog:share` | User shares a post on Twitter or LinkedIn | `src/views/BlogDetail.vue` |
| `blog:copy_link` | User copies the blog post share link | `src/views/BlogDetail.vue` |
| `project:viewed` | User lands on a project detail page | `src/views/projects/project.vue` |
| `click:social` | User clicks a social link from the hero | `src/views/Home.vue` |
| `click:blog_card` | User clicks a blog card on the home page | `src/views/Home.vue` |
| `click:explore_card` | User clicks an explore card (design, achievements, events…) | `src/views/Explore.vue` |

## LLM analytics

PostHog LLM analytics has been integrated into the portfolio's AI chat feature (`api/chat.js`), which uses the Vercel AI SDK with Mistral (`mistral-large-latest`). Every chat completion is now traced as a `$ai_generation` event in PostHog, capturing model name, latency, input/output tokens, and cost.

**Packages added:** `@posthog/ai`, `@opentelemetry/sdk-trace-base`, `@opentelemetry/resources`

**Files changed:**

| File | Change |
|---|---|
| `api/_otel.js` | New module — initialises `BasicTracerProvider` with `PostHogSpanProcessor` (edge-compatible, runs once per cold start) |
| `api/chat.js` | Imports `initOtel()` at module level; adds `experimental_telemetry: { isEnabled: true, functionId: 'portfolio-chat' }` to the `streamText` call |

Each `$ai_generation` event automatically records `$ai_model`, `$ai_latency`, `$ai_input_tokens`, `$ai_output_tokens`, `$ai_total_cost_usd`, and the full input/output. View traces under **LLM Analytics** in PostHog.

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://eu.posthog.com/project/168545/dashboard/649442
- **Contact form submissions over time**: https://eu.posthog.com/project/168545/insights/VbPt1A9P
- **Book-a-call conversion funnel**: https://eu.posthog.com/project/168545/insights/WRyah1KB
- **Resume downloads over time**: https://eu.posthog.com/project/168545/insights/FIUGYtau
- **Blog engagement — views, shares, and link copies**: https://eu.posthog.com/project/168545/insights/qPYVIhAy
- **Social clicks by platform**: https://eu.posthog.com/project/168545/insights/3sAIFRHF

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-vue-3/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
