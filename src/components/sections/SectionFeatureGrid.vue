<template>
  <section :id="sectionId" class="section-feature-grid" data-aos="fade-up">
    <h2 v-if="data.title">{{ data.title }}</h2>
    <div class="feature-grid" :class="`cols-${data.columns || 3}`">
      <div
        v-for="(feat, i) in data.features"
        :key="i"
        class="feature-card"
        data-aos="fade-up"
        :data-aos-delay="i * 80"
      >
        <div class="feature-icon">
          <component :is="iconMap[feat.icon]" v-if="iconMap[feat.icon]" :size="22" />
          <span v-else class="feature-icon-fallback">{{ feat.title.charAt(0) }}</span>
        </div>
        <h3 class="feature-title">{{ feat.title }}</h3>
        <p class="feature-desc">{{ feat.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { slugify } from './utils'
import { Gamepad2, Hand, BarChart3, Users, Trophy, Box, Zap, Eye, Shield, Target } from 'lucide-vue-next'

const props = defineProps({ data: Object })
const sectionId = computed(() => props.data.title ? slugify(props.data.title) : undefined)

const iconMap = {
  gamepad: Gamepad2,
  hand: Hand,
  chart: BarChart3,
  users: Users,
  trophy: Trophy,
  cube: Box,
  zap: Zap,
  eye: Eye,
  shield: Shield,
  target: Target,
}
</script>

<style scoped>
.section-feature-grid {
  margin: 2.5rem 0 3rem;
}

h2 {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1.3;
  margin: 0 0 1.5rem;
}

.feature-grid {
  display: grid;
  gap: 1rem;
}

.cols-2 { grid-template-columns: repeat(2, 1fr); }
.cols-3 { grid-template-columns: repeat(3, 1fr); }

.feature-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  transition: box-shadow var(--duration-normal), transform var(--duration-normal);
}

.feature-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.feature-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: var(--color-bg-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  color: var(--color-heading);
}

.feature-icon-fallback {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-heading);
}

.feature-title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-heading);
  margin: 0 0 0.375rem;
}

.feature-desc {
  font-size: var(--text-xs);
  color: var(--color-muted);
  line-height: var(--leading-relaxed);
  margin: 0;
}

@media (max-width: 640px) {
  .cols-3 { grid-template-columns: repeat(2, 1fr); }
  .cols-2 { grid-template-columns: 1fr; }
}
</style>
