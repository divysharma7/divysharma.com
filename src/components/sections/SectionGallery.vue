<template>
  <section :id="sectionId" class="section-gallery" data-aos="fade-up">
    <h2 v-if="data.title">{{ data.title }}</h2>
    <div class="gallery-grid" :class="`cols-${data.columns || 2}`">
      <figure
        v-for="(img, i) in data.images"
        :key="i"
        class="gallery-item"
        data-aos="fade-up"
        :data-aos-delay="i * 80"
      >
        <img :src="img.src" :alt="img.alt || ''" loading="lazy" decoding="async" />
        <figcaption v-if="img.caption">{{ img.caption }}</figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { slugify } from './utils'

const props = defineProps({ data: Object })
const sectionId = computed(() => props.data.title ? slugify(props.data.title) : undefined)
</script>

<style scoped>
.section-gallery {
  margin: 2.5rem 0 3rem;
}

h2 {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1.3;
  margin: 0 0 1.5rem;
}

.gallery-grid {
  display: grid;
  gap: 1rem;
}

.cols-1 { grid-template-columns: 1fr; }
.cols-2 { grid-template-columns: repeat(2, 1fr); }
.cols-3 { grid-template-columns: repeat(3, 1fr); }

.gallery-item {
  margin: 0;
  padding: 0;
}

.gallery-item img {
  width: 100%;
  aspect-ratio: 16 / 10;
  height: auto;
  border-radius: var(--radius-sm);
  display: block;
  object-fit: cover;
}

.gallery-item figcaption {
  font-size: var(--text-xs);
  color: var(--color-muted);
  margin-top: 0.5rem;
  text-align: center;
}

@media (max-width: 640px) {
  .cols-3 { grid-template-columns: repeat(2, 1fr); }
  .cols-2 { grid-template-columns: 1fr; }
}
</style>
