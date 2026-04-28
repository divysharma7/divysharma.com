import { ref, onMounted, onUnmounted } from 'vue'

export function useCountUp(targetRef, endValues, duration = 1500) {
  const values = ref(endValues.map(() => 0))
  let observer = null

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4)
  }

  function animate() {
    const start = performance.now()
    function step(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutQuart(progress)
      values.value = endValues.map(v => Math.round(eased * v))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  onMounted(() => {
    if (!targetRef.value) return
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(targetRef.value)
  })

  onUnmounted(() => observer?.disconnect())

  return values
}
