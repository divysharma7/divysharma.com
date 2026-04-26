<template>
  <div class="gears-page">
    <!-- Header -->
    <PageHero
      icon="ph-gear-six"
      title="Gears"
      :accent-from="1"
      subtitle="Tools and software I use daily."
    />

    <hr class="divider" />

    <!-- Devices -->
    <section class="gear-section">
      <h2 class="section-title">Devices</h2>
      <div class="item-list">
        <div v-for="device in devices" :key="device.name" class="gear-item">
          <div class="icon-box">
            <component :is="device.icon" :size="16" />
          </div>
          <span class="item-name">{{ device.name }}</span>
        </div>
      </div>
    </section>



    <!-- Software -->
    <section class="gear-section">
      <div class="section-header-with-icon">
        <div class="icon-box">
          <Monitor :size="16" />
        </div>
        <h2 class="section-title">Software</h2>
      </div>
      <div class="item-list numbered">
        <div v-for="(app, index) in software" :key="app.name" class="gear-item">
          <div class="number-box">
            <span>{{ index + 1 }}</span>
          </div>
          <a :href="app.href" target="_blank" rel="noopener noreferrer" class="item-link">
            {{ app.name }}
            <ArrowUpRight :size="14" class="link-arrow" />
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { devices, software } from '../config/gears.js';
import { Monitor, ArrowUpRight } from 'lucide-vue-next';
import { useHead } from '@vueuse/head';
import PageHero from '@/components/PageHero.vue';

useHead({
  title: 'Gears',
  meta: [
    { name: 'description', content: 'Tools, software, and hardware I use daily to get my work done.' },
    { property: 'og:title', content: 'Gears | Divy Sharma' },
    { property: 'og:description', content: 'Tools, software, and hardware I use daily to get my work done.' }
  ]
})
</script>

<style scoped>
.gears-page {
  max-width: var(--container);
  margin: 0 auto;
  padding: 4rem 1.5rem;
}

.divider {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 2rem 0;
}

/* ─── Sections ─── */
.gear-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: var(--h3);
  font-weight: 600;
  color: var(--color-heading);
  line-height: var(--leading-tight);
  margin: 0 0 1.25rem;
}

.section-header-with-icon {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.section-header-with-icon .section-title {
  margin-bottom: 0;
}

/* ─── Items ─── */
.item-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.gear-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  background: var(--color-border);
  border: 1px solid rgba(0, 0, 0, 0.06);
  color: var(--color-body);
  flex-shrink: 0;
}

.number-box {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 26px;
  border-radius: var(--radius-sm);
  background: var(--color-border);
  border: 1px solid rgba(0, 0, 0, 0.06);
  color: var(--color-body);
  flex-shrink: 0;
  font-size: var(--text-sm);
  font-weight: 500;
  padding: 0 6px;
}

.item-name {
  font-size: var(--text-sm);
  color: var(--color-body);
}

.item-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: var(--text-sm);
  color: var(--color-body);
  text-decoration: none;
  transition: color 0.2s ease;
}

.item-link:hover {
  color: var(--color-heading);
}

.link-arrow {
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

.item-link:hover .link-arrow {
  opacity: 1;
}

/* ─── Mobile ─── */
@media (max-width: 640px) {
  .gears-page {
    padding: 2rem 1rem;
  }

  .page-title {
    font-size: var(--h1);
  }
}
</style>
