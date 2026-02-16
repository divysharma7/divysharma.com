<template>
	<div class="blog-detail-page">
		<!-- Progress Bar -->
		<div class="progress-container">
			<div class="progress-bar" :style="{ width: progress + '%' }"></div>
		</div>

		<!-- Desktop: Floating neumorphic text size panel -->
		<transition name="panel-fade">
			<div v-if="showDesktopPanel && post" class="font-panel-desktop">
				<button class="panel-close" @click="showDesktopPanel = false">✕</button>
				<div class="panel-body">
					<button 
						class="panel-btn" 
						@click="increaseFontSize" 
						:disabled="fontSize >= 24"
					>+</button>
					<div class="panel-size">{{ fontSize }}px</div>
					<button 
						class="panel-btn" 
						@click="decreaseFontSize" 
						:disabled="fontSize <= 12"
					>−</button>
				</div>
			</div>
		</transition>

		<!-- Mobile: Bottom sheet overlay -->
		<transition name="sheet-fade">
			<div v-if="showMobileSheet" class="mobile-sheet-overlay" @click.self="showMobileSheet = false">
				<transition name="sheet-slide">
					<div v-if="showMobileSheet" class="mobile-sheet">
						<div class="sheet-handle"></div>
						<h3 class="sheet-title">Font Size</h3>
						<div class="sheet-size">{{ fontSize }}px</div>
						<div class="sheet-sublabel">Current font size</div>

						<div class="sheet-buttons">
							<button class="sheet-btn" @click="decreaseFontSize" :disabled="fontSize <= 12">−</button>
							<button class="sheet-btn reset" @click="resetFontSize">Reset</button>
							<button class="sheet-btn" @click="increaseFontSize" :disabled="fontSize >= 24">+</button>
						</div>

						<div class="sheet-slider-row">
							<span class="slider-label">12px</span>
							<input 
								type="range" 
								min="12" 
								max="24" 
								v-model.number="fontSize" 
								class="sheet-slider"
							/>
							<span class="slider-label">24px</span>
						</div>
					</div>
				</transition>
			</div>
		</transition>

		<div class="container">
			<div v-if="!post" class="not-found">
				<h1>Post Not Found</h1>
				<p>The blog post you're looking for doesn't exist.</p>
				<router-link to="/blog" class="back-link">← Back to Blog</router-link>
			</div>

			<article v-else class="blog-post">
				<!-- Back Link -->
				<router-link to="/blog" class="back-link">← Back to Blog</router-link>

				<!-- Cover Image -->
				<div class="post-cover" v-if="post.coverImageUrl">
					<img :src="post.coverImageUrl" :alt="post.title" />
				</div>

				<!-- Metadata -->
				<div class="post-meta">
					<div class="post-tags">
						<router-link 
							v-for="tag in post.tags" 
							:key="tag"
							:to="`/blog?tag=${tag}`"
							class="tag"
						>
							{{ tag }}
						</router-link>
					</div>
					<span class="post-date">📅 {{ formatDate(post.publishedAt) }}</span>
				</div>

				<!-- Title -->
				<h1 class="post-title">{{ post.title }}</h1>
				
				<!-- Description/Excerpt -->
				<p class="post-excerpt">{{ post.excerpt }}</p>

				<!-- Interaction Bar -->
				<div class="interaction-bar">
					<div class="actions">
						<button @click="toggleLike" class="action-btn like-btn" :class="{ 'active': isLiked }">
							<span class="icon">{{ isLiked ? '❤️' : '♡' }}</span>
							<span class="count" v-if="likeCount > 0">{{ likeCount }}</span>
						</button>
						<button @click="incrementClaps" class="action-btn clap-btn" :class="{ 'active': localClaps > 0 }">
							<span class="icon">👏</span>
							<span class="count" :class="{ 'clap-count': localClaps > 0 }">{{ localClaps }}</span>
						</button>
						<button class="action-btn comment-btn">
							<span class="icon">💬</span>
							<span class="count" v-if="commentCount > 0">{{ commentCount }}</span>
						</button>
						<button @click="sharePost" class="action-btn share-btn mobile-only">
							<span class="icon">↗</span>
							<span class="count">Share</span>
						</button>
					</div>

					<!-- Desktop: open floating panel -->
					<button class="settings-btn desktop-only" @click="showDesktopPanel = !showDesktopPanel" title="Text size settings">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
					</button>

					<!-- Mobile: open bottom sheet -->
					<button class="settings-btn mobile-only" @click="showMobileSheet = true" title="Text size settings">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
					</button>
				</div>

				<div class="separator-dots">•••</div>

				<!-- Content -->
				<div 
					class="post-content" 
					v-html="formattedContent"
					:style="{ fontSize: fontSize + 'px' }"
				></div>
			</article>
		</div>
	</div>
</template>

<script>
import { posts } from '@/data/posts'

export default {
	name: 'BlogDetail',
	data() {
		return {
			post: null,
			progress: 0,
			fontSize: 16,
			localClaps: 0,
			isLiked: false,
			likeCount: 0,
			commentCount: 0,
			showDesktopPanel: false,
			showMobileSheet: false
		}
	},
	computed: {
		formattedContent() {
			if (!this.post) return ''
			let html = this.post.content
			html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
			html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
			html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
			html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
			html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
			html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
			html = html.replace(/\n\n/g, '</p><p>')
			html = html.replace(/\n/g, '<br>')
			html = html.replace(/^- (.*$)/gim, '<li>$1</li>')
			html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
			return `<p>${html}</p>`
		}
	},
	methods: {
		formatDate(dateString) {
			const date = new Date(dateString)
			return date.toLocaleDateString('en-US', { 
				year: 'numeric', 
				month: 'long', 
				day: 'numeric' 
			})
		},
		loadPost() {
			const slug = this.$route.params.slug
			this.post = posts.find(p => p.slug === slug) || null
			this.localClaps = 0
			this.isLiked = false
			this.likeCount = 0
			this.commentCount = 0
			this.progress = 0
		},
		updateProgress() {
			const scrollTop = window.scrollY
			const docHeight = document.body.scrollHeight - window.innerHeight
			const scrollPercent = (scrollTop / docHeight) * 100
			this.progress = Math.min(100, Math.max(0, scrollPercent))
		},
		increaseFontSize() {
			if (this.fontSize < 24) this.fontSize += 1
		},
		decreaseFontSize() {
			if (this.fontSize > 12) this.fontSize -= 1
		},
		resetFontSize() {
			this.fontSize = 16
		},
		incrementClaps() {
			this.localClaps++
		},
		toggleLike() {
			this.isLiked = !this.isLiked
			this.likeCount += this.isLiked ? 1 : -1
		},
		sharePost() {
			if (navigator.share) {
				navigator.share({
					title: this.post.title,
					text: this.post.excerpt,
					url: window.location.href
				})
			} else {
				navigator.clipboard.writeText(window.location.href)
			}
		}
	},
	mounted() {
		this.loadPost()
		window.addEventListener('scroll', this.updateProgress)
	},
	beforeUnmount() {
		window.removeEventListener('scroll', this.updateProgress)
	},
	watch: {
		'$route.params.slug'() {
			this.loadPost()
		}
	}
}
</script>

<style scoped lang="scss">
/* ─── Responsive helpers ─── */
.desktop-only { display: inline-flex; }
.mobile-only  { display: none; }
@media (max-width: 768px) {
	.desktop-only { display: none !important; }
	.mobile-only  { display: inline-flex !important; }
}

/* ─── Layout ─── */
.blog-detail-page {
	padding: 4rem 0;
	min-height: 80vh;
	font-family: var(--fontSans);
}

.progress-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 3px;
	background: transparent;
	z-index: 1000;

	.progress-bar {
		height: 100%;
		background: var(--red-text, #6a788c);
		transition: width 0.15s ease;
	}
}

.container {
	max-width: 41em;
	margin: 0 auto;
	padding: 0 2em;
}

/* ─── Desktop Floating Neumorphic Panel ─── */
.font-panel-desktop {
	position: fixed;
	right: 2.5rem;
	top: 50%;
	transform: translateY(-50%);
	z-index: 900;
	background: var(--bg-color, #FFF3E6);
	border-radius: 24px;
	padding: 1rem 0.75rem;
	box-shadow:
		6px 6px 14px rgba(180, 160, 130, 0.18),
		-6px -6px 14px rgba(255, 255, 255, 0.6);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.25rem;

	.panel-close {
		position: absolute;
		top: -10px;
		right: -10px;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background: #060c17;
		color: #fff;
		border: none;
		font-size: 0.7rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2px 8px rgba(6, 12, 23, 0.25);
		transition: all 0.3s;

		&:hover {
			background: var(--red-text, #6a788c);
			transform: rotate(90deg);
		}
	}

	.panel-body {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.panel-btn {
		width: 60px;
		height: 60px;
		border-radius: 16px;
		border: none;
		background: var(--bg-color, #FFF3E6);
		font-size: 1.6rem;
		font-weight: 300;
		color: #060c17;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--fontSans);
		box-shadow:
			inset 2px 2px 4px rgba(255,255,255,0.55),
			inset -2px -2px 4px rgba(180, 160, 130, 0.08),
			4px 4px 10px rgba(180, 160, 130, 0.12),
			-4px -4px 10px rgba(255, 255, 255, 0.55);
		transition: all 0.2s;

		&:hover:not(:disabled) {
			box-shadow:
				inset 2px 2px 5px rgba(180, 160, 130, 0.1),
				inset -2px -2px 5px rgba(255, 255, 255, 0.5);
		}

		&:active:not(:disabled) {
			box-shadow:
				inset 3px 3px 6px rgba(180, 160, 130, 0.15),
				inset -3px -3px 6px rgba(255, 255, 255, 0.4);
			transform: scale(0.95);
		}

		&:disabled {
			opacity: 0.3;
			cursor: not-allowed;
		}
	}

	.panel-size {
		width: 60px;
		height: 60px;
		border-radius: 16px;
		background: var(--bg-color, #FFF3E6);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.1rem;
		font-weight: 700;
		color: #060c17;
		font-family: var(--fontSans);
		box-shadow:
			inset 2px 2px 5px rgba(180, 160, 130, 0.1),
			inset -2px -2px 5px rgba(255, 255, 255, 0.5);
	}
}

.panel-fade-enter-active,
.panel-fade-leave-active {
	transition: opacity 0.3s, transform 0.3s;
}
.panel-fade-enter-from,
.panel-fade-leave-to {
	opacity: 0;
	transform: translateY(-50%) translateX(20px);
}

/* ─── Mobile Bottom Sheet ─── */
.mobile-sheet-overlay {
	position: fixed;
	inset: 0;
	background: rgba(6, 12, 23, 0.3);
	z-index: 1100;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	backdrop-filter: blur(2px);
}

.mobile-sheet {
	width: 100%;
	max-width: 480px;
	background: rgb(255, 254, 248);
	border-radius: 20px 20px 0 0;
	padding: 1.25rem 2rem 2.5rem;
	text-align: center;
	font-family: var(--fontSans);

	.sheet-handle {
		width: 40px;
		height: 5px;
		background: #ccc;
		border-radius: 3px;
		margin: 0 auto 1.25rem;
	}

	.sheet-title {
		font-size: 1rem;
		font-weight: 600;
		color: #060c17;
		margin: 0 0 0.5rem;
	}

	.sheet-size {
		font-size: 2.25rem;
		font-weight: 800;
		color: #060c17;
		margin-bottom: 0.1rem;
	}

	.sheet-sublabel {
		font-size: 0.8rem;
		color: var(--red-text, #6a788c);
		margin-bottom: 1.5rem;
	}

	.sheet-buttons {
		display: flex;
		justify-content: center;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.sheet-btn {
		width: 56px;
		height: 44px;
		border: 1px solid #e0d8cc;
		border-radius: 10px;
		background: rgb(255, 254, 248);
		font-size: 1.25rem;
		font-weight: 500;
		color: #060c17;
		cursor: pointer;
		transition: all 0.2s;
		font-family: var(--fontSans);

		&:hover:not(:disabled) {
			background: var(--bg-color, #FFF3E6);
		}

		&:active:not(:disabled) {
			transform: scale(0.95);
		}

		&:disabled {
			opacity: 0.3;
			cursor: not-allowed;
		}

		&.reset {
			width: auto;
			padding: 0 1rem;
			font-size: 0.9rem;
			color: var(--red-text, #6a788c);
			border-color: var(--red-text, #6a788c);
		}
	}

	.sheet-slider-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;

		.slider-label {
			font-size: 0.8rem;
			color: var(--red-text, #6a788c);
			min-width: 30px;
		}

		.sheet-slider {
			flex: 1;
			-webkit-appearance: none;
			appearance: none;
			height: 5px;
			border-radius: 3px;
			background: #e0d8cc;
			outline: none;

			&::-webkit-slider-thumb {
				-webkit-appearance: none;
				appearance: none;
				width: 20px;
				height: 20px;
				border-radius: 50%;
				background: #060c17;
				cursor: pointer;
				border: 3px solid rgb(255, 254, 248);
				box-shadow: 0 1px 6px rgba(6, 12, 23, 0.2);
			}

			&::-moz-range-thumb {
				width: 20px;
				height: 20px;
				border-radius: 50%;
				background: #060c17;
				cursor: pointer;
				border: 3px solid rgb(255, 254, 248);
				box-shadow: 0 1px 6px rgba(6, 12, 23, 0.2);
			}
		}
	}
}

.sheet-fade-enter-active,
.sheet-fade-leave-active {
	transition: opacity 0.25s;
}
.sheet-fade-enter-from,
.sheet-fade-leave-to {
	opacity: 0;
}

.sheet-slide-enter-active,
.sheet-slide-leave-active {
	transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1);
}
.sheet-slide-enter-from,
.sheet-slide-leave-to {
	transform: translateY(100%);
}

/* ─── Not Found ─── */
.not-found {
	text-align: center;
	padding: 4rem 2rem;

	h1 {
		font-size: 2rem;
		margin-bottom: 1rem;
		color: #060c17;
	}

	p {
		color: var(--red-text, #6a788c);
		margin-bottom: 2rem;
	}
}

.back-link {
	display: inline-block;
	color: var(--red-text, #6a788c);
	text-decoration: none;
	margin-bottom: 2rem;
	font-size: 0.95rem;
	transition: 0.3s;

	&:hover {
		color: #060c17;
		opacity: 0.7;
	}
}

/* ─── Blog Post ─── */
.blog-post {
	.post-cover {
		width: 100%;
		height: 400px;
		margin-bottom: 2rem;
		border-radius: 8px;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.post-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid #e0d8cc;
	}

	.post-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		background: var(--bg-color, #FFF3E6);
		border: 1px solid #e0d8cc;
		border-radius: 12px;
		font-size: 0.75rem;
		color: var(--red-text, #6a788c);
		text-decoration: none;
		transition: all 0.3s;

		&:hover {
			background: #060c17;
			color: #fff;
			border-color: #060c17;
		}
	}

	.post-date {
		font-size: 0.9rem;
		color: var(--red-text, #6a788c);
	}

	.post-title {
		font-size: 2.5rem;
		font-weight: 700;
		line-height: 1.2;
		margin: 0 0 1rem 0;
		color: #060c17;
	}

	.post-excerpt {
		font-size: 1.15rem;
		color: var(--red-text, #6a788c);
		line-height: 1.6;
		margin-bottom: 2rem;
		opacity: 0.9;
	}

	/* ─── Interaction Bar ─── */
	.interaction-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 0;
		margin: 2rem 0;
		border-top: 1px solid #e0d8cc;
		border-bottom: 1px solid #e0d8cc;

		.actions {
			display: flex;
			gap: 0.5rem;
			align-items: center;
		}

		.action-btn {
			background: none;
			border: none;
			font-size: 1.15rem;
			cursor: pointer;
			padding: 0.4rem 0.5rem;
			border-radius: 20px;
			transition: all 0.3s;
			display: flex;
			align-items: center;
			gap: 0.3rem;
			color: var(--red-text, #6a788c);

			&:hover {
				background: rgba(0, 0, 0, 0.04);
			}

			&.active {
				color: #060c17;
				
				.icon {
					transform: scale(1.15);
					transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
				}
			}
			
			.count {
				font-size: 0.85rem;
				font-weight: 600;
			}

			.clap-count {
				color: #c67a1b;
			}
		}

		.settings-btn {
			background: none;
			border: none;
			cursor: pointer;
			color: var(--red-text, #6a788c);
			padding: 0.4rem;
			border-radius: 8px;
			transition: all 0.3s;
			align-items: center;
			justify-content: center;

			&:hover {
				color: #060c17;

				svg {
					transform: rotate(30deg);
					transition: transform 0.3s;
				}
			}
		}
	}

	.separator-dots {
		text-align: center;
		letter-spacing: 0.5rem;
		color: #ccc4b5;
		margin: 2rem 0;
		font-size: 1.25rem;
	}

	/* ─── Post Content ─── */
	.post-content {
		line-height: 1.8;
		color: #060c17;
		transition: font-size 0.25s ease;
		opacity: 0.9;

		:deep(h1),
		:deep(h2),
		:deep(h3) {
			margin: 2em 0 1em 0;
			color: #060c17;
			font-weight: 600;
			line-height: 1.3;
			opacity: 1;
		}

		:deep(h1) { font-size: 1.8em; }
		:deep(h2) { font-size: 1.5em; }
		:deep(h3) { font-size: 1.25em; }

		:deep(p) {
			margin-bottom: 1.5em;
		}

		:deep(a) {
			color: inherit;
			text-decoration: none;
			border-bottom: 1px dashed #abb0b6;
			transition: 300ms;

			&:hover {
				background-color: rgba(252, 184, 153, 0.493);
			}
		}

		:deep(blockquote) {
			margin: 2em 0;
			padding: 1em 1.5em;
			border-left: 3px solid var(--red-text, #6a788c);
			background: var(--bg-color, #FFF3E6);
			font-style: italic;
			color: var(--red-text, #6a788c);
			border-radius: 0 6px 6px 0;
		}

		:deep(ul) {
			margin: 1.5em 0;
			padding-left: 2rem;
		}

		:deep(li) {
			margin-bottom: 0.5em;
		}

		:deep(strong) {
			font-weight: 550;
			color: #060c17;
		}
	}
}

/* ─── Mobile ─── */
@media (max-width: 768px) {
	.blog-detail-page {
		padding: 2rem 0;
	}

	.container {
		padding: 0 1.5rem;
	}

	.blog-post {
		.post-cover {
			height: 250px;
		}

		.post-title {
			font-size: 1.75rem;
		}

		.interaction-bar {
			.actions {
				gap: 0.5rem;
			}

			.action-btn {
				border: 1px solid #e0d8cc;
				padding: 0.35rem 0.75rem;
				border-radius: 22px;
				font-size: 1rem;

				&.active {
					border-color: #060c17;
				}
			}
		}
	}
}
</style>
