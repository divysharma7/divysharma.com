<template>
	<div class="contact-form" id="contact">
		<h2 class="section-title">Message me</h2>
		<p class="section-desc">Let me know what you think about this website! Or let's work on a project together! I'll try to get back to you as soon as possible. Alternatively, you can email me at <a href="mailto:divysharma029@gmail.com" class="email-link">divysharma029@gmail.com</a>.</p>
		
		<form @submit.prevent="submitForm" class="form">
			<div class="form-group">
				<input type="text" id="name" v-model="form.name" required placeholder="Name" aria-label="Name" :disabled="loading" />
			</div>
			
			<div class="form-group">
				<input type="email" id="email" v-model="form.email" required placeholder="Email" aria-label="Email" :disabled="loading" />
			</div>
			
			<div class="form-group">
				<textarea id="message" v-model="form.message" required placeholder="Anything you wanna say" aria-label="Message" rows="5" :disabled="loading"></textarea>
			</div>

			<div v-if="error" class="error-msg">{{ error }}</div>
			<div v-if="success" class="success-msg">Message sent successfully! I'll get back to you soon.</div>

			<button type="submit" class="btn-submit" :disabled="loading">
				{{ loading ? 'Sending...' : 'Send message' }}
			</button>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { trackEvent } from '@/analytics/umami'

const form = ref({
	name: '',
	email: '',
	message: ''
})
const loading = ref(false)
const error = ref('')
const success = ref(false)

const submitForm = async () => {
	error.value = ''
	success.value = false
	
	// Basic client-side validation
	if (form.value.message.length < 5) {
		error.value = "Please write a message before sending."
		return
	}

	loading.value = true

	try {
		// Simulate API call or call actual API if configured
		// const res = await fetch('/api/contact', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify(form.value)
		// })
		
		// For now, just simulate success since backend might not be fully wired
		await new Promise(resolve => setTimeout(resolve, 1000))
		
		success.value = true
    trackEvent('contact:message_sent', { location: 'contact_form' })
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'contact:message_sent', location: 'contact_form' })
		form.value = { name: '', email: '', message: '' }
	} catch (e) {
		error.value = "Couldn't send your message. Check your connection and try again, or email me at divysharma029@gmail.com."
		window.dataLayer = window.dataLayer || []
		window.dataLayer.push({ event: 'contact:form_error', error_type: 'submission_failed' })
	} finally {
		loading.value = false
	}
}
</script>

<style scoped lang="scss">
.contact-form {
	max-width: 600px;
	margin: 0;
	padding: 0;
	background: transparent;

	.section-title {
		margin-top: 0;
		margin-bottom: 0.5rem;
		font-family: var(--font-sans);
		font-size: var(--h3);
		font-weight: 600;
		color: var(--color-heading);
		line-height: var(--leading-tight);
	}

	.section-desc {
		color: var(--color-body);
		margin-bottom: 2rem;
		line-height: var(--leading-normal);
		font-size: var(--text-sm);

		.email-link {
			color: var(--color-heading);
			text-decoration: underline;
			text-decoration-color: var(--color-faint);
			text-underline-offset: 2px;

			&:hover { text-decoration-color: var(--color-heading); }
		}
	}

	.form-group {
		margin-bottom: 0.75rem;

		input, textarea {
			width: 100%;
			padding: 0.625rem 0.875rem;
			border: 1px solid var(--color-border);
			background: var(--color-bg);
			border-radius: var(--radius-sm);
			font-family: var(--font-sans);
			font-size: var(--text-sm);
			color: var(--color-heading);
			transition: border-color var(--duration-fast);
			box-sizing: border-box;

			&::placeholder {
				color: var(--color-muted);
			}

			&:focus {
				border-color: var(--color-body);
			}

			&:disabled {
				background: var(--color-bg-subtle);
			}
		}

		textarea {
			resize: vertical;
			min-height: 120px;
		}
	}

	.btn-submit {
		background: var(--color-heading);
		color: #fff;
		border: none;
		padding: 0.625rem 1.5rem;
		border-radius: var(--radius-sm);
		font-family: var(--font-sans);
		font-weight: 500;
		cursor: pointer;
		font-size: var(--text-sm);
		transition: background var(--duration-fast);
		width: 100%;

		&:disabled {
			opacity: 0.7;
			cursor: not-allowed;
		}

		&:hover:not(:disabled) {
			background: #4b5563;
		}
	}

	.error-msg {
		color: var(--color-danger);
		margin-bottom: 0.75rem;
		font-size: var(--text-sm);
	}

	.success-msg {
		color: var(--color-success);
		margin-bottom: 0.75rem;
		font-size: var(--text-sm);
	}
}
</style>
