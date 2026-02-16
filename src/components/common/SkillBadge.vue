<template>
  <a :href="href" target="_blank" class="skill-badge" rel="noopener noreferrer">
    <slot></slot>
    <span class="skill-name">{{ name }}</span>
  </a>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  href: {
    type: String,
    default: '#'
  }
})
</script>

<style scoped>
.skill-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.6rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: #fafafa;
  font-size: 0.85rem;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;
}

.skill-badge:hover {
  background: #fff;
  border-color: #bbb;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.skill-name {
  line-height: 1;
}
</style>
