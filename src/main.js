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
