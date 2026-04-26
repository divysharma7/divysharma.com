<template>
	<header class="page-hero" :class="{ 'page-hero--left': align === 'left' }">
		<div class="page-hero__icon" aria-hidden="true">
			<i :class="['ph-bold', icon]"></i>
		</div>
		<h1 class="page-hero__title">
			<template v-for="(word, i) in titleWords" :key="i">
				<span v-if="i >= accentStart" class="page-hero__accent">{{ word }}</span>
				<template v-else>{{ word }}</template>
				<template v-if="i < titleWords.length - 1"> </template>
			</template>
		</h1>
		<p class="page-hero__sub">{{ subtitle }}</p>
		<slot />
	</header>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	icon: { type: String, required: true },
	title: { type: String, required: true },
	accentFrom: { type: Number, default: null },
	subtitle: { type: String, default: '' },
	align: { type: String, default: 'center', validator: v => ['center', 'left'].includes(v) }
})

const titleWords = computed(() => props.title.split(' '))

const accentStart = computed(() => {
	if (props.accentFrom !== null) return props.accentFrom
	return titleWords.value.length - 1
})
</script>

<style scoped>
.page-hero {
	text-align: center;
	padding: var(--hero-padding);
	max-width: var(--hero-max-width);
	margin: 0 auto;
}

.page-hero--left {
	text-align: left;
}

.page-hero__icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 3rem;
	height: 3rem;
	border: 1px solid var(--hero-icon-border);
	border-radius: var(--radius-md);
	margin-bottom: 1rem;
	color: var(--hero-icon-color);
	font-size: var(--text-xl);
}

.page-hero__title {
	font-family: var(--font-sans);
	font-size: var(--h1);
	font-weight: 700;
	color: var(--hero-title-color);
	line-height: var(--leading-tight);
	margin: 0 0 0.5rem;
}

.page-hero__accent {
	color: var(--hero-accent-color);
}

.page-hero__sub {
	font-size: var(--text-sm);
	color: var(--hero-subtitle-color);
	line-height: var(--leading-normal);
	margin: 0 auto 1.5rem;
	max-width: 480px;
}

.page-hero--left .page-hero__sub {
	margin-left: 0;
	margin-right: 0;
}

@media (max-width: 640px) {
	.page-hero {
		padding: var(--hero-padding-mobile);
	}
}
</style>
