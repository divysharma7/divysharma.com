<template>
  <div class="gears-page">
    <!-- Header -->
    <div class="page-header">
      <h1 class="page-title">Gears</h1>
      <p class="page-subtitle">My gears and tools i use to get my work done.</p>
    </div>

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
</script>

<style scoped>
.gears-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-family: var(--fontDisplay, serif);
  font-size: 2.5rem;
  font-weight: 700;
  color: #111;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #6b7280;
  font-size: 1.05rem;
  max-width: 480px;
  margin: 0 auto;
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
  font-size: 1.35rem;
  font-weight: 600;
  color: #111;
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
  border-radius: 8px;
  background: #f3f4f6;
  border: 1px solid rgba(0, 0, 0, 0.06);
  color: #736f70;
  flex-shrink: 0;
}

.number-box {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 26px;
  border-radius: 6px;
  background: #f3f4f6;
  border: 1px solid rgba(0, 0, 0, 0.06);
  color: #736f70;
  flex-shrink: 0;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0 6px;
}

.item-name {
  font-size: 0.9rem;
  color: #555;
}

.item-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: #555;
  text-decoration: none;
  transition: color 0.2s ease;
}

.item-link:hover {
  color: #111;
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
    font-size: 2rem;
  }
}
</style>
