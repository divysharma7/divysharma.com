<template>
  <figure class="section-full-image" data-aos="zoom-in" data-aos-duration="700">
    <img :src="data.src" :alt="data.alt || ''" loading="lazy" decoding="async" />
    <figcaption v-if="data.caption">{{ data.caption }}</figcaption>
  </figure>
</template>

<script setup>
defineProps({ data: Object })
</script>

<style scoped>
.section-full-image {
  margin: 2.5rem 0;
  padding: 0;
}

img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  display: block;
  object-fit: cover;
  aspect-ratio: 16 / 9;
  object-position: top;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

figcaption {
  font-size: var(--text-sm);
  color: var(--color-muted);
  text-align: center;
  margin-top: 0.75rem;
}
</style>
