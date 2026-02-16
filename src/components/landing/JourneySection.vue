<template>
  <div class="section-wrapper">
    <SectionHeading subHeading="My" heading="Journey" />
    <div class="card-list">
      <router-link v-for="item in journeyItems" :key="item.name" :to="item.href" class="nav-card">
        <div class="card-icon">
          <component :is="item.icon" :size="16" />
        </div>
        <div class="card-body">
          <h3 class="card-title">{{ item.name }}</h3>
          <p class="card-desc">{{ item.description }}</p>
        </div>
        <ArrowRight class="card-arrow" :size="16" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next';
import { journeyItems } from '../../data/journey.js';
import SectionHeading from '../common/SectionHeading.vue';
</script>

<style scoped>
.section-wrapper {
  width: 100%;
  margin-top: 2.5rem;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.nav-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
}

.nav-card:hover {
  border-color: #d1d5db;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.nav-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #f3f4f6;
  color: #374151;
  flex-shrink: 0;
}

.card-body {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #111;
  margin: 0 0 0.15rem;
}

.card-desc {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
}

.card-arrow {
  color: #9ca3af;
  flex-shrink: 0;
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.2s ease;
}

@media (max-width: 640px) {
  .card-desc {
    font-size: 0.8rem;
  }
}
</style>
