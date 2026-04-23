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
  font-family: var(--font-sans);
  color: var(--color-body);
  font-size: var(--text-sm);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.heading {
  font-family: var(--font-sans);
  font-size: var(--h3);
  font-weight: 600;
  color: var(--color-heading);
  line-height: var(--leading-tight);
  margin: 0;
}
</style>
