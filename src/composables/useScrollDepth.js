import { onMounted, onUnmounted } from 'vue'
import posthog from 'posthog-js'

/**
 * Tracks scroll depth milestones (25%, 50%, 75%, 100%) and fires
 * a PostHog event when each threshold is crossed for the first time.
 *
 * @param {string} eventName - e.g. 'project:scroll_depth' or 'blog:scroll_depth'
 * @param {() => Record<string, any>} getProps - returns extra properties (slug, title, etc.)
 */
export function useScrollDepth(eventName, getProps = () => ({})) {
  const thresholds = [25, 50, 75, 100]
  const fired = new Set()

  function onScroll() {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    if (docHeight <= 0) return

    const pct = Math.round((scrollTop / docHeight) * 100)

    for (const t of thresholds) {
      if (pct >= t && !fired.has(t)) {
        fired.add(t)
        posthog.capture(eventName, { depth: t, ...getProps() })
      }
    }
  }

  onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    fired.clear()
  })
}
