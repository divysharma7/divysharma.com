<template>
  <section :id="sectionId" class="empathy-map" data-aos="fade-up">
    <div class="em-grid">
      <div
        v-for="q in quadrants"
        :key="q.id"
        class="quadrant"
        :class="q.id"
        :style="{ '--accent': q.accent, '--bg': q.bg }"
      >
        <span class="q-label">{{ q.label }}</span>
        <ul class="q-items">
          <li v-for="(item, i) in q.items" :key="i">{{ item }}</li>
        </ul>
      </div>

      <!-- Center avatar -->
      <div class="avatar-wrap">
        <svg class="avatar-svg" viewBox="0 0 80 80" aria-hidden="true">
          <circle cx="40" cy="40" r="40" fill="#D3D1C7" />
          <circle cx="40" cy="30" r="12" fill="#fff" />
          <path d="M18,68 Q18,48 40,48 Q62,48 62,68" fill="#fff" />
        </svg>
        <span class="avatar-caption">Synthesized from 172 households.</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { slugify } from '../sections/utils'

const props = defineProps({ data: Object })
const sectionId = computed(() => props.data?.title ? slugify(props.data.title) : undefined)

const quadrants = [
  {
    id: 'says',
    label: 'SAYS',
    accent: '#3B82C4',
    bg: 'rgba(59,130,196,0.15)',
    items: [
      '"I know my water bill is too high."',
      '"I check the bathroom every few weeks."',
      '"I\'d call a plumber if something broke."',
    ],
  },
  {
    id: 'thinks',
    label: 'THINKS',
    accent: '#1D9E75',
    bg: 'rgba(29,158,117,0.15)',
    items: [
      'Worries about wasting money',
      'Doubts smart devices will be reliable',
      'Assumes leaks are rare',
    ],
  },
  {
    id: 'does',
    label: 'DOES',
    accent: '#D4A030',
    bg: 'rgba(212,160,48,0.15)',
    items: [
      'Walks the house looking for puddles',
      'Asks family members to report drips',
      'Pays the bill without checking usage',
    ],
  },
  {
    id: 'feels',
    label: 'FEELS',
    accent: '#D85A30',
    bg: 'rgba(216,90,48,0.15)',
    items: [
      'Guilty about high consumption',
      'Powerless without data',
      'Curious but skeptical',
    ],
  },
]
</script>

<style scoped>
.empathy-map {
  margin-bottom: 3rem;
}

.em-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 720px;
  margin: 0 auto;
  border: 1px dashed #D3D1C7;
  border-radius: 8px;
  overflow: hidden;
}

.quadrant {
  padding: 24px;
  background: var(--bg);
  border: 0.5px dashed #D3D1C7;
  transition: background 0.2s ease;
}

.quadrant:hover {
  background: color-mix(in srgb, var(--bg) 100%, var(--accent) 10%);
}

.q-label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 12px;
}

.q-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.q-items li {
  font-size: 14px;
  color: #3a3a38;
  line-height: 1.5;
  padding: 4px 0;
  padding-left: 12px;
  position: relative;
}

.q-items li::before {
  content: '·';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: 700;
}

/* Center avatar */
.avatar-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
}

.avatar-svg {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.avatar-caption {
  font-size: 11px;
  color: #888780;
  margin-top: 6px;
  white-space: nowrap;
  background: #fff;
  padding: 2px 8px;
  border-radius: 4px;
}

@media (max-width: 640px) {
  .em-grid {
    grid-template-columns: 1fr;
  }
  .avatar-wrap {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    padding: 24px 0;
    grid-column: 1;
    order: -1;
  }
}
</style>
