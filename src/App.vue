<template>
	<main>
		<nav v-if="$route.meta.title !== 'notfound'" class="navbar">
			<div class="navcont">
				<div v-if="$route.meta.title !== 'Home'" class="flexbruh noselect">
					<!-- <router-link class="back" to="/">&larr;</router-link> -->
					<router-link class="back" to="/" @click.prevent="$router.go(-1)"
						>&larr;</router-link
					>
					<span>Divy Sharma</span>
				</div>
				<!-- <router-link v-else to="/"> -->
				<img draggable="false" class="logo" src="/bot-avatar-transparent.png" alt="logo" v-else />
				<!-- </router-link> -->

				<div class="links">
					<router-link to="/" @click="trackEvent('nav:click', { to: '/', from: 'nav' })">Home</router-link>
					<router-link to="/projects" @click="trackEvent('nav:click', { to: '/projects', from: 'nav' })">Projects</router-link>
					<router-link to="/WorkExperience" @click="trackEvent('nav:click', { to: '/WorkExperience', from: 'nav' })">Work Experience</router-link>
					<router-link to="/books" @click="trackEvent('nav:click', { to: '/books', from: 'nav' })">Books</router-link>
					<router-link to="/explore" @click="trackEvent('nav:click', { to: '/explore', from: 'nav' })">Explore</router-link>
					<router-link to="/blog" @click="trackEvent('nav:click', { to: '/blog', from: 'nav' })">Blog</router-link>
				</div>

				<div class="ham" @click="nav = !nav">
					<img src="@/assets/img/ham.svg" alt="Open navbar" />
				</div>
			</div>
		</nav>

		<transition class="nav" name="nav">
			<div v-if="nav" class="fullnav">
				<div class="navcont">
					<div class="topsec">
						<h1>&nbsp;</h1>

						<div class="ham" @click="nav = !nav">
							<img src="@/assets/img/close.svg" alt="Close navbar" />
						</div>
					</div>

					<div class="navdata">
						<div class="flexer">
							<router-link to="/" @click="[nav = !nav, trackEvent('nav:click', { to: '/', from: 'nav_mobile' })]">Home</router-link>
							<router-link to="/projects" @click="[nav = !nav, trackEvent('nav:click', { to: '/projects', from: 'nav_mobile' })]"
								>Projects</router-link
							>
							<router-link to="/WorkExperience" @click="[nav = !nav, trackEvent('nav:click', { to: '/WorkExperience', from: 'nav_mobile' })]"
								>Work Experience</router-link
							>
							<router-link to="/books" @click="[nav = !nav, trackEvent('nav:click', { to: '/books', from: 'nav_mobile' })]"
								>Books</router-link
							>
							<router-link to="/explore" @click="[nav = !nav, trackEvent('nav:click', { to: '/explore', from: 'nav_mobile' })]"
								>Explore</router-link
							>
							<router-link to="/blog" @click="[nav = !nav, trackEvent('nav:click', { to: '/blog', from: 'nav_mobile' })]"
								>Blog</router-link
							>
						</div>

						<!-- <div class="btm">Divy Sharma</div> -->
					</div>
				</div>
			</div>
		</transition>

		<main>
			<transition name="fade" mode="out-in">
				<router-view />
			</transition>
		</main>

		<div v-if="$route.meta.title !== 'notfound'" class="cont">
			<div class="global-quote-wrap">
				<Quote />
			</div>
			<!-- <Footer :class="`footer footer-${$route.meta.title}`" /> -->
			<Footer class="footer" />
		</div>
		<ChatWidget />
		<Oneko />
	</main>
</template>

<script>
import Footer from './components/footer.vue'
import ChatWidget from './components/ChatWidget.vue'
import Oneko from './components/Oneko.vue'
import Quote from './components/Quote.vue'

export default {
	components: {
		Footer,
		ChatWidget,
		Oneko,
		Quote
	},
	data() {
		return {
			nav: false
		}
	},
	watch: {
		nav() {
			document.querySelector('body').style.overflow = this.nav
				? 'hidden'
				: 'auto'
		}
	}
}
</script>

<script setup>
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import { trackEvent } from '@/analytics/umami'

const route = useRoute()

useHead({
  title: 'Divy Sharma',
  titleTemplate: (title) => title === 'Divy Sharma' ? title : `${title} | Divy Sharma`,
  meta: [
    { name: 'description', content: 'Divy Sharma — Product Manager & Developer. Building delightful products and experiences.' },
    { name: 'author', content: 'Divy Sharma' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Divy Sharma' },
    { property: 'og:image', content: 'https://divysharma.com/og-image.png' }, // Needs a real OG image
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@divysharma' },
    { name: 'twitter:creator', content: '@divysharma' }
  ],
  link: [
    { rel: 'canonical', href: () => `https://divysharma.com${route.path}` }
  ]
})
</script>

<style lang="scss">
@import 'vue3-notion/dist/style.css'; /* optional Notion-like styles */

.navbar .navcont,
.navcont .topsec {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.navcont .topsec {
	margin-top: 0.5em;
}

.navbar .links {
	display: flex;
}

.navbar .links a {
	margin-left: 1em;
	font-size: 1.1em;
	transition: 0.2s;
}

.navbar .links a.router-link-exact-active {
	color: var(--red-text);
	// color: rgb(60, 124, 233);
}

.navbar .links a:hover {
	color: var(--red-text);
	// color: rgb(60, 124, 233);
}

.navbar {
	padding: 2em 0 1em 0;
	margin-bottom: 1.5em;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.nav-enter-active,
.nav-leave-active {
	transition: opacity 0.2s ease;
}

.nav-enter-from,
.nav-leave-to {
	opacity: 0;
}

.ham {
	display: none !important;
}

.ham img {
	width: 1.3em;
}

.footer-notfound {
	display: none;
}

.fullnav {
	width: 100%;
	height: 100vh;
	background-color: var(--bg-color);
	position: fixed;
	top: 0;
	z-index: 20;
	overflow: hidden;
}

.footer:not(.footer-Home) {
	margin-bottom: 4em;
}

.navdata {
	.flexer {
		display: flex;
		flex-direction: column;
		position: relative;
		margin-top: 3em;
	}
	.btm {
		position: absolute;
		bottom: 5em;
	}
	a {
		font-size: 2em;
		margin-bottom: 0.65em;
		span {
			width: 100% !important;
		}
	}
	a.router-link-exact-active {
		color: var(--red-text);
	}
}

.logo {
	width: 3em; /* Slightly larger for avatar */
	height: 3em;
	/* Removed border-radius and background */
	object-fit: cover;
}

.footer-Home {
	margin-top: 1.25em;
}

.footer-Projects {
	margin-bottom: 2em;
	margin-top: -3em;
}

@media (max-width: 768px) {
	.footer-Home {
		margin-top: 1.5em;
	}
	.footer-Home.flexfoot {
		margin-bottom: 4.75em;
	}
	.footer {
		margin-bottom: -4em;
	}
	.navbar .links {
		display: none;
	}
	.ham {
		display: block !important;
	}
}

.flexbruh {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.global-quote-wrap {
	max-width: 800px;
	margin: 0 auto;
	padding: 0 1.5rem;
}

.flexbruh .back {
	margin-right: 1em;
}

.back {
	font-size: 1em !important;
	margin-top: -0.25em;
}
</style>
