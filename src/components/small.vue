<template>
	<a
		@mouseleave="hover = false"
		:href="link || 'https://github.com/divysharma7'"
		target="_blank"
		rel="noopener noreferrer"
	>
		<div class="project">
			<div v-if="mobileLarger && hover" class="pop">
				<div>
					<img :src="img" :alt="title" />
				</div>
			</div>
			<div v-if="!mobileLarger" class="popmobile">
				<!-- <img loading="lazy" :src="img" class="mobileimg" :alt="title" /> -->
			</div>
			<div @mouseover="hover = true" @mouseleave="hover = false" class="info">
				<h4 class="name">{{ name }}</h4>
				<h5 class="description">
					<span v-if="desc">{{ description }}</span>
					<span v-else>This is a small description for the project above.</span>
				</h5>
			</div>
		</div>
	</a>
</template>

<script>
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
const breakpoints = useBreakpoints(breakpointsTailwind)

export default {
	props: { title: String, desc: String, link: String, img: String },
	data() {
		return {
			name: this.$props.title,
			description: this.$props.desc,
			hover: false,
			mobileLarger: breakpoints.greater('md')
		}
	},

}
</script>

<style lang="scss" scoped>
.name {
	margin: 0;
	margin-bottom: 0.2rem;
	font-size: 1.1rem;
	font-weight: 400;
}

.description {
	margin: 0;
	font-size: 0.9rem;
	opacity: 0.8;
	font-weight: 300;
}

.project {
	position: relative;
}
.pop {
	position: absolute;
	top: -8.5em;
	border-radius: 0.5rem;
	width: 100%;
}
.pop img {
	width: 90%;
	border-radius: 0.5rem;
}

a {
	border: none;
	opacity: 1;
}

.popmobile {
	img {
		width: 100%;
		border-radius: 0.5rem;
		margin-bottom: 0.4rem;
	}
	margin-top: 1rem;
}

.mobileimg {
	display: none;
}
</style>
