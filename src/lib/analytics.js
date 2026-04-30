/**
 * Idle-loaded Google Tag Manager container.
 * GA4 is configured as a tag inside GTM — no standalone gtag.js needed.
 * Custom event tracking is handled via dataLayer pushes throughout the codebase.
 */
export function loadAnalytics() {
  if (import.meta.env.DEV) return

  const gtmId = import.meta.env.VITE_GTM_ID
  if (!gtmId) return

  const load = () => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })

    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
    document.head.appendChild(s)
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(load, { timeout: 4000 })
  } else {
    setTimeout(load, 3500)
  }
}
