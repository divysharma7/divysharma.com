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
import { loadUmamiScript, trackPage } from './analytics/umami'
import { loadAnalytics } from './lib/analytics'
import DOMPurify from 'dompurify'

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
			throw new Error(`[CSP] Blocked: createScriptURL — ${s}`)
		}
	})
}

const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
  console.error(`[Vue Error] ${info}:`, err)
}

window.addEventListener('unhandledrejection', (event) => {
  console.error('[Unhandled Promise]', event.reason)
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

// @ts-ignore
app.use(AOS.init())

app.use(head)

app.use(router)

router.isReady().then(async () => {
    await loadUmamiScript()

    // Track the initial view
    trackPage(router.currentRoute.value.fullPath, document.title)

    // Track subsequent SPA navigations
    router.afterEach(async (to) => {
        // Wait for document.title updates by Vue/head
        await new Promise(resolve => setTimeout(resolve, 50))
        trackPage(to.fullPath, document.title)

        // dataLayer push for GA4 (loaded via idle callback)
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
            event: 'page_view',
            page_path: to.fullPath,
            page_title: document.title
        })
    })

    app.mount('#app')

    // Load GA4 + Speed Insights after mount, during idle time
    loadAnalytics()
    if (import.meta.env.PROD) {
        import('@vercel/speed-insights').then(({ injectSpeedInsights }) => {
            window.requestIdleCallback
                ? window.requestIdleCallback(() => injectSpeedInsights(), { timeout: 5000 })
                : setTimeout(() => injectSpeedInsights(), 4000)
        })
    }
})
