<template>
  <div
    class="section-callout"
    :class="`callout--${data.variant || 'info'}`"
    data-aos="fade-up"
  >
    <strong v-if="data.title" class="callout-title">{{ data.title }}</strong>
    <!-- Safe: content sourced from static src/data/projects.js -->
    <p v-html="fmt(data.body)"></p>
  </div>
</template>

<script setup>
import { formatText } from './utils'

defineProps({ data: Object })
const fmt = (t) => formatText(t)
</script>

<style scoped>
.section-callout {
  border-left: 4px solid var(--color-faint);
  background: var(--color-bg-subtle);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: 1.25rem 1.5rem;
  margin: 2rem 0;
}

.callout--info {
  border-left-color: #3b82f6;
  background: #eff6ff;
}

.callout--success {
  border-left-color: #22c55e;
  background: #f0fdf4;
}

.callout--warning {
  border-left-color: #f59e0b;
  background: #fffbeb;
}

.callout-title {
  display: block;
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 0.375rem;
}

p {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-body);
  margin: 0;
}

p :deep(strong) {
  font-weight: 600;
  color: var(--color-heading);
}
</style>
