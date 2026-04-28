<template>
  <section :id="sectionId" class="water-loss-stats">
    <div class="flow-bg" aria-hidden="true">
      <svg class="flow-svg" viewBox="0 0 1200 60" preserveAspectRatio="none">
        <path d="M0,30 C200,10 400,50 600,30 C800,10 1000,50 1200,30" fill="none" stroke="#85B7EB" stroke-width="2" />
        <path class="flow-line-2" d="M0,40 C200,60 400,20 600,40 C800,60 1000,20 1200,40" fill="none" stroke="#85B7EB" stroke-width="1.5" />
      </svg>
    </div>

    <div ref="container" class="wls-inner">
      <div class="headline">
        <span class="counter">{{ formattedCount }}</span>
        <p class="subtitle">litres of water wasted in India every day.</p>
      </div>

      <div class="secondary" :class="{ visible: showSecondary }">
        <div
          v-for="(s, i) in secondaryStats"
          :key="i"
          class="sec-stat"
          :style="{ transitionDelay: i * 200 + 'ms' }"
        >
          <span class="sec-value">{{ s.value }}</span>
          <span class="sec-label">{{ s.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { slugify } from '../sections/utils'

const props = defineProps({ data: Object })
const sectionId = computed(() => props.data?.title ? slugify(props.data.title) : undefined)

const container = ref(null)
const currentCount = ref(0)
const showSecondary = ref(false)

const TARGET = 360000000

const secondaryStats = [
  { value: '30–40%', label: 'total water flow lost in distribution' },
  { value: '2030', label: 'the year demand will double' },
  { value: '88%', label: 'households without clean drinking water by 2030' },
]

const formattedCount = computed(() => currentCount.value.toLocaleString('en-IN'))

let observer = null

function animateCount() {
  const duration = 2500
  const start = performance.now()
  function step(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 4)
    currentCount.value = Math.round(eased * TARGET)
    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      showSecondary.value = true
    }
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    currentCount.value = TARGET
    showSecondary.value = true
    return
  }
  if (!container.value) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animateCount()
        observer.disconnect()
      }
    },
    { threshold: 0.3 }
  )
  observer.observe(container.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.water-loss-stats {
  position: relative;
  padding: 96px 0;
  overflow: hidden;
  margin-bottom: 3rem;
}

.flow-bg {
  position: absolute;
  inset: 0;
  opacity: 0.15;
  pointer-events: none;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
}

.flow-svg {
  width: 200%;
  height: 100%;
  animation: flowLeft 8s linear infinite;
}

.flow-line-2 {
  opacity: 0.7;
}

@keyframes flowLeft {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .flow-svg { animation: none; }
}

.wls-inner {
  position: relative;
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.counter {
  display: block;
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
  color: #1D9E75;
}

.subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #0C2340;
  margin: 0.75rem 0 0;
  font-weight: 400;
}

.secondary {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 3rem;
}

.sec-stat {
  text-align: center;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.secondary.visible .sec-stat {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .sec-stat {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

.sec-value {
  display: block;
  font-size: 2rem;
  font-weight: 600;
  color: #0C2340;
  line-height: 1.2;
}

.sec-label {
  display: block;
  font-size: 0.875rem;
  color: #5F5E5A;
  margin-top: 0.25rem;
  max-width: 160px;
}

@media (max-width: 640px) {
  .water-loss-stats { padding: 64px 0; }
  .secondary {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
}
</style>
