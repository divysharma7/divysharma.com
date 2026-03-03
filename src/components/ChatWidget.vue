<template>
	<div class="chat-wrapper" :class="{ open: isOpen }">
		<!-- Chat Window -->
		<transition name="fade-slide">
			<div v-if="isOpen" class="chat-window" role="dialog" aria-label="Chat">				
				<div class="chat-header">
					<div class="header-info">
						<div class="avatar-container">
							<img src="/bot-avatar-transparent.png" alt="Avatar" class="avatar-img" />
							<span class="status-indicator"></span>
						</div>
						<div class="header-text">
							<span class="title">Divy's Portfolio Assistant</span>
							<span class="status">
								<span class="dot"></span> Online
							</span>
						</div>
					</div>
				</div>

				<div class="chat-messages" ref="messagesContainer">
					<div v-if="messages.length === 0" class="welcome-section">
						<!-- Assistant Welcome -->
						<div class="message assistant">
							<div class="avatar-small">
								<img src="/bot-avatar-transparent.png" alt="Avatar" />
							</div>
							<div class="message-content">
								<p>Hello! I'm Divy's Portfolio Assistant. How can I help you regarding his work?</p>
							</div>
						</div>

						<div class="suggestions">
							<p class="suggestions-label">Quick questions:</p>
							<button
								v-for="q in suggestions"
								:key="q"
								@click="sendMessage(q)"
								class="suggestion-chip"
							>
								{{ q }}
							</button>
						</div>
					</div>

					<div
						v-for="(msg, i) in messages"
						:key="i"
						class="message"
						:class="msg.role"
					>
						<div v-if="msg.role === 'assistant'" class="avatar-small">
							<img src="/bot-avatar-transparent.png" alt="Avatar" />
						</div>
						<div class="message-content">
							<div v-html="markdownToHtml(msg.content)"></div>
						</div>
					</div>
					
					<div v-if="isLoading" class="message assistant loading">
						<div class="avatar-small">
							<img src="/bot-avatar-transparent.png" alt="Avatar" />
						</div>
						<div class="message-content bubble-loading">
							<div class="typing-dot"></div>
							<div class="typing-dot"></div>
							<div class="typing-dot"></div>
						</div>
					</div>
				</div>

				<div class="chat-input-area">
					<input
						v-model="input"
						@keydown.enter.prevent="sendMessage(input)"
						@keydown.escape="isOpen = false"
						aria-label="Message"
						autocomplete="off"
						placeholder="Ask me something..."
						:disabled="isLoading"
						ref="inputField"
					/>
					<button
						type="button"
						aria-label="Send message"
						@click="sendMessage(input)"
						:disabled="!input.trim() || isLoading"
						class="send-btn"
					>
						<i class="ph-bold ph-paper-plane-right"></i>
					</button>
				</div>
			</div>
		</transition>

		<!-- Toggle/Close Button -->
		<button
			class="chat-toggle"
			type="button"
			@click="isOpen = !isOpen"
			:class="{ open: isOpen }"
			aria-label="Toggle Chat"
		>
			<img v-if="!isOpen" src="/bot-avatar-transparent.png" alt="Chat" class="avatar-toggle" />
			<i v-else class="ph-bold ph-x"></i>
		</button>
	</div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'

const escapeHtml = (text) =>
	text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')

// Minimal markdown renderer (sanitized)
const markdownToHtml = (text) => {
	let html = escapeHtml(text)
	html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
	html = html.replace(
		/\[([^\]]+)\]\(([^)]+)\)/g,
		'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
	)
	html = html.replace(/\n/g, '<br>')
	return html
}

const isOpen = ref(false)
const input = ref('')
const isLoading = ref(false)
const messages = ref([])
const messagesContainer = ref(null)
const inputField = ref(null)

const suggestions = [
	'WHAT PROJECTS HAVE YOU WORKED ON RECENTLY?',
	'WHAT TECHNOLOGIES DO YOU SPECIALIZE IN?',
	'CAN YOU SUMMARIZE YOUR WORK EXPERIENCE?',
	'HOW CAN I CONTACT YOU FOR WORK?'
]

const scrollToBottom = async () => {
	await nextTick()
	if (messagesContainer.value) {
		messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
	}
}

const sendMessage = async (text) => {
	if (!text.trim() || isLoading.value) return

	const userMsg = { role: 'user', content: text }
	messages.value.push(userMsg)
	input.value = ''
	isLoading.value = true
	await scrollToBottom()

	try {
		const response = await fetch('/api/chat', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ 
				messages: messages.value.map(m => ({ role: m.role, content: m.content })) 
			})
		})

		if (!response.ok) throw new Error('Failed to fetch')

		const reader = response.body.getReader()
		const decoder = new TextDecoder()
		let assistantMsg = { role: 'assistant', content: '' }
		messages.value.push(assistantMsg)

		while (true) {
			const { done, value } = await reader.read()
			if (done) break
			const chunk = decoder.decode(value)
			assistantMsg.content += chunk
			messages.value[messages.value.length - 1] = { ...assistantMsg }
			await scrollToBottom()
		}

	} catch (error) {
		console.error(error)
		messages.value.push({ role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again later." })
	} finally {
		isLoading.value = false
		await scrollToBottom()
		inputField.value?.focus()
	}
}

watch(isOpen, async (val) => {
	if (val) {
		await nextTick()
		inputField.value?.focus()
		await scrollToBottom()
	}
})
</script>

<style scoped lang="scss">
/* Variables - Creamy Theme */
$bg-cream: #fcfbf7;
$bg-white: #ffffff;
$text-black: #2A2522; /* Deep Warm Brown */
$text-grey: #6a788c;
$border-beige: #e0d8cc;
$green-dot: #22c55e;
$shadow-soft: 0 12px 32px rgba(180, 160, 130, 0.15);

.chat-wrapper {
	position: fixed;
	bottom: 2rem;
	right: 2rem;
	z-index: 9999;
	font-family: var(--fontSans), 'Inter', sans-serif;
}

/* Toggle Button */
.chat-toggle {
	position: relative;
	z-index: 2;
	width: 4rem; /* Slightly larger for avatar */
	height: 4rem;
	border-radius: 50%;
	background: transparent;
	color: $bg-white;
	border: none;
	cursor: pointer;
	box-shadow: 0 4px 12px rgba(42, 37, 34, 0.2);
	transition: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.5rem;
	padding: 0; /* Remove padding for full image */
	overflow: hidden;

	&:hover {
		transform: scale(1.1);
	}

	&.open {
		background: $bg-white;
		color: $text-black;
		box-shadow: $shadow-soft;
		transform: rotate(90deg);
		
		&:hover {
			transform: rotate(90deg) scale(1.1);
		}
	}

	.avatar-toggle {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}

/* Window */
.chat-window {
	position: absolute;
	z-index: 1;
	bottom: 5rem;
	right: 0;
	width: 380px;
	height: 600px;
	max-height: 80vh;
	background: $bg-cream;
	border-radius: 24px;
	box-shadow: $shadow-soft;
	border: 1px solid $border-beige;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	color: $text-black;
	transform-origin: bottom right;
}

/* Header */
.chat-header {
	padding: 1.25rem 1.5rem;
	border-bottom: 1px solid rgba(224, 216, 204, 0.5);
	background: rgba(252, 251, 247, 0.9);
	backdrop-filter: blur(5px);
}

.header-info {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.avatar-container {
	position: relative;
	width: 48px;
	height: 48px;
}

.avatar-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	/* Removed border and background */
}

.status-indicator {
	position: absolute;
	bottom: 2px;
	right: 2px;
	width: 12px;
	height: 12px;
	background: $green-dot;
	border-radius: 50%;
	border: 2px solid $bg-white;
}

.header-text {
	display: flex;
	flex-direction: column;
	gap: 2px;
}

.title {
	font-weight: 700;
	font-size: 1rem;
	color: $text-black;
	letter-spacing: -0.01em;
}

.status {
	font-size: 0.75rem;
	color: $text-grey;
	font-weight: 500;
	display: flex;
	align-items: center;
	gap: 6px;

	.dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		background: $green-dot;
		border-radius: 50%;
	}
}

/* Messages */
.chat-messages {
	flex: 1;
	overflow-y: auto;
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	position: relative; /* For z-index context above cat */
	z-index: 10;
	background: transparent; /* Transparent so cat shows through */
}

.welcome-section {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.suggestions-label {
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: #9ca3af; /* Light grey label */
	margin-bottom: 0.5rem;
	margin-left: 0.25rem;
}

.suggestions {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.suggestion-chip {
	background: $bg-white;
	border: 1px solid $border-beige;
	color: $text-black;
	padding: 0.85rem 1.25rem;
	border-radius: 20px;
	font-size: 0.8rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.02em;
	cursor: pointer;
	transition: all 0.2s;
	text-align: left;
	box-shadow: 0 2px 4px rgba(0,0,0,0.02);
	font-family: inherit;
	line-height: 1.4;

	&:hover {
		background: #faf9f6;
		border-color: #d0c8be;
		transform: translateY(-1px);
		box-shadow: 0 4px 8px rgba(0,0,0,0.05);
	}
}

.message {
	display: flex;
	gap: 0.75rem;
	align-items: flex-start;
	max-width: 100%;
	font-size: 0.95rem;
	line-height: 1.6;

	&.user {
		align-self: flex-end;
		flex-direction: row-reverse;
		
		.message-content {
			background: #060c17; /* Black user bubble */
			color: #ffffff;
			padding: 0.85rem 1.25rem;
			border-radius: 20px 20px 4px 20px;
			box-shadow: 0 4px 10px rgba(6, 12, 23, 0.15);
		}
	}

	&.assistant {
		align-self: flex-start;
		
		.message-content {
			background: $bg-white;
			color: $text-black;
			border-radius: 4px 20px 20px 20px;
			padding: 1rem 1.25rem;
			border: 1px solid $border-beige;
			box-shadow: 0 2px 6px rgba(180, 160, 130, 0.05);
			max-width: 90%;
		}

		.avatar-small {
			flex-shrink: 0;
			width: 36px;
			height: 36px;
			
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				/* Removed border and background */
			}
		}
	}
}

/* Input Area */
.chat-input-area {
	padding: 1.25rem;
	background: $bg-white;
	border-top: 1px solid rgba(224, 216, 204, 0.5);
	display: flex;
	align-items: center;
	gap: 0.75rem;
	position: relative;
	z-index: 20; /* Ensure input is clickable above cat */
}

.chat-input-area input {
	flex: 1;
	padding: 0.85rem 1.25rem;
	background: $bg-cream;
	border: 1px solid transparent;
	color: $text-black;
	border-radius: 20px;
	outline: none;
	font-size: 0.95rem;
	transition: all 0.2s;
	font-family: inherit;

	&::placeholder {
		color: #9ca3af;
	}

	&:focus {
		background: #fff;
		border-color: $border-beige;
		box-shadow: 0 0 0 4px rgba(224, 216, 204, 0.2);
	}
}

.chat-input-area .send-btn {
	width: 44px;
	height: 44px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #060c17; /* Black send button */
	color: #fff;
	border: none;
	border-radius: 12px; /* Soft square */
	cursor: pointer;
	transition: all 0.2s;
	font-size: 1.2rem;
	
	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background: #ccc;
	}

	&:not(:disabled):hover {
		transform: scale(1.05);
		box-shadow: 0 4px 10px rgba(6, 12, 23, 0.2);
	}
}

/* Typing animation */
.bubble-loading {
	display: flex;
	gap: 5px;
	align-items: center;
	padding: 1.25rem 1.5rem !important;
	min-height: 48px;
}

.typing-dot {
	width: 6px;
	height: 6px;
	background: $text-grey;
	border-radius: 50%;
	animation: typing 1.4s infinite ease-in-out;
	opacity: 0.6;

	&:nth-child(1) { animation-delay: 0s; }
	&:nth-child(2) { animation-delay: 0.2s; }
	&:nth-child(3) { animation-delay: 0.4s; }
}

@keyframes typing {
	0%, 100% { transform: scale(1); opacity: 0.6; }
	50% { transform: scale(1.5); opacity: 1; }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
	transition: all 0.4s cubic-bezier(0.33, 1, 0.68, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
	opacity: 0;
	transform: translateY(40px) scale(0.9) skewX(1deg);
}

@media (max-width: 480px) {
	.chat-window {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100dvh;
		max-height: 100dvh;
		border-radius: 0;
		border: none;
	}
	
	.chat-wrapper {
		right: 1.5rem;
		bottom: calc(1.5rem + env(safe-area-inset-bottom));
	}

	.chat-wrapper.open {
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 10000;
	}
	
	.chat-toggle.open {
		position: fixed;
		bottom: 1.5rem;
		right: 1.5rem;
		z-index: 10001;
	}

	.chat-input-area {
		padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
	}
}
</style>
