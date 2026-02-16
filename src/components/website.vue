<template>
	<div class="website-section">
		<h5 class="smltitle">
			<span class="dotted-underline">About this website</span>
		</h5>

		<p>
			My website has always been a playground for me to try out new tech and
			experiment with new features. The main motive for this website was to
			showcase the projects I've worked on over the last few years. This website
			is built with Vue 3 and Vite.
		</p>
		<p>
			The website has been deployed to
			<a rel="noopener noreferrer" href="//vercel.com" target="_blank"
				>Vercel</a
			>
			and it takes advantage of its serverless functions for features like the
			realtime Spotify currently playing indicator and contact form. 
		</p>
	</div>
</template>

<style scoped>
.website-section {
	margin-bottom: 4em;
}

.smltitle {
	font-size: 1.5em;
	margin-bottom: 1em;
	font-weight: 500;
	color: #222;
}

.dotted-underline {
	border-bottom: 1px dashed rgba(34, 34, 34, 0.4);
	padding-bottom: 2px;
}

p {
	margin-bottom: 1em;
	line-height: 1.6;
	color: #444;
}

a {
	color: #222;
	text-decoration: underline;
	text-decoration-color: rgba(34, 34, 34, 0.4);
	text-underline-offset: 2px;
}
</style>
