<template>
	<div class="spotify-widget" v-if="enabled">
		<div class="icon-wrapper">
			<img v-if="isPlaying" :src="coverUrl" alt="Album Art" class="album-art spin" />
			<div v-else class="placeholder-icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="#1DB954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.2-1.32 9.6-.66 13.38 1.68.42.18.6.72.36 1.141zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.38 4.2-1.26 11.28-1.02 14.52 1.02.54.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.24z"/></svg>
			</div>
		</div>
		<div class="info">
			<div class="status">
				<span v-if="isPlaying" class="playing-text">Now Playing</span>
				<span v-else class="idle-text">Not Playing</span>
			</div>
			<div v-if="isPlaying" class="track-info">
				<a :href="spotifyUrl" target="_blank" rel="noopener" class="track-name">{{ track }}</a>
				<span class="artist-name">by {{ artist }}</span>
			</div>
			<div v-else class="track-info">
				<span class="track-name">Spotify</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const enabled = ref(true) // Can be controlled by env var logic if needed
const isPlaying = ref(false)
const track = ref('')
const artist = ref('')
const coverUrl = ref('')
const spotifyUrl = ref('')
let intervalId = null

const fetchNowPlaying = async () => {
	try {
		const res = await fetch('/api/spotify')
		if (res.status === 204 || res.status > 400) {
			isPlaying.value = false
			return
		}
		const data = await res.json()
		if (data.isPlaying) {
			isPlaying.value = true
			track.value = data.title
			artist.value = data.artist
			coverUrl.value = data.albumImageUrl
			spotifyUrl.value = data.songUrl
		} else {
			isPlaying.value = false
		}
	} catch (e) {
		console.error('Error fetching Spotify data', e)
		isPlaying.value = false
	}
}

onMounted(() => {
	fetchNowPlaying()
	intervalId = setInterval(fetchNowPlaying, 30000) // Poll every 30s
})

onUnmounted(() => {
	if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped lang="scss">
.spotify-widget {
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 1rem;
	border: 1px solid #eee;
	border-radius: 8px;
	background: #fafafa;
	max-width: 300px;

	.icon-wrapper {
		width: 48px;
		height: 48px;
		flex-shrink: 0;
		
		.album-art {
			width: 100%;
			height: 100%;
			border-radius: 4px;
			object-fit: cover;
		}

		.placeholder-icon {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #eee;
			border-radius: 4px;
			color: #888;
		}
	}

	.info {
		display: flex;
		flex-direction: column;
		overflow: hidden;

		.status {
			font-size: 0.7rem;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			margin-bottom: 0.2rem;
			
			.playing-text {
				color: #1db954;
				font-weight: 600;
			}
			
			.idle-text {
				color: #888;
			}
		}

		.track-info {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 0.9rem;
			
			.track-name {
				font-weight: 600;
				color: #111;
				text-decoration: none;
				margin-right: 0.3rem;
				
				&:hover {
					text-decoration: underline;
				}
			}

			.artist-name {
				color: #666;
				font-size: 0.85rem;
			}
		}
	}
}

@keyframes spin {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}
</style>
