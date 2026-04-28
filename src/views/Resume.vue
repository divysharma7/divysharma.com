<template>
  <div class="resume-page">
    <div class="resume-container">
      <PageHero
        :icon="FileText"
        title="Resume"
        subtitle="View and download my professional resume."
      />

      <div class="resume-divider"></div>

      <!-- PDF viewer -->
      <ResumeViewer />
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import PageHero from '@/components/PageHero.vue'
import { FileText } from 'lucide-vue-next'
import { useHead } from '@vueuse/head'
import { onMounted } from 'vue'
import posthog from 'posthog-js'

const ResumeViewer = defineAsyncComponent(() => import('@/components/ResumeViewer.vue'))

onMounted(() => {
  posthog.capture('resume:viewed', { location: 'resume_page' })
})

useHead({
  title: 'Resume',
  meta: [
    { name: 'description', content: 'Divy Sharma — View and download my professional resume.' },
    { property: 'og:title', content: 'Resume | Divy Sharma' },
    { property: 'og:description', content: 'View and download my professional resume.' }
  ]
})

function gtmPush(event, params) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}
</script>

<style scoped>
.resume-page {
  padding: 3rem var(--container-padding);
  min-height: 100vh;
}

.resume-container {
  max-width: var(--container);
  margin: 0 auto;
}

.resume-divider {
  height: 1px;
  background: var(--color-border);
  margin: 0 0 1.5rem;
}

@media (max-width: 768px) {
  .resume-page {
    padding: 2rem 1rem;
  }
}
</style>
