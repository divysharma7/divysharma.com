<template>
  <section :id="sectionId" class="section-image-text" :class="{ reversed: data.reverse }">
    <div class="it-image" :data-aos="data.reverse ? 'fade-left' : 'fade-right'" data-aos-duration="600">
      <img :src="data.image.src" :alt="data.image.alt || ''" loading="lazy" decoding="async" />
    </div>
    <div class="it-content" data-aos="fade-up" data-aos-delay="100">
      <h2 v-if="data.title && data.level === 2">{{ data.title }}</h2>
      <h3 v-else-if="data.title && data.level === 3">{{ data.title }}</h3>
      <!-- Safe: content sourced from static src/data/projects.js -->
      <p v-for="(para, i) in data.body" :key="i" v-html="fmt(para)"></p>
    </div>
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
.section-image-text {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  margin: 2.5rem 0 3rem;
}

.section-image-text.reversed {
  direction: rtl;
}

.section-image-text.reversed > * {
  direction: ltr;
}

.it-image img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  display: block;
  object-fit: cover;
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
  margin-bottom: 1em;
}

p :deep(strong) {
  font-weight: 600;
  color: var(--color-heading);
}

@media (max-width: 640px) {
  .section-image-text {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .section-image-text.reversed {
    direction: ltr;
  }
}
</style>
