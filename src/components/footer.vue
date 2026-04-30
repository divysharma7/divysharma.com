<template>
	<footer class="site-footer">
		<div class="footer-container">
			<div class="footer-grid">

				<!-- Brand column -->
				<div class="footer-brand">
					<h3 class="footer-name">Divy Sharma</h3>
					<p class="footer-tagline">Associate Product Manager building growth systems and honest products.</p>
					<div class="footer-socials">
						<a href="mailto:divysharma029@gmail.com" aria-label="Email" rel="noopener noreferrer" @click="gtmPush('click:outbound', { platform: 'email', location: 'footer_icons' })">
							<Mail :size="18" />
						</a>
						<a href="https://www.linkedin.com/in/divy-sharma-243748216/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" @click="gtmPush('click:outbound', { platform: 'linkedin', location: 'footer_icons' })">
							<Linkedin :size="18" />
						</a>
						<a href="https://github.com/divysharma7" target="_blank" rel="noopener noreferrer" aria-label="GitHub" @click="gtmPush('click:outbound', { platform: 'github', location: 'footer_icons' })">
							<Github :size="18" />
						</a>
						<a href="https://twitter.com/Divy_Sharma6" target="_blank" rel="noopener noreferrer" aria-label="Twitter" @click="gtmPush('click:outbound', { platform: 'twitter', location: 'footer_icons' })">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
						</a>
						<a href="https://www.behance.net/divysharma3" target="_blank" rel="noopener noreferrer" aria-label="Behance" @click="gtmPush('click:outbound', { platform: 'behance', location: 'footer_icons' })">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.609.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.63.16-1.27.24-1.95.24H0V4.51h6.938v-.007zM6.545 10.16c.625 0 1.14-.145 1.53-.44.39-.294.585-.75.585-1.37 0-.344-.07-.625-.18-.844-.12-.22-.28-.39-.49-.52-.21-.13-.46-.22-.74-.27-.28-.05-.58-.08-.9-.08H3.38v3.53h3.165v-.01zm.185 5.89c.35 0 .68-.04.99-.12.31-.08.57-.21.81-.39.24-.18.42-.42.56-.71.14-.29.21-.65.21-1.06 0-.83-.23-1.44-.68-1.82-.45-.38-1.07-.57-1.85-.57H3.38v4.68h3.35v-.01zM22.44 15.27c-.42.77-1.01 1.34-1.78 1.72-.77.38-1.67.57-2.72.57-.8 0-1.53-.11-2.18-.34-.66-.23-1.22-.57-1.69-1.03-.47-.46-.83-1.02-1.09-1.69-.26-.67-.39-1.43-.39-2.29 0-.82.13-1.57.4-2.24.27-.67.64-1.23 1.12-1.7.48-.47 1.04-.83 1.7-1.09.66-.26 1.38-.38 2.17-.38.88 0 1.64.17 2.3.51.66.34 1.2.82 1.62 1.43.42.61.72 1.33.91 2.15.19.82.25 1.71.17 2.68H15.35c.04.83.32 1.47.84 1.92.52.45 1.17.68 1.95.68.58 0 1.08-.15 1.48-.44.41-.3.7-.66.87-1.08l2.08.27-.13.26zm-2.1-5.03c-.07-.74-.33-1.33-.8-1.76-.47-.43-1.07-.65-1.78-.65-.42 0-.79.07-1.1.22-.31.15-.57.34-.77.58-.2.24-.36.51-.47.82-.11.31-.18.62-.2.95h5.13l-.01-.16zM17.543 4.53h4.94v1.48h-4.94V4.53z"/></svg>
						</a>
					</div>
				</div>

				<!-- General column -->
				<div class="footer-col">
					<h4 class="footer-col-title">General</h4>
					<nav class="footer-nav">
						<router-link to="/">Home</router-link>
						<router-link to="/blog">Blog</router-link>
						<router-link to="/projects">Projects</router-link>
						<router-link to="/workexperience">Experience</router-link>
						<router-link to="/bucket-list">Bucket List</router-link>
					</nav>
				</div>

				<!-- The Website column -->
				<div class="footer-col">
					<h4 class="footer-col-title">The Website</h4>
					<nav class="footer-nav">
						<router-link to="/journey">Journey</router-link>
						<router-link to="/gears">Gears</router-link>
						<router-link to="/books">Books</router-link>
						<router-link to="/journey/certificates">Certificates</router-link>
						<router-link to="/journey/mentors">Mentors</router-link>
					</nav>
				</div>

				<!-- Connect column -->
				<div class="footer-col">
					<h4 class="footer-col-title">Connect</h4>
					<nav class="footer-nav">
						<a href="mailto:divysharma029@gmail.com" @click="gtmPush('click:outbound', { platform: 'email', location: 'footer_connect' })">Email</a>
						<a href="https://www.linkedin.com/in/divy-sharma-243748216/" target="_blank" rel="noopener noreferrer" @click="gtmPush('click:outbound', { platform: 'linkedin', location: 'footer_connect' })">LinkedIn</a>
						<a href="https://twitter.com/Divy_Sharma6" target="_blank" rel="noopener noreferrer" @click="gtmPush('click:outbound', { platform: 'twitter', location: 'footer_connect' })">Twitter / X</a>
						<a href="https://github.com/divysharma7" target="_blank" rel="noopener noreferrer" @click="gtmPush('click:outbound', { platform: 'github', location: 'footer_connect' })">GitHub</a>
						<router-link to="/resume" @click="gtmPush('click:resume_download', { location: 'footer_connect' })">Resume</router-link>
					</nav>
				</div>

			</div>

			<!-- Spotify -->
			<div class="footer-spotify">
				<Spotify />
			</div>

			<!-- Copyright -->
			<div class="footer-bottom">
				<p>Copyright &copy; {{ new Date().getFullYear() }} Divy Sharma. All rights reserved.</p>
			</div>
		</div>
	</footer>
</template>

<script setup>
import Spotify from './spotify.vue'
import { Mail, Linkedin, Github } from 'lucide-vue-next'
import posthog from 'posthog-js'

function gtmPush(event, params) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
  posthog.capture('outbound:click', { platform: params?.platform, location: params?.location })
}
</script>

<style scoped>
.site-footer {
	margin-top: 4rem;
	border-top: 1px solid var(--color-border);
}

.footer-container {
	max-width: var(--container-wide);
	margin: 0 auto;
	padding: 3rem 2rem 2rem;
}

.footer-grid {
	display: grid;
	grid-template-columns: 1.5fr 1fr 1fr 1fr;
	gap: 2rem;
}

/* Brand */
.footer-name {
	font-family: var(--font-sans);
	font-size: var(--text-xl);
	font-weight: 600;
	color: var(--color-heading);
	margin: 0 0 0.5rem;
}

.footer-tagline {
	font-size: var(--text-sm);
	color: var(--color-muted);
	line-height: var(--leading-normal);
	margin: 0 0 1rem;
	max-width: 280px;
}

.footer-socials {
	display: flex;
	gap: 0;
}

.footer-socials a {
	color: var(--color-muted);
	font-size: var(--text-lg);
	padding: 0.5rem;
	min-width: 40px;
	min-height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: color var(--duration-fast);
}

.footer-socials a:hover {
	color: var(--color-heading);
}

/* Columns */
.footer-col-title {
	font-size: var(--text-sm);
	font-weight: 600;
	color: var(--color-heading);
	margin: 0 0 0.75rem;
}

.footer-nav {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.footer-nav a {
	font-size: var(--text-sm);
	color: var(--color-body);
	text-decoration: none;
	transition: color var(--duration-fast);
}

.footer-nav a:hover {
	color: var(--color-heading);
}

/* Spotify */
.footer-spotify {
	margin-top: 2rem;
}

/* Bottom */
.footer-bottom {
	margin-top: 3rem;
	padding-top: 1.5rem;
	border-top: 1px solid var(--color-border);
	text-align: center;
}

.footer-bottom p {
	font-size: var(--text-xs);
	color: var(--color-muted);
	margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
	.footer-grid {
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	.footer-brand {
		grid-column: 1 / -1;
	}
}

@media (max-width: 480px) {
	.footer-grid {
		grid-template-columns: 1fr;
	}
}
</style>
