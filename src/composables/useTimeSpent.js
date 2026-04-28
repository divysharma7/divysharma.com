import { onMounted, onUnmounted } from 'vue'
import posthog from 'posthog-js'

/**
 * Tracks total time spent on a page and fires a PostHog event on unmount.
 *
 * @param {string} eventName - e.g. 'project:time_spent' or 'blog:time_spent'
 * @param {() => Record<string, any>} getProps - returns extra properties (slug, title, etc.)
 */
export function useTimeSpent(eventName, getProps = () => ({})) {
  let startTime = 0

  onMounted(() => {
    startTime = Date.now()
  })

  onUnmounted(() => {
    if (!startTime) return
    const seconds = Math.round((Date.now() - startTime) / 1000)
    if (seconds < 2) return // ignore bounces
    posthog.capture(eventName, { seconds, ...getProps() })
  })
}
