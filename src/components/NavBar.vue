<template>
	<nav class="navbar">
		<div class="container">
			<router-link to="/" class="brand">
				<img src="/pixel-avatar.jpg" alt="Divy" class="nav-logo" />
				Divy Sharma
			</router-link>
			<div class="links">
				<router-link to="/projects" class="link">Projects</router-link>
				<router-link to="/explore" class="link">Explore</router-link>
				<!-- <router-link to="/books" class="link">Books</router-link> -->
				<a href="#contact" @click.prevent="scrollToContact" class="link">Contact</a>
			</div>
		</div>
	</nav>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const scrollToContact = async () => {
	// If not on home, go to home first
	if (router.currentRoute.value.path !== '/') {
		await router.push('/')
		// Wait for navigation
		setTimeout(() => {
			const el = document.getElementById('contact')
			if (el) el.scrollIntoView({ behavior: 'smooth' })
		}, 100)
	} else {
		const el = document.getElementById('contact')
		if (el) el.scrollIntoView({ behavior: 'smooth' })
	}
}
</script>

<style scoped lang="scss">
.navbar {
	padding: 1.5rem 0;
	position: sticky;
	top: 0;
	background: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(10px);
	z-index: 100;
	border-bottom: 1px solid rgba(0, 0, 0, 0.05);

	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 800px;
		margin: 0 auto;
		padding: 0 1.5rem;

		.brand {
			font-size: 1.25rem;
			font-weight: 700;
			text-decoration: none;
			color: #111;
			font-family: var(--fontDisplay);
			display: flex;
			align-items: center;
			gap: 0.75rem;

			.nav-logo {
				width: 32px;
				height: 32px;
				border-radius: 50%;
				object-fit: cover;
				border: 1px solid rgba(0,0,0,0.1);
			}
		}

		.links {
			display: flex;
			gap: 2rem;

			.link {
				text-decoration: none;
				color: #666;
				font-size: 0.95rem;
				transition: color 0.2s;

				&:hover {
					color: #111;
				}
			}
		}
	}
}

@media (max-width: 600px) {
	.navbar .container {
		padding: 0 1rem;
	}
}
</style>
