<template>
  <section :id="sectionId" class="section-process" data-aos="fade-up">
    <h2 v-if="data.title">{{ data.title }}</h2>
    <div class="process-track">
      <div
        v-for="(step, i) in data.steps"
        :key="i"
        class="process-step"
        data-aos="fade-right"
        :data-aos-delay="i * 150"
      >
        <div class="step-marker">
          <span class="step-number">{{ i + 1 }}</span>
          <div v-if="i < data.steps.length - 1" class="step-line"></div>
        </div>
        <div class="step-content">
          <h3 class="step-name">{{ step.name }}</h3>
          <ul v-if="step.details?.length" class="step-details">
            <li v-for="(d, j) in step.details" :key="j">{{ d }}</li>
          </ul>
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
.section-process {
  margin: 2.5rem 0 3rem;
}

h2 {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1.3;
  margin: 0 0 2rem;
}

.process-track {
  display: flex;
  gap: 0;
}

.process-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.step-marker {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  position: relative;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-heading);
  color: #fff;
  font-size: var(--text-sm);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  margin: 0 auto;
}

.step-line {
  position: absolute;
  top: 50%;
  left: calc(50% + 18px);
  right: calc(-50% + 18px);
  height: 2px;
  background: var(--color-faint);
  transform: translateY(-50%);
}

.step-content {
  text-align: center;
  padding: 0 0.5rem;
}

.step-name {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-heading);
  margin: 0 0 0.5rem;
}

.step-details {
  list-style: none;
  padding: 0;
  margin: 0;
}

.step-details li {
  font-size: var(--text-xs);
  color: var(--color-muted);
  line-height: var(--leading-relaxed);
  margin-bottom: 0.25rem;
}

/* Mobile: vertical timeline */
@media (max-width: 640px) {
  .process-track {
    flex-direction: column;
    gap: 0;
    padding-left: 1rem;
  }

  .process-step {
    flex-direction: row;
    align-items: flex-start;
    gap: 1rem;
  }

  .step-marker {
    width: auto;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0;
  }

  .step-line {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    width: 2px;
    height: 100%;
    min-height: 40px;
    transform: none;
    margin: 0.25rem auto;
  }

  .step-content {
    text-align: left;
    padding: 0 0 1.5rem;
  }
}
</style>
