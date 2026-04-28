<template>
  <section :id="sectionId" class="section-video" data-aos="fade-up">
    <h2 v-if="data.title">{{ data.title }}</h2>
    <div class="video-embed">
      <iframe
        :src="`https://www.youtube.com/embed/${data.youtubeId}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        loading="lazy"
      ></iframe>
    </div>
    <p v-if="data.caption" class="video-caption">{{ data.caption }}</p>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { slugify } from './utils'

const props = defineProps({ data: Object })
const sectionId = computed(() => props.data.title ? slugify(props.data.title) : undefined)
</script>

<style scoped>
.section-video {
  margin: 2.5rem 0 3rem;
}

h2 {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1.3;
  margin: 0 0 1.5rem;
}

.video-embed {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.video-embed iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: var(--radius-md);
}

.video-caption {
  font-size: var(--text-sm);
  color: var(--color-muted);
  text-align: center;
  margin-top: 0.75rem;
}
</style>
