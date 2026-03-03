<template>
	<div class="mentor-card">
		<div class="mentor-header">
			<div class="mentor-avatar">
				<img v-if="mentor.image" :src="mentor.image" :alt="mentor.name" />
				<div v-else class="avatar-fallback">{{ mentor.name.charAt(0).toUpperCase() }}</div>
			</div>
			<div class="mentor-info">
				<h3 class="mentor-name">{{ mentor.name }}</h3>
				<span class="mentor-role">{{ mentor.role }}</span>
				<span class="mentor-company" v-if="mentor.company">{{ mentor.company }}</span>
			</div>
		</div>
		<div class="mentor-body">
			<p class="mentor-desc">{{ mentor.description }}</p>
		</div>
		<div class="mentor-footer" v-if="mentor.links && mentor.links.length">
			<a v-for="link in mentor.links" :key="link.platform" :href="link.url" target="_blank" rel="noopener noreferrer" class="mentor-link">
				{{ link.platform }} ↗
			</a>
		</div>
	</div>
</template>

<script setup>
defineProps({
	mentor: {
		type: Object,
		required: true
	}
});
</script>

<style scoped>
.mentor-card {
	background: var(--card-bg, #ffffff);
	border: 1px solid var(--border, #eaeaea);
	border-radius: 24px;
	padding: 32px;
	display: flex;
	flex-direction: column;
	gap: 24px;
	transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
    position: relative;
    overflow: hidden;
}

.mentor-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
}

.mentor-card:hover {
	border-color: var(--border-hover, #d4d4d4);
	box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
	transform: translateY(-4px);
}

.mentor-card:hover::before {
    opacity: 1;
}

.mentor-header {
	display: flex;
	align-items: center;
	gap: 20px;
}

.mentor-avatar {
	width: 64px;
	height: 64px;
	border-radius: 50%;
	overflow: hidden;
	background: linear-gradient(135deg, #111 0%, #444 100%);
    color: #fff;
	flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.mentor-avatar img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.avatar-fallback {
	width: 100%;
	height: 100%;
	display: grid;
	place-items: center;
	font-size: 24px;
	font-weight: 800;
}

.mentor-info {
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.mentor-name {
	margin: 0;
	font-size: 1.35rem;
	font-weight: 800;
	color: var(--heading-color, #111);
    letter-spacing: -0.02em;
}

.mentor-role {
	font-size: 0.9rem;
	font-weight: 700;
	color: #555;
}

.mentor-company {
	font-size: 0.85rem;
	color: #999;
    font-weight: 500;
}

.mentor-body {
	flex: 1;
    background: linear-gradient(to bottom, #fafafa, #ffffff);
    padding: 24px;
    border-radius: 16px;
    border: 1px solid rgba(0,0,0,0.04);
}

.mentor-desc {
	margin: 0;
	font-size: 1rem;
	line-height: 1.65;
	color: #444;
}

.mentor-footer {
	margin-top: auto;
	display: flex;
	gap: 12px;
}

.mentor-link {
	font-size: 0.85rem;
	font-weight: 700;
	color: #111;
	text-decoration: none;
	transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #f4f4f5;
    padding: 8px 16px;
    border-radius: 999px;
    border: 1px solid #e4e4e7;
}

.mentor-link:hover {
	background: #111;
    color: #fff;
    border-color: #111;
    transform: translateY(-1px);
}
</style>
