<template>
  <section :id="sectionId" class="section-stats" data-aos="fade-up">
    <h2 v-if="data.title">{{ data.title }}</h2>
    <div ref="statsRow" class="stats-row">
      <div
        v-for="(stat, i) in data.items"
        :key="i"
        class="stat-item"
        data-aos="fade-up"
        :data-aos-delay="i * 100"
      >
        <span class="stat-value">{{ stat.prefix || '' }}{{ displayValues[i] }}{{ stat.suffix || '' }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { slugify } from './utils'
import { useCountUp } from '@/composables/useCountUp'

const props = defineProps({ data: Object })
const sectionId = computed(() => props.data.title ? slugify(props.data.title) : undefined)

const statsRow = ref(null)
const endValues = props.data.items.map(s => s.value)
const counterValues = useCountUp(statsRow, endValues)
const displayValues = counterValues
</script>

<style scoped>
.section-stats {
  margin: 2.5rem 0 3rem;
}

h2 {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1.3;
  margin: 0 0 1.5rem;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 2rem 1.5rem;
}

.stat-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1.2;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--color-muted);
  font-weight: 500;
}

@media (max-width: 640px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem 0.75rem;
    padding: 1.5rem 1rem;
  }
}
</style>
