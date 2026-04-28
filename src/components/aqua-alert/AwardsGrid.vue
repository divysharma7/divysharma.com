<template>
  <section :id="sectionId" class="awards-grid-section" data-aos="fade-up">
    <div class="awards-image-grid" :class="`cols-${data.columns || 2}`">
      <figure
        v-for="(img, i) in data.images"
        :key="i"
        class="award-item"
        data-aos="fade-up"
        :data-aos-delay="i * 80"
      >
        <div class="award-img-wrap">
          <img :src="img.src" :alt="img.caption || ''" loading="lazy" decoding="async" />
        </div>
        <figcaption v-if="img.caption">{{ img.caption }}</figcaption>
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
.awards-grid-section {
  margin: 2.5rem 0 3rem;
}

.awards-image-grid {
  display: grid;
  gap: 8px;
}

.cols-2 { grid-template-columns: repeat(2, 1fr); }
.cols-3 { grid-template-columns: repeat(3, 1fr); }

.award-item {
  margin: 0;
  padding: 0;
  text-align: center;
}

.award-img-wrap {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.award-item:hover .award-img-wrap {
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.award-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.award-item figcaption {
  font-size: 14px;
  font-style: italic;
  color: var(--color-muted);
  margin-top: 8px;
  line-height: 1.4;
}

@media (max-width: 640px) {
  .cols-3 { grid-template-columns: repeat(2, 1fr); }
  .cols-2 { grid-template-columns: 1fr; }
}
</style>
