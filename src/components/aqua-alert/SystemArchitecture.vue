<template>
  <section :id="sectionId" class="sys-arch" data-aos="fade-up">
    <div ref="container" class="arch-inner">
      <!-- Desktop: horizontal flow -->
      <svg class="arch-svg arch-desktop" viewBox="0 0 720 160" aria-label="System architecture: Pipe to Flow Sensor to Backend API to ML Model to Alert">
        <!-- Connectors -->
        <line v-for="(c, i) in connectors" :key="'c'+i" :x1="c.x1" y1="70" :x2="c.x2" y2="70" stroke="#B4B2A9" stroke-width="1" />

        <!-- Sub-labels -->
        <text v-for="(l, i) in subLabels" :key="'l'+i" :x="l.x" y="110" class="sub-label">{{ l.text }}</text>

        <!-- Data packets -->
        <circle
          v-for="(p, i) in packets"
          :key="'p'+i"
          r="4"
          :fill="TEAL"
          :class="{ 'packet-animated': !reducedMotion }"
          :style="packetStyle(p)"
        />

        <!-- Nodes -->
        <g v-for="(node, i) in nodes" :key="'n'+i" :transform="`translate(${node.x}, 30)`">
          <!-- ML glow -->
          <rect
            v-if="node.id === 'ml'"
            class="ml-glow"
            :class="{ pulsing: !reducedMotion }"
            x="-48" y="-8"
            width="96" height="56"
            rx="12"
            fill="none"
            :stroke="TEAL"
            stroke-width="1"
          />
          <rect
            x="-44" y="-4"
            width="88" height="48"
            rx="10"
            fill="#fff"
            stroke="#D3D1C7"
            stroke-width="0.5"
          />
          <!-- Icon area -->
          <g v-if="node.id === 'pipe'" transform="translate(-12, 8)">
            <rect x="0" y="4" width="24" height="12" rx="4" fill="#D3D1C7" />
            <circle cx="28" cy="14" r="3" fill="#85B7EB" />
          </g>
          <g v-else-if="node.id === 'phone'" transform="translate(-8, 6)">
            <rect x="0" y="0" width="16" height="28" rx="3" fill="none" stroke="#D3D1C7" stroke-width="1" />
            <line x1="6" y1="24" x2="10" y2="24" stroke="#D3D1C7" stroke-width="0.75" />
          </g>
          <text x="0" y="32" class="node-label">{{ node.label }}</text>
        </g>
      </svg>

      <!-- Mobile: vertical flow -->
      <div class="arch-mobile">
        <div v-for="(node, i) in nodes" :key="'m'+i" class="mobile-node-wrap">
          <div class="mobile-node" :class="{ 'mobile-node--ml': node.id === 'ml' }">
            <span class="mobile-node-label">{{ node.label }}</span>
          </div>
          <div v-if="i < nodes.length - 1" class="mobile-connector">
            <svg width="2" height="32" class="mobile-line"><line x1="1" y1="0" x2="1" y2="32" stroke="#B4B2A9" stroke-width="1" /></svg>
            <span class="mobile-sub-label">{{ subLabels[i]?.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { slugify } from '../sections/utils'

const props = defineProps({ data: Object })
const sectionId = computed(() => props.data?.title ? slugify(props.data.title) : undefined)

const TEAL = '#1D9E75'
const reducedMotion = ref(false)
const container = ref(null)

const nodes = [
  { id: 'pipe', label: 'Pipe', x: 60 },
  { id: 'sensor', label: 'Flow sensor', x: 210 },
  { id: 'api', label: 'Backend API', x: 360 },
  { id: 'ml', label: 'ML model', x: 510 },
  { id: 'phone', label: 'Alert', x: 660 },
]

const connectors = [
  { x1: 104, x2: 166 },
  { x1: 254, x2: 316 },
  { x1: 404, x2: 466 },
  { x1: 554, x2: 616 },
]

const subLabels = [
  { x: 135, text: '' },
  { x: 210, text: 'real-time flow data' },
  { x: 360, text: 'baseline + anomaly detection' },
  { x: 510, text: 'push when something is wrong' },
]

// Two packets, staggered
const packets = [
  { connectorIdx: 0, delay: 0 },
  { connectorIdx: 2, delay: 0 },
]

function packetStyle(p) {
  const c = connectors[p.connectorIdx]
  const midX = (c.x1 + c.x2) / 2
  return {
    cx: midX + 'px',
    cy: '70px',
    '--start-x': c.x1 + 'px',
    '--end-x': c.x2 + 'px',
    animationDelay: p.delay + 's',
  }
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})
</script>

<style scoped>
.sys-arch {
  padding: 60px 0;
  margin-bottom: 3rem;
}

.arch-inner {
  max-width: 720px;
  min-width: 0;
  margin: 0 auto;
  overflow-x: hidden;
}

.arch-svg {
  width: 100%;
  height: auto;
}

.node-label {
  font-size: 14px;
  font-weight: 500;
  fill: #3a3a38;
  text-anchor: middle;
}

.sub-label {
  font-size: 11px;
  fill: #888780;
  text-anchor: middle;
}

/* Data packet animation */
.packet-animated {
  animation: packetFlow 3s ease-in-out infinite;
}

@keyframes packetFlow {
  0% { opacity: 0; transform: translateX(-30px); }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; transform: translateX(30px); }
}

/* ML glow pulse */
.ml-glow {
  opacity: 0;
}

.ml-glow.pulsing {
  animation: mlPulse 3s ease-in-out infinite;
}

@keyframes mlPulse {
  0%, 60% { opacity: 0; stroke-width: 1px; }
  70% { opacity: 0.6; stroke-width: 4px; }
  100% { opacity: 0; stroke-width: 1px; }
}

@media (prefers-reduced-motion: reduce) {
  .packet-animated { animation: none; opacity: 1; }
  .ml-glow.pulsing { animation: none; }
}

/* Mobile layout */
.arch-mobile {
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.mobile-node-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mobile-node {
  background: #fff;
  border: 0.5px solid #D3D1C7;
  border-radius: 10px;
  padding: 12px 24px;
  text-align: center;
}

.mobile-node--ml {
  border-color: #1D9E75;
  box-shadow: 0 0 0 2px rgba(29,158,117,0.15);
}

.mobile-node-label {
  font-size: 14px;
  font-weight: 500;
  color: #3a3a38;
}

.mobile-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 0;
}

.mobile-sub-label {
  font-size: 11px;
  color: #888780;
  margin-top: 4px;
  text-align: center;
}

.arch-desktop { display: block; }

@media (max-width: 640px) {
  .arch-desktop { display: none; }
  .arch-mobile { display: flex; }
}
</style>
