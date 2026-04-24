<template>
	<div>
		<h5 class="smltitle zero">Top Tracks</h5>
		<p>
			My top tracks from
			<a href="https://open.spotify.com/user/31wan4heyahmjpej4evvpzwzjnji" target="_blank"
				>Spotify</a
			>
			this month
		</p>

		<div v-if="songs && songs.length > 0">
			<div
				v-for="(song, index) in songs.slice(0, 5)"
				:key="song.songUrl"
				data-aos="fade-right"
			>
				<a
					class="yah"
					rel="noopener noreferrer"
					target="_blank"
					:href="song.songUrl"
				>
					<div class="song">
						<div class="flex">
							<h1 class="index noselect mono">{{ index + 1 }}</h1>
							<div class="songinfo">
								<h4 class="title" :title="song?.title || false">
									{{ song?.cleanTitle || song?.title || 'Error' }}
								</h4>
								<h5 class="artist" :title="song?.artist || false">
									{{ song?.artist || 'Error' }}
								</h5>
							</div>
						</div>
					</div>
				</a>
			</div>
		</div>
		<div v-else-if="songs && songs.length === 0">
			<div class="song">
				<p style="opacity: 0.7; margin: 1em 0;">
					<em>Top tracks temporarily unavailable (Spotify API rate limit). Please check back later!</em>
				</p>
			</div>
		</div>
		<div v-else>
			<div v-for="i in 5" :key="i" data-aos="fade-right">
				<div class="song loading">
					<div class="flex">
						<h1 class="index noselect mono">{{ i }}</h1>
						<div class="loadinfo">
							<h4 class="title">
								<span
									class="skeleton-box"
									:style="`width: ${barWidths[(i - 1) * 2]}%`"
								></span>
							</h4>
							<h5 class="artist">
								<span
									class="skeleton-box"
									:style="`width: ${barWidths[(i - 1) * 2 + 1]}%`"
								></span>
							</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
var url = ''
export default {
	data() {
		return {
			songs: false,
			barWidths: []
		}
	},
	created() {
		this.barWidths = Array.from({ length: 10 }, () =>
			Math.floor(Math.random() * (80 - 45)) + 45
		)
	},
	mounted() {
		this.getSongs()
	},
	methods: {
		getSongs() {
			url = '/api/top-tracks'
			axios
				.get(url)
				.then((res) => {
					this.songs = res.data.tracks
				})
				.catch(() => {
					this.songs = []
				})
		}
	}
}
</script>

<style scoped lang="scss">
a.yah {
	border-bottom: 1px dashed rgba(34, 34, 34, 0.4);
	transition: 0.3s;
}
a.yah:hover {
	background-color: rgba(127, 255, 212, 0.26);
}
.song {
	transition: 0.3s;
	padding: 1em;
	border-radius: 0.5em;
	// width: 100%;
	.flex {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.index.index {
			font-size: 2em;
			font-variant-numeric: tabular-nums;
			margin: 0;
			margin-right: 1em;
			transition: 0.3s;
			line-height: 0;
		}
		.title {
			font-size: 1.2em;
			margin: 0;
			min-width: 100%;
		}
		.artist {
			font-size: 1em;
			margin: 0;
			opacity: 0.75;
		}
	}
}
.song:not(.loading):hover {
	background-color: rgba(164, 248, 175, 0.25);
	color: rgb(21, 117, 8);
	.flex {
		.index {
			margin-right: 1.35em;
			color: #222;
		}
		.artist {
			opacity: 0.7;
		}
	}
}
.songbro {
	display: flex;
}
.loadinfo {
	width: 100%;
}
// SKELETON
.skeleton-box {
	display: inline-block;
	height: 1em;
	position: relative;
	overflow: hidden;
	background-color: #dddbdd;
	&::after {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		transform: translateX(-100%);
		background-image: linear-gradient(
			90deg,
			rgba(#fff, 0) 0,
			rgba(#fff, 0.2) 20%,
			rgba(#fff, 0.5) 60%,
			rgba(#fff, 0)
		);
		animation: shimmer 2s infinite;
		content: '';
	}
	@keyframes shimmer {
		100% {
			transform: translateX(100%);
		}
	}
}
.blog-post {
	&__headline {
		font-size: 1.25em;
		font-weight: bold;
	}
	&__meta {
		font-size: 0.85em;
		color: #6b6b6b;
	}
}
.o-media {
	display: flex;
	&__body {
		flex-grow: 1;
		margin-left: 1em;
	}
}
.o-vertical-spacing {
	> * + * {
		margin-top: 0.75em;
	}
	&--l {
		> * + * {
			margin-top: 2em;
		}
	}
}
</style>
