import App from './App.vue'
import { routes } from './routes.js'
import './assets/css/normal.css'
import './assets/css/tokens.css'
import './assets/css/global.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'
import DOMPurify from 'dompurify'
import posthog from 'posthog-js'

// Defer PostHog init to avoid blocking first paint.
// Note: posthog-js silently drops capture() calls made before init() completes
// (it does NOT queue them). This is acceptable here because:
// - router.afterEach is registered after router.isReady(), so it only fires on
//   subsequent navigations — by then init will have completed (max 3.5s).
// - captureException in error handlers: losing errors in the first ~3.5s is an
//   acceptable tradeoff vs. blocking rendering for all users.
const initPostHog = () => {
  posthog.init(import.meta.env.VITE_POSTHOG_PROJECT_TOKEN || '', {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com',
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
  })
}
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(initPostHog, { timeout: 3500 })
} else {
  setTimeout(initPostHog, 3000)
}

// Trusted Types policies — must run before createApp/mount
// See SECURITY.md for policy rationale
if (window.trustedTypes && window.trustedTypes.createPolicy) {
	// 'vue' policy: handles Vue's internal innerHTML writes (v-html directive, SVG rendering)
	// Both v-html usages in this app are developer-authored static content — see comments
	// on ChatWidget.vue:56 and BlogDetail.vue:47 for per-site safety justifications
	window.trustedTypes.createPolicy('vue', {
		createHTML: (s) => s
	})

	// 'default' policy: catch-all for any other HTML sink not already covered
	// Sanitizes via DOMPurify before allowing injection
	window.trustedTypes.createPolicy('default', {
		createHTML: (s) => DOMPurify.sanitize(s, { RETURN_TRUSTED_TYPE: false }),
		createScript: () => {
			throw new Error('[CSP] Blocked: createScript via default policy')
		},
		createScriptURL: (s) => {
			const allowed = ['/_vercel/', 'https://www.googletagmanager.com/']
			if (allowed.some(prefix => s.startsWith(prefix))) return s
			throw new Error(`[CSP] Blocked: createScriptURL — ${s}`)
		}
	})
}

const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
  console.error(`[Vue Error] ${info}:`, err)
  posthog.captureException(err)
}

window.addEventListener('unhandledrejection', (event) => {
  console.error('[Unhandled Promise]', event.reason)
  posthog.captureException(event.reason)
})
const head = createHead()

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth'
            }
        } else {
            return { top: 0 }
        }
    }
})

AOS.init()

app.use(head)

app.use(router)

router.isReady().then(async () => {
    // Track SPA navigations via GA4 + PostHog
    router.afterEach(async (to) => {
        await new Promise(resolve => setTimeout(resolve, 50))
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
            event: 'page_view',
            page_path: to.fullPath,
            page_title: document.title
        })
        posthog.capture('$pageview', {
            $current_url: window.location.origin + to.fullPath,
        })
    })

    app.mount('#app')

    // Load Speed Insights after mount, during idle time
    if (import.meta.env.PROD && __VERCEL__) {
        import('@vercel/speed-insights').then(({ injectSpeedInsights }) => {
            window.requestIdleCallback
                ? window.requestIdleCallback(() => injectSpeedInsights(), { timeout: 5000 })
                : setTimeout(() => injectSpeedInsights(), 4000)
        })
    }
})
