<template>
  <section :id="sectionId" class="section-awards" data-aos="fade-up">
    <h2 v-if="data.title">{{ data.title }}</h2>
    <div class="awards-list">
      <div
        v-for="(award, i) in data.items"
        :key="i"
        class="award-card"
        data-aos="fade-up"
        :data-aos-delay="i * 100"
      >
        <div class="award-accent"></div>
        <div class="award-body">
          <span class="award-title">{{ award.title }}</span>
          <span class="award-event">{{ award.event }}</span>
          <span v-if="award.detail" class="award-detail">{{ award.detail }}</span>
        </div>
      </div>
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
.section-awards {
  margin: 2.5rem 0 3rem;
}

h2 {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1.3;
  margin: 0 0 1.5rem;
}

.awards-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.award-card {
  display: flex;
  align-items: stretch;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  transition: box-shadow var(--duration-fast);
}

.award-card:hover {
  box-shadow: var(--shadow-sm);
}

.award-accent {
  width: 4px;
  flex-shrink: 0;
  background: var(--color-heading);
}

.award-body {
  padding: 0.875rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.award-title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-heading);
}

.award-event {
  font-size: var(--text-sm);
  color: var(--color-body);
}

.award-detail {
  font-size: var(--text-xs);
  color: var(--color-muted);
  margin-top: 0.125rem;
}
</style>
