<template>
  <section class="survey-results">
    <div class="dotted-grid" aria-hidden="true"></div>

    <!-- Section A — Headline Stats -->
    <div ref="sectionA" class="survey-section">
      <h3 class="survey-h3">Awareness exists. Tools don't.</h3>
      <div class="stat-cards">
        <div v-for="(s, i) in headlineStats" :key="i" class="stat-card">
          <span class="stat-big">{{ animatedA[i] }}%</span>
          <span class="stat-desc">{{ s.label }}</span>
        </div>
      </div>
      <p class="survey-footer">Response collected from users 172</p>
    </div>

    <!-- Section B — Pie Chart: Monitor water usage? -->
    <div ref="sectionB" class="survey-section">
      <h3 class="survey-h3">Most don't monitor at all</h3>
      <div class="pie-layout">
        <div class="pie-container" :style="pieClipStyle">
          <svg viewBox="0 0 280 280" class="pie-svg" aria-label="Pie chart: 54.1% NO, 45.9% YES">
            <path :d="pieSlice(0, 194.76)" fill="#F2A623" />
            <path :d="pieSlice(194.76, 360)" fill="#0D2950" />
            <text x="100" y="150" class="pie-label">54.1%</text>
            <text x="195" y="170" class="pie-label">45.9%</text>
          </svg>
        </div>
        <div class="pie-legend">
          <div class="legend-item">
            <span class="legend-dot" style="background:#F2A623"></span>
            <span class="legend-text">NO</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot" style="background:#0D2950"></span>
            <span class="legend-text">YES</span>
          </div>
        </div>
      </div>
      <p class="survey-takeaway">More than half the respondents admitted to not monitoring their daily water usage.</p>
      <p class="survey-footer">Response collected from users 172</p>
    </div>

    <!-- Section C — Bar Chart: How do they check for leaks? -->
    <div ref="sectionC" class="survey-section">
      <h3 class="survey-h3">Manual checks dominate. Smart tools don't exist.</h3>
      <div class="bar-chart">
        <div v-for="(bar, i) in leakCheckBars" :key="i" class="bar-row">
          <span class="bar-label">{{ bar.label }}</span>
          <div class="bar-track">
            <div
              class="bar-fill"
              :style="{
                width: sectionCVisible ? bar.widthPct + '%' : '0%',
                backgroundColor: bar.color,
                transitionDelay: i * 100 + 'ms'
              }"
            ></div>
          </div>
          <span class="bar-value">{{ bar.count }} ({{ bar.pct }}%)</span>
        </div>
      </div>
      <p class="survey-takeaway">Most water leak checks happen manually, followed by people approaching plumbers once something breaks.</p>
      <p class="survey-footer">Response collected from users 172</p>
    </div>

    <!-- Section D — Bar Chart: Water-saving devices -->
    <div ref="sectionD" class="survey-section">
      <h3 class="survey-h3">Households are already buying water-saving products</h3>
      <p class="bar-caption">Multi-select question — totals exceed 100%</p>
      <div class="bar-chart">
        <div v-for="(bar, i) in deviceBars" :key="i" class="bar-row">
          <span class="bar-label">{{ bar.label }}</span>
          <div class="bar-track">
            <div
              class="bar-fill"
              :style="{
                width: sectionDVisible ? bar.widthPct + '%' : '0%',
                backgroundColor: bar.color,
                transitionDelay: i * 100 + 'ms'
              }"
            ></div>
          </div>
          <span class="bar-value">{{ bar.count }} ({{ bar.pct }}%)</span>
        </div>
      </div>
      <p class="survey-takeaway">People are aware of existing water-saving devices and open to new ones if introduced.</p>
      <p class="survey-footer">Response collected from users 172</p>
    </div>

    <!-- Section E — Bar Chart: Features wanted -->
    <div ref="sectionE" class="survey-section">
      <h3 class="survey-h3">Users asked for exactly what we built</h3>
      <p class="bar-caption">Multi-select question — totals exceed 100%</p>
      <div class="bar-chart">
        <div v-for="(bar, i) in featureBars" :key="i" class="bar-row">
          <span class="bar-label">
            {{ bar.label }}
            <span v-if="bar.highlight" class="shipped-tag">Shipped in v1</span>
          </span>
          <div class="bar-track">
            <div
              class="bar-fill"
              :style="{
                width: sectionEVisible ? bar.widthPct + '%' : '0%',
                backgroundColor: bar.color,
                transitionDelay: i * 100 + 'ms'
              }"
            ></div>
          </div>
          <span class="bar-value">{{ bar.count }} ({{ bar.pct }}%)</span>
        </div>
      </div>
      <p class="survey-takeaway">The top two requested features — abnormal-usage alerts and real-time monitoring — became Aqua-Alert's core product surface.</p>
      <p class="survey-footer">Response collected from users 172</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

defineProps({ data: Object })

const NAVY = '#0D2950'
const AMBER = '#F2A623'
const TEAL = '#1D9E75'

/* ── Section A: Headline Stats ── */
const headlineStats = [
  { value: 78, label: 'already aware they use too much water' },
  { value: 63, label: 'actively want to reduce their water bill' },
  { value: 54, label: 'had a leak in the past year' },
]

const sectionA = ref(null)
const animatedA = ref([0, 0, 0])

/* ── Section B: Pie Chart ── */
const sectionB = ref(null)
const pieReveal = ref(0)

const pieClipStyle = computed(() => {
  if (pieReveal.value >= 360) return {}
  return {
    clipPath: `polygon(50% 50%, 50% 0%, ${pieEdgePoint(pieReveal.value)})`
  }
})

function pieEdgePoint(angleDeg) {
  if (angleDeg <= 0) return '50% 0%'
  const points = []
  // Build polygon points clockwise from 12 o'clock
  points.push('50% 0%') // always include top
  if (angleDeg > 0) {
    if (angleDeg >= 45) points.push('100% 0%')
    if (angleDeg >= 135) points.push('100% 100%')
    if (angleDeg >= 225) points.push('0% 100%')
    if (angleDeg >= 315) points.push('0% 0%')
  }
  // Final edge point
  const rad = (angleDeg - 90) * Math.PI / 180
  const x = 50 + 70 * Math.cos(rad)
  const y = 50 + 70 * Math.sin(rad)
  points.push(`${x}% ${y}%`)
  return points.join(', ')
}

function pieSlice(startDeg, endDeg) {
  const cx = 140, cy = 140, r = 130
  const s = ((startDeg - 90) * Math.PI) / 180
  const e = ((endDeg - 90) * Math.PI) / 180
  const x1 = cx + r * Math.cos(s)
  const y1 = cy + r * Math.sin(s)
  const x2 = cx + r * Math.cos(e)
  const y2 = cy + r * Math.sin(e)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`
}

/* ── Section C: Leak Checks ── */
const sectionC = ref(null)
const sectionCVisible = ref(false)

const leakCheckBars = [
  { label: 'Regular inspection', count: 95, pct: 55, color: AMBER, widthPct: 100 },
  { label: 'Plumber checks', count: 47, pct: 27, color: NAVY, widthPct: 49.5 },
  { label: 'Do not check for leaks', count: 43, pct: 25, color: AMBER, widthPct: 45.3 },
  { label: 'Using smart leak detection devices', count: 4, pct: 2, color: NAVY, widthPct: 4.2 },
]

/* ── Section D: Water-saving Devices ── */
const sectionD = ref(null)
const sectionDVisible = ref(false)

const deviceBars = [
  { label: 'Low-flow showerheads', count: 59, pct: 34, color: NAVY, widthPct: 100 },
  { label: 'Water-efficient washing machine', count: 55, pct: 32, color: NAVY, widthPct: 93.2 },
  { label: 'Dual-flush toilets', count: 49, pct: 28, color: NAVY, widthPct: 83.1 },
  { label: 'Faucet aerators', count: 16, pct: 9, color: NAVY, widthPct: 27.1 },
  { label: 'None', count: 14, pct: 8, color: AMBER, widthPct: 23.7 },
]

/* ── Section E: Features Wanted ── */
const sectionE = ref(null)
const sectionEVisible = ref(false)

const featureBars = [
  { label: 'Red alert on abnormal usage', count: 113, pct: 66, color: TEAL, widthPct: 100, highlight: true },
  { label: 'Real-time monitoring', count: 103, pct: 60, color: TEAL, widthPct: 91.2, highlight: true },
  { label: 'Daily reports', count: 97, pct: 56, color: NAVY, widthPct: 85.8, highlight: false },
  { label: 'Rewards on saving water', count: 91, pct: 53, color: NAVY, widthPct: 80.5, highlight: false },
  { label: 'Smart-home integration', count: 62, pct: 36, color: NAVY, widthPct: 54.9, highlight: false },
]

/* ── Animation Helpers ── */
const observers = []
const reducedMotion = ref(false)

function observeCountUp(el, endValues, target, duration = 1500) {
  if (reducedMotion.value) {
    target.value = endValues
    return
  }
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      const start = performance.now()
      function step(now) {
        const p = Math.min((now - start) / duration, 1)
        const e = 1 - Math.pow(1 - p, 4)
        target.value = endValues.map(v => Math.round(e * v))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
      obs.disconnect()
    }
  }, { threshold: 0.3 })
  obs.observe(el)
  observers.push(obs)
}

function observeVisibility(el, target) {
  if (reducedMotion.value) {
    target.value = true
    return
  }
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      target.value = true
      obs.disconnect()
    }
  }, { threshold: 0.2 })
  obs.observe(el)
  observers.push(obs)
}

function observePie(el) {
  if (reducedMotion.value) {
    pieReveal.value = 360
    return
  }
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      const duration = 1200
      const start = performance.now()
      function step(now) {
        const p = Math.min((now - start) / duration, 1)
        const e = 1 - Math.pow(1 - p, 3)
        pieReveal.value = e * 360
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
      obs.disconnect()
    }
  }, { threshold: 0.3 })
  obs.observe(el)
  observers.push(obs)
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (sectionA.value) observeCountUp(sectionA.value, headlineStats.map(s => s.value), animatedA)
  if (sectionB.value) observePie(sectionB.value)
  if (sectionC.value) observeVisibility(sectionC.value, sectionCVisible)
  if (sectionD.value) observeVisibility(sectionD.value, sectionDVisible)
  if (sectionE.value) observeVisibility(sectionE.value, sectionEVisible)
})

onUnmounted(() => observers.forEach(o => o.disconnect()))
</script>

<style scoped>
.survey-results {
  position: relative;
  max-width: 800px;
  min-width: 0;
  margin: 0 auto 3rem;
  overflow-x: hidden;
}

.dotted-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #D3D1C7 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.08;
  z-index: 0;
}

@media (max-width: 768px) {
  .dotted-grid { display: none; }
}

.survey-section {
  position: relative;
  z-index: 1;
  padding: 48px 0;
}

.survey-section + .survey-section {
  margin-top: 48px;
}

.survey-h3 {
  font-size: 22px;
  font-weight: 500;
  color: #0D2950;
  margin: 0 0 1.5rem;
}

.survey-takeaway {
  font-size: 16px;
  font-weight: 400;
  font-style: italic;
  color: #0D2950;
  text-align: center;
  margin: 2rem 0 0.75rem;
  line-height: 1.5;
}

.survey-footer {
  font-size: 14px;
  font-weight: 600;
  color: #0D2950;
  text-align: right;
  margin: 0.75rem 0 0;
}

/* ── Section A: Stat Cards ── */
.stat-cards {
  display: flex;
  gap: 1rem;
}

.stat-card {
  flex: 1;
  background: #fff;
  border: 0.5px solid #0D2950;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
}

.stat-big {
  display: block;
  font-size: 48px;
  font-weight: 500;
  color: #0D2950;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}

.stat-desc {
  display: block;
  font-size: 14px;
  color: #888780;
  margin-top: 0.5rem;
  line-height: 1.4;
}

/* ── Section B: Pie Chart ── */
.pie-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-width: 720px;
  margin: 0 auto;
}

.pie-container {
  width: 280px;
  height: 280px;
  flex-shrink: 0;
}

.pie-svg {
  width: 100%;
  height: 100%;
}

.pie-label {
  fill: #fff;
  font-size: 24px;
  font-weight: 600;
  text-anchor: middle;
}

.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.legend-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-text {
  font-size: 18px;
  font-weight: 700;
  color: #0D2950;
}

/* ── Bar Charts ── */
.bar-chart {
  max-width: 720px;
  margin: 0 auto;
}

.bar-caption {
  font-size: 13px;
  color: #888780;
  margin: -0.5rem 0 1rem;
  max-width: 720px;
}

.bar-row {
  display: grid;
  grid-template-columns: minmax(120px, 240px) minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.bar-label {
  font-size: 14px;
  font-weight: 500;
  color: #0D2950;
  line-height: 1.3;
}

.shipped-tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  font-style: italic;
  color: #1D9E75;
  margin-left: 6px;
}

.bar-track {
  height: 40px;
  background: #f5f5f3;
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .bar-fill { transition: none; }
}

.bar-value {
  font-size: 14px;
  font-weight: 500;
  color: #888780;
  white-space: nowrap;
  min-width: 70px;
}

/* ── Mobile ── */
@media (max-width: 640px) {
  .stat-cards {
    flex-direction: column;
  }

  .stat-big {
    font-size: 36px;
  }

  .pie-layout {
    flex-direction: column;
  }

  .pie-container {
    width: 220px;
    height: 220px;
  }

  .pie-legend {
    flex-direction: row;
    gap: 1.5rem;
    justify-content: center;
  }

  .bar-row {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .bar-track {
    height: 32px;
  }

  .bar-label {
    font-size: 13px;
  }

  .bar-value {
    font-size: 13px;
    text-align: right;
  }

  .survey-h3 {
    font-size: 18px;
  }

  .survey-takeaway {
    font-size: 14px;
  }

  .survey-section {
    padding: 32px 0;
  }

  .survey-section + .survey-section {
    margin-top: 24px;
  }
}
</style>
