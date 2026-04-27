/**
 * Idle-loaded GA4 analytics.
 * Replaces the render-blocking GTM script with a deferred, non-blocking GA4 loader.
 * Custom event tracking is handled by Umami (src/analytics/umami.js).
 */
export function loadAnalytics() {
  if (import.meta.env.DEV) return

  const load = () => {
    const s = document.createElement('script')
    s.async = true
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-5KLWWQ8D8V'
    document.head.appendChild(s)

    window.dataLayer = window.dataLayer || []
    function gtag() { window.dataLayer.push(arguments) }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', 'G-5KLWWQ8D8V', { send_page_view: true })
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(load, { timeout: 4000 })
  } else {
    setTimeout(load, 3500)
  }
}
