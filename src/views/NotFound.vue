<template>
	<main>
		<div class="container-sml">
			<h1 class="title">
				<router-link to="/" class="forofour">404</router-link>
			</h1>
			<p class="top">
				The page you're looking for doesn't exist.
			</p>
			<p class="btm">
				You can
				<router-link to="/">go home</router-link>, or
				<router-link to="/explore#contact">contact me</router-link> if you think
				this is a mistake.
			</p>
			<div v-if="!nosocials" class="yo">
				<a
					href="https://twitter.com/Divy_Sharma6"
					rel="noopener noreferrer"
					target="_blank"
					@click="gtmPush('click:social', { platform: 'twitter', location: '404_page' })"
				>
					<bx-bxl-twitter />
				</a>
				<a
					href="https://www.instagram.com/divy.sharma9/"
					rel="noopener noreferrer"
					target="_blank"
					@click="gtmPush('click:social', { platform: 'instagram', location: '404_page' })"
				>
					<carbon-logo-instagram />
				</a>
				<a
					href="https://github.com/divysharma7"
					rel="noopener noreferrer"
					target="_blank"
					@click="gtmPush('click:social', { platform: 'github', location: '404_page' })"
				>
					<carbon-logo-github />
				</a>
				<a
					href="https://open.spotify.com/user/31wan4heyahmjpej4evvpzwzjnji"
					rel="noopener noreferrer"
					target="_blank"
					@click="gtmPush('click:social', { platform: 'spotify', location: '404_page' })"
				>
					<bx-bxl-spotify />
				</a>

				<a
					href="https://www.linkedin.com/in/divy-sharma-243748216/"
					target="_blank"
					rel="noopener noreferrer"
					@click="gtmPush('click:social', { platform: 'linkedin', location: '404_page' })"
				>
					<carbon-logo-linkedin />
				</a>

				<a
					href="https://www.behance.net/divysharma3"
					target="_blank"
					rel="noopener noreferrer"
					@click="gtmPush('click:social', { platform: 'behance', location: '404_page' })"
				>
					<bx-bxl-behance />
				</a>

				<a
					href="mailto:divysharma029@gmail.com"
					rel="noopener noreferrer"
					target="_blank"
					@click="gtmPush('click:social', { platform: 'email', location: '404_page' })"
				>
					
					<bx-bx-mail-send />
				</a>
			</div>
		</div>
	</main>
</template>

<script>
import { useHead } from '@vueuse/head'

export default {
	props: {
		nosocials: Boolean
	},
	setup() {
		useHead({
			title: 'Page Not Found',
			meta: [
				{ name: 'description', content: 'This page does not exist.' },
				{ name: 'robots', content: 'noindex' },
			]
		})
	},
	methods: {
		gtmPush(event, params) {
			window.dataLayer = window.dataLayer || []
			window.dataLayer.push({ event, ...params })
		}
	}
}
</script>

<style scoped>
.forofour {
	border: none;
	opacity: 1;
	color: var(--color-heading);
	/* color: rgb(8, 75, 119); */
	transition: 0.2s;
}

.forofour:hover {
	opacity: 0.75;
}

.container-sml {
	margin: 0 auto;
	padding: 0 2em;
	max-width: 25em;
}

p.top {
	margin: 0.5em 0;
}
p.btm {
	margin-bottom: 1em;
}
.yo {
	margin-top: 0;
}
p {
	opacity: 1;
}

.yo a {
	padding: 0.35em;
	font-size: 1.1em;
	transition: 0.2s;
}

.yo a:hover {
	color: chocolate;
}

.title {
	margin-top: 7em;
}
</style>
