/**
 * Idle-loaded GA4 analytics.
 * Replaces the render-blocking GTM script with a deferred, non-blocking GA4 loader.
 * Custom event tracking is handled via GTM dataLayer pushes.
 */
export function loadAnalytics() {
  if (import.meta.env.DEV) return

  const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID
  if (!measurementId) return

  const load = () => {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(s)

    window.dataLayer = window.dataLayer || []
    function gtag() { window.dataLayer.push(arguments) }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', measurementId, { send_page_view: true })
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(load, { timeout: 4000 })
  } else {
    setTimeout(load, 3500)
  }
}
