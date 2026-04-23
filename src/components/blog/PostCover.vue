<template>
	<div class="post-cover-gen" :style="coverStyle">
		<div class="pcg-dots"></div>
		<div class="pcg-glow" :style="glowStyle"></div>
		<div class="pcg-body">
			<span class="pcg-tag">{{ primaryTag }}</span>
			<p class="pcg-title" :class="{ large }">{{ title }}</p>
		</div>
		<span class="pcg-brand">Divy Sharma</span>
	</div>
</template>

<script>
const PALETTE = {
	'Product Management': { bg: '#1e293b', accent: '#818cf8' },
	'Strategy':           { bg: '#052e16', accent: '#34d399' },
	'Product Thinking':   { bg: '#1e1b4b', accent: '#a78bfa' },
	'PRD':                { bg: '#2d1b69', accent: '#c4b5fd' },
	'Documentation':      { bg: '#1e3a5f', accent: '#7dd3fc' },
	'Prioritization':     { bg: '#450a0a', accent: '#fca5a5' },
	'Growth':             { bg: '#064e3b', accent: '#6ee7b7' },
	'Career':             { bg: '#292524', accent: '#d6d3d1' },
	'Leadership':         { bg: '#1e0a3c', accent: '#e879f9' },
	'default':            { bg: '#1a1f2e', accent: '#94a3b8' },
}

export default {
	name: 'PostCover',
	props: {
		title: { type: String, required: true },
		tags:  { type: Array, default: () => [] },
		large: { type: Boolean, default: false },
	},
	computed: {
		primaryTag() {
			return this.tags[0] || ''
		},
		palette() {
			return PALETTE[this.primaryTag] || PALETTE['default']
		},
		coverStyle() {
			return { background: this.palette.bg }
		},
		glowStyle() {
			return { background: this.palette.accent }
		},
	},
}
</script>

<style scoped>
.post-cover-gen {
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 1.35rem 1.5rem 1.1rem;
	font-family: var(--font-sans), sans-serif;
}

/* dot grid texture */
.pcg-dots {
	position: absolute;
	inset: 0;
	background-image: radial-gradient(circle, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
	background-size: 22px 22px;
	pointer-events: none;
}

/* radial accent glow */
.pcg-glow {
	position: absolute;
	width: 240px;
	height: 240px;
	border-radius: 50%;
	bottom: -80px;
	right: -60px;
	opacity: 0.18;
	filter: blur(50px);
	pointer-events: none;
}

.pcg-body {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
	flex: 1;
	justify-content: center;
}

.pcg-tag {
	font-size: var(--text-xs);
	font-weight: 700;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: v-bind('palette.accent');
}

.pcg-title {
	font-size: 1rem;
	font-weight: 700;
	color: #fff;
	line-height: 1.4;
	margin: 0;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.pcg-title.large {
	font-size: 1.4rem;
	-webkit-line-clamp: 2;
}

.pcg-brand {
	position: relative;
	font-size: var(--text-xs);
	font-weight: 500;
	color: rgba(255, 255, 255, 0.3);
	letter-spacing: 0.04em;
	align-self: flex-end;
}
</style>
