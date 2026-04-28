<template>
  <section :id="sectionId" class="section-text" data-aos="fade-up">
    <h2 v-if="data.title && data.level === 2">{{ data.title }}</h2>
    <h3 v-else-if="data.title && data.level === 3">{{ data.title }}</h3>
    <!-- Safe: content sourced from static src/data/projects.js -->
    <p v-for="(para, i) in data.body" :key="i" v-html="fmt(para)"></p>
    <a v-if="data.link" :href="data.link.url" target="_blank" rel="noopener noreferrer" class="text-link">
      {{ data.link.text }} <span class="arrow">&rarr;</span>
    </a>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { slugify, formatText } from './utils'

const props = defineProps({ data: Object })
const sectionId = computed(() => props.data.title ? slugify(props.data.title) : undefined)
const fmt = (t) => formatText(t)
</script>

<style scoped>
.section-text {
  margin-bottom: 3rem;
}

h2 {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1.3;
  margin: 0 0 1rem;
}

h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-heading);
  line-height: var(--leading-snug);
  margin: 0 0 0.75rem;
}

p {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-body);
  margin-bottom: 1.25em;
}

p :deep(strong) {
  font-weight: 600;
  color: var(--color-heading);
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-heading);
  text-decoration: underline;
  text-decoration-color: var(--color-faint);
  text-underline-offset: 3px;
  transition: text-decoration-color 0.15s;
}

.text-link:hover {
  text-decoration-color: var(--color-heading);
}

.arrow {
  transition: transform 0.15s;
}

.text-link:hover .arrow {
  transform: translateX(3px);
}
</style>
