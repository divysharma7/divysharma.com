<template>
  <section :id="sectionId" class="sdg-strip" data-aos="fade-up">
    <h2 v-if="data.title">{{ data.title }}</h2>
    <p v-if="data.body" class="sdg-intro">{{ data.body }}</p>
    <div class="sdg-grid">
      <figure
        v-for="(icon, i) in data.icons"
        :key="i"
        class="sdg-item"
        data-aos="fade-up"
        :data-aos-delay="i * 80"
      >
        <img :src="icon.src" :alt="icon.label" width="96" height="96" loading="lazy" decoding="async" />
        <figcaption>{{ icon.label }}</figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { slugify } from '../sections/utils'

const props = defineProps({ data: Object })
const sectionId = computed(() => props.data.title ? slugify(props.data.title) : undefined)
</script>

<style scoped>
.sdg-strip {
  margin: 2.5rem 0 3rem;
}

h2 {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1.3;
  margin: 0 0 1rem;
}

.sdg-intro {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-body);
  margin-bottom: 1.5rem;
}

.sdg-grid {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

.sdg-item {
  margin: 0;
  padding: 0;
  text-align: center;
  transition: transform 0.2s ease;
}

.sdg-item:hover {
  transform: scale(1.05);
}

.sdg-item img {
  width: 96px;
  height: 96px;
  border-radius: 8px;
  display: block;
  object-fit: contain;
}

.sdg-item figcaption {
  font-size: 13px;
  color: var(--color-muted);
  margin-top: 8px;
  max-width: 110px;
  line-height: 1.3;
}

@media (max-width: 640px) {
  .sdg-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    justify-items: center;
  }
}
</style>
