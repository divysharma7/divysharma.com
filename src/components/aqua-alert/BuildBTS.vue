<template>
  <section :id="sectionId" class="build-bts" data-aos="fade-up">
    <div class="bts-container">
      <svg class="bts-svg" viewBox="0 0 400 300" aria-label="Illustration: build process with breadboard, soldering iron, notebook, coffee, and sensor">
        <!-- Desk surface -->
        <rect x="0" y="0" width="400" height="300" rx="16" fill="#D4A574" />
        <rect x="0" y="0" width="400" height="300" rx="16" fill="url(#woodGrain)" opacity="0.15" />

        <defs>
          <pattern id="woodGrain" x="0" y="0" width="400" height="10" patternUnits="userSpaceOnUse">
            <line x1="0" y1="5" x2="400" y2="5" stroke="#b8884e" stroke-width="0.5" opacity="0.4" />
          </pattern>
        </defs>

        <!-- Notebook (top-left) -->
        <g transform="translate(30, 30)">
          <rect x="0" y="0" width="90" height="110" rx="4" fill="#fff" stroke="#D3D1C7" stroke-width="2" />
          <line x1="12" y1="0" x2="12" y2="110" stroke="#E8524A" stroke-width="1" opacity="0.4" />
          <!-- Scribbled lines -->
          <path d="M20,25 Q40,22 70,28" fill="none" stroke="#888780" stroke-width="1.5" stroke-linecap="round" />
          <path d="M20,40 Q45,36 65,42" fill="none" stroke="#888780" stroke-width="1.5" stroke-linecap="round" />
          <path d="M20,55 Q35,52 55,56" fill="none" stroke="#888780" stroke-width="1.5" stroke-linecap="round" />
          <!-- Pipe sketch -->
          <g transform="translate(25, 70)">
            <rect x="0" y="5" width="40" height="8" rx="2" fill="none" stroke="#3B82C4" stroke-width="1.5" />
            <path d="M44,9 L52,5 M44,9 L52,13" fill="none" stroke="#3B82C4" stroke-width="1" />
          </g>
        </g>

        <!-- Breadboard (center) -->
        <g transform="translate(140, 90)">
          <rect x="0" y="0" width="120" height="80" rx="4" fill="#2D7E4F" stroke="#1a5e36" stroke-width="2" />
          <!-- Holes grid -->
          <g opacity="0.3">
            <circle v-for="(pos, idx) in boardHoles" :key="idx" :cx="pos[0]" :cy="pos[1]" r="2" fill="#1a5e36" />
          </g>
          <!-- Wires -->
          <path d="M15,20 L40,20 L40,45 L70,45" fill="none" stroke="#1D9E75" stroke-width="2" stroke-linecap="round" />
          <path d="M30,15 L30,55 L80,55" fill="none" stroke="#D85A30" stroke-width="2" stroke-linecap="round" />
          <path d="M55,25 L90,25 L90,60 L105,60" fill="none" stroke="#D4A030" stroke-width="2" stroke-linecap="round" />
        </g>

        <!-- Soldering iron (top-right) -->
        <g transform="translate(290, 35) rotate(30)">
          <rect x="0" y="0" width="80" height="12" rx="3" fill="#6B6B6B" />
          <rect x="75" y="2" width="25" height="8" rx="1" fill="#C87533" />
          <!-- Spark -->
          <circle
            class="spark"
            cx="102" cy="6" r="2"
            fill="#FFD700"
            opacity="0"
          />
        </g>

        <!-- Coffee cup (bottom-left) -->
        <g transform="translate(55, 210)">
          <circle cx="30" cy="30" r="28" fill="#fff" stroke="#D3D1C7" stroke-width="2" />
          <circle cx="30" cy="30" r="18" fill="#6F4E37" />
          <circle cx="30" cy="30" r="8" fill="#8B6914" opacity="0.3" />
          <!-- Handle -->
          <path d="M58,22 Q72,30 58,38" fill="none" stroke="#D3D1C7" stroke-width="2" />
          <!-- Steam wisps -->
          <g class="steam">
            <path d="M22,0 Q18,-12 24,-20" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity="0.6" />
            <path class="steam-2" d="M32,0 Q36,-14 30,-24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity="0.4" />
          </g>
        </g>

        <!-- Water sensor (bottom-right) -->
        <g transform="translate(290, 210)">
          <rect x="0" y="0" width="60" height="45" rx="8" fill="none" stroke="#D3D1C7" stroke-width="2" />
          <text x="30" y="18" font-size="8" fill="#888780" text-anchor="middle" font-weight="500">SENSOR</text>
          <!-- Drop icon -->
          <path d="M30,24 Q30,24 26,32 Q24,36 30,38 Q36,36 34,32 Z" fill="#85B7EB" />
        </g>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { slugify } from '../sections/utils'

const props = defineProps({ data: Object })
const sectionId = computed(() => props.data?.title ? slugify(props.data.title) : undefined)

const boardHoles = (() => {
  const pts = []
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 9; c++) {
      pts.push([10 + c * 12, 10 + r * 14])
    }
  }
  return pts
})()
</script>

<style scoped>
.build-bts {
  margin-bottom: 3rem;
}

.bts-container {
  max-width: 600px;
  margin: 0 auto;
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  overflow: hidden;
}

.bts-svg {
  width: 100%;
  height: 100%;
}

/* Steam animation */
.steam {
  animation: steamRise 4s ease-in-out infinite;
}

.steam-2 {
  animation: steamRise 4s ease-in-out 1.5s infinite;
}

@keyframes steamRise {
  0% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(-8px); opacity: 0.3; }
  100% { transform: translateY(-16px); opacity: 0; }
}

/* Spark pulse */
.spark {
  animation: sparkPulse 5s ease-in-out infinite;
}

@keyframes sparkPulse {
  0%, 85% { opacity: 0; r: 2; }
  90% { opacity: 0.9; r: 3; }
  95% { opacity: 0.4; r: 4; }
  100% { opacity: 0; r: 2; }
}

@media (prefers-reduced-motion: reduce) {
  .steam,
  .steam-2 { animation: none; opacity: 0.4; }
  .spark { animation: none; }
}
</style>
