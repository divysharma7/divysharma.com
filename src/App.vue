<template>
	<div class="app-root">
		<div class="grid-bg" aria-hidden="true" />
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
					<router-link to="/" @click="gtmNav('/', 'desktop')">Home</router-link>
					<router-link to="/projects" @click="gtmNav('/projects', 'desktop')">Projects</router-link>
					<router-link to="/workexperience" @click="gtmNav('/workexperience', 'desktop')">Experience</router-link>
					<router-link to="/books" @click="gtmNav('/books', 'desktop')">Books</router-link>
					<router-link to="/bucket-list" @click="gtmNav('/bucket-list', 'desktop')">Bucket List</router-link>
					<router-link to="/blog" @click="gtmNav('/blog', 'desktop')">Blog</router-link>
				</div>

				<button class="ham" @click="[nav = !nav, gtmMenuToggle()]" aria-label="Toggle navigation">
					<img src="@/assets/img/ham.svg" alt="Open navbar" />
				</button>
			</div>
		</nav>

		<transition class="nav" name="nav">
			<div v-if="nav" class="fullnav">
				<div class="navcont">
					<div class="topsec">
						<span>&nbsp;</span>

						<button class="ham" @click="[nav = !nav, gtmMenuToggle()]" aria-label="Toggle navigation">
							<img src="@/assets/img/close.svg" alt="Close navbar" />
						</button>
					</div>

					<div class="navdata">
						<div class="flexer">
							<router-link to="/" @click="[nav = !nav, gtmNav('/', 'mobile')]">Home</router-link>
							<router-link to="/projects" @click="[nav = !nav, gtmNav('/projects', 'mobile')]"
								>Projects</router-link
							>
							<router-link to="/workexperience" @click="[nav = !nav, gtmNav('/workexperience', 'mobile')]"
								>Experience</router-link
							>
							<router-link to="/books" @click="[nav = !nav, gtmNav('/books', 'mobile')]"
								>Books</router-link
							>
							<router-link to="/bucket-list" @click="[nav = !nav, gtmNav('/bucket-list', 'mobile')]"
								>Bucket List</router-link
							>
							<router-link to="/blog" @click="[nav = !nav, gtmNav('/blog', 'mobile')]"
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
		<Oneko :forceSleep="$route.path.startsWith('/blog')" />
	</div>
</template>

<script>
import Footer from './components/footer.vue'
import { defineAsyncComponent } from 'vue'
import Quote from './components/Quote.vue'

const ChatWidget = defineAsyncComponent(() => import('./components/ChatWidget.vue'))
const Oneko = defineAsyncComponent(() => import('./components/Oneko.vue'))

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
			document.body.classList.toggle('nav-open', this.nav)
		}
	}
}
</script>

<script setup>
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import posthog from 'posthog-js'

const route = useRoute()
const canonicalUrl = computed(() => `https://divysharma-com.vercel.app${route.path}`)

function gtmNav(linkUrl, navType) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'click:nav', link_url: linkUrl, nav_type: navType })
  posthog.capture('nav:click', { to: linkUrl, device: navType })
}
function gtmMenuToggle() {
  const action = document.querySelector('.fullnav') ? 'close' : 'open'
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'click:mobile_menu', action })
  posthog.capture(`nav:mobile_menu_${action}`)
}

useHead({
  title: 'Divy Sharma',
  titleTemplate: (title) => title === 'Divy Sharma' ? title : `${title} | Divy Sharma`,
  meta: [
    { name: 'description', content: 'Divy Sharma — Product Manager & Developer. Building delightful products and experiences.' },
    { name: 'author', content: 'Divy Sharma' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Divy Sharma' },
    { property: 'og:image', content: 'https://divysharma-com.vercel.app/og-image.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@divysharma' },
    { name: 'twitter:creator', content: '@divysharma' }
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ]
})
</script>

<style lang="scss">
.app-root {
	min-height: 100vh;
	width: 100%;
	position: relative;
}

.grid-bg {
	position: fixed;
	inset: 0;
	z-index: 0;
	pointer-events: none;
	background-image:
		linear-gradient(to right, #e7e5e4 1px, transparent 1px),
		linear-gradient(to bottom, #e7e5e4 1px, transparent 1px);
	background-size: 20px 20px;
	mask-image:
		repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
		repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
		radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%);
	-webkit-mask-image:
		repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
		repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
		radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%);
	mask-composite: intersect;
	-webkit-mask-composite: source-in;
}

.navbar,
main,
.cont,
.fullnav {
	position: relative;
	z-index: 1;
}

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

.navbar .navcont .ham {
	display: none;
}

.ham {
	background: none;
	border: none;
	padding: 0.5rem;
	cursor: pointer;
	line-height: 0;
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
	z-index: var(--z-overlay);
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
			width: 100%;
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
	.navbar .navcont .ham {
		display: block;
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

.navbar .flexbruh .back {
	font-size: 1rem;
	margin-top: -0.25em;
}

body.nav-open {
	overflow: hidden;
}
</style>
