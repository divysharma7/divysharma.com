<template>
  <div class="section-heading">
    <p class="sub-heading">{{ subHeading }}</p>
    <h2 class="heading">{{ heading }}</h2>
  </div>
</template>

<script setup>
defineProps({
  subHeading: {
    type: String,
    required: true
  },
  heading: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.section-heading {
  margin-bottom: 2rem;
}

.sub-heading {
  font-family: 'Inter', sans-serif;
  color: #666;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.heading {
  font-family: var(--fontDisplay, serif);
  font-size: 2rem;
  font-weight: 700;
  color: #111;
  margin: 0;
}
</style>
