<template>
  <section :id="sectionId" class="section-team" data-aos="fade-up">
    <h2 v-if="data.title">{{ data.title }}</h2>
    <div class="team-grid">
      <div
        v-for="(member, i) in data.members"
        :key="i"
        class="team-card"
        data-aos="fade-up"
        :data-aos-delay="i * 120"
      >
        <img v-if="member.image" :src="member.image" :alt="member.name" class="team-avatar" loading="lazy" />
        <h3 class="team-name">{{ member.name }}</h3>
        <p class="team-role">{{ member.role }}</p>
        <p v-if="member.bio" class="team-bio">{{ member.bio }}</p>
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
.section-team {
  margin: 2.5rem 0 3rem;
}

h2 {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1.3;
  margin: 0 0 1.5rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.team-card {
  text-align: center;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  transition: box-shadow var(--duration-normal);
}

.team-card:hover {
  box-shadow: var(--shadow-md);
}

.team-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 1rem;
  display: block;
}

.team-name {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-heading);
  margin: 0 0 0.25rem;
}

.team-role {
  font-size: var(--text-sm);
  color: var(--color-muted);
  margin: 0 0 0.5rem;
  line-height: var(--leading-snug);
}

.team-bio {
  font-size: var(--text-xs);
  color: var(--color-body);
  margin: 0;
  line-height: var(--leading-relaxed);
}

@media (max-width: 640px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style>
