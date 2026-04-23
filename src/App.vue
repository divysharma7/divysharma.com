<template>
	<div>
		<nav v-if="$route.meta.title !== 'notfound'" class="navbar">
			<div class="navcont">
				<div v-if="$route.meta.title !== 'Home'" class="flexbruh noselect">
					<!-- <router-link class="back" to="/">&larr;</router-link> -->
					<router-link class="back" to="/" @click.prevent="$router.go(-1)"
						>&larr;</router-link
					>
					<span>Divy Sharma</span>
				</div>
				<router-link to="/" class="logo-text" v-else>Divy Sharma</router-link>

				<div class="links">
					<router-link to="/" @click="trackEvent('nav:click', { to: '/', from: 'nav' })">Home</router-link>
					<router-link to="/projects" @click="trackEvent('nav:click', { to: '/projects', from: 'nav' })">Projects</router-link>
					<router-link to="/workexperience" @click="trackEvent('nav:click', { to: '/workexperience', from: 'nav' })">Work Experience</router-link>
					<router-link to="/books" @click="trackEvent('nav:click', { to: '/books', from: 'nav' })">Books</router-link>
					<router-link to="/explore" @click="trackEvent('nav:click', { to: '/explore', from: 'nav' })">Explore</router-link>
					<router-link to="/blog" @click="trackEvent('nav:click', { to: '/blog', from: 'nav' })">Blog</router-link>
				</div>

				<button class="ham" @click="nav = !nav" aria-label="Toggle navigation">
					<img src="@/assets/img/ham.svg" alt="Open navbar" />
				</button>
			</div>
		</nav>

		<transition class="nav" name="nav">
			<div v-if="nav" class="fullnav">
				<div class="navcont">
					<div class="topsec">
						<span>&nbsp;</span>

						<button class="ham" @click="nav = !nav" aria-label="Toggle navigation">
							<img src="@/assets/img/close.svg" alt="Close navbar" />
						</button>
					</div>

					<div class="navdata">
						<div class="flexer">
							<router-link to="/" @click="[nav = !nav, trackEvent('nav:click', { to: '/', from: 'nav_mobile' })]">Home</router-link>
							<router-link to="/projects" @click="[nav = !nav, trackEvent('nav:click', { to: '/projects', from: 'nav_mobile' })]"
								>Projects</router-link
							>
							<router-link to="/workexperience" @click="[nav = !nav, trackEvent('nav:click', { to: '/workexperience', from: 'nav_mobile' })]"
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
	</div>
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
	margin-top: 0.5rem;
}

.navbar .links {
	display: flex;
}

.navbar .links a {
	margin-left: 1rem;
	font-size: 1.1rem;
	transition: 0.2s;
}

.navbar .links a.router-link-exact-active {
	color: var(--color-heading);
	// color: rgb(60, 124, 233);
}

.navbar .links a:hover {
	color: var(--color-heading);
	// color: rgb(60, 124, 233);
}

.navbar {
	padding: 2rem 0 1rem 0;
	margin-bottom: 1.5rem;
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
	width: 1.3rem;
}

.footer-notfound {
	display: none;
}

.fullnav {
	width: 100%;
	height: 100vh;
	background-color: var(--color-bg);
	position: fixed;
	top: 0;
	z-index: 20;
	overflow: hidden;
}

.footer:not(.footer-Home) {
	margin-bottom: 4rem;
}

.navdata {
	.flexer {
		display: flex;
		flex-direction: column;
		position: relative;
		margin-top: 3rem;
	}
	.btm {
		position: absolute;
		bottom: 5em;
	}
	a {
		font-size: 2rem;
		margin-bottom: 0.65rem;
		span {
			width: 100% !important;
		}
	}
	a.router-link-exact-active {
		color: var(--color-heading);
	}
}

.logo-text {
	font-family: var(--font-sans);
	font-size: var(--text-base);
	font-weight: 600;
	color: var(--color-heading);
	text-decoration: none;
	letter-spacing: -0.01em;
}

.footer-Home {
	margin-top: 1.25rem;
}

.footer-Projects {
	margin-bottom: 2rem;
	margin-top: -3rem;
}

@media (max-width: 768px) {
	.footer-Home {
		margin-top: 1.5rem;
	}
	.footer-Home.flexfoot {
		margin-bottom: 4.75em;
	}
	.footer {
		margin-bottom: -4rem;
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
	max-width: var(--container);
	margin: 0 auto;
	padding: 0 1.5rem;
}

.flexbruh .back {
	margin-right: 1rem;
}

.back {
	font-size: 1rem !important;
	margin-top: -0.25em;
}
</style>
