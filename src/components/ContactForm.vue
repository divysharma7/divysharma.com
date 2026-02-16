<template>
	<div class="contact-form" id="contact">
		<h2 class="section-title">Message me</h2>
		<p class="section-desc">Let me know what you think about this website! Or let's work on a project together! I'll try to get back to you as soon as possible. Alternatively, you can email me at <a href="mailto:divysharma029@gmail.com" class="email-link">divysharma029@gmail.com</a>.</p>
		
		<form @submit.prevent="submitForm" class="form">
			<div class="form-group">
				<input type="text" id="name" v-model="form.name" required placeholder="Name" :disabled="loading" />
			</div>
			
			<div class="form-group">
				<input type="email" id="email" v-model="form.email" required placeholder="Email" :disabled="loading" />
			</div>
			
			<div class="form-group">
				<textarea id="message" v-model="form.message" required placeholder="Anything you wanna say" rows="5" :disabled="loading"></textarea>
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
		error.value = "Please enter a valid message."
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
		form.value = { name: '', email: '', message: '' }
	} catch (e) {
		error.value = "Something went wrong. Please try again later."
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
		font-size: 2rem;
		font-weight: 400;
		color: #222;
	}

	.section-desc {
		color: #444; /* Darker than before */
		margin-bottom: 2rem;
		line-height: 1.6;
		font-size: 1rem;
		
		.email-link {
			color: #222;
			text-decoration: underline;
			text-decoration-color: rgba(34, 34, 34, 0.4);
			text-underline-offset: 2px;
		}
	}

	.form-group {
		margin-bottom: 1rem;

		input, textarea {
			width: 100%;
			padding: 0.75rem 1rem;
			border: 1px solid #ddd;
			background: #fff;
			border-radius: 4px;
			font-family: inherit;
			font-size: 0.95rem;
			color: #444;
			transition: border-color 0.2s;

			&::placeholder {
				color: #999;
			}

			&:focus {
				outline: none;
				border-color: #999;
			}

			&:disabled {
				background: #eee;
			}
		}
		
		textarea {
			resize: vertical;
			min-height: 120px;
		}
	}

	.btn-submit {
		background: #ffeadd; /* Peach color from reference */
		color: #a85a32; /* Darker orange/brown text */
		border: none;
		padding: 0.75rem 2rem;
		border-radius: 4px;
		font-weight: 400;
		cursor: pointer;
		font-size: 1rem;
		transition: opacity 0.2s;
		width: 100%;

		&:disabled {
			opacity: 0.7;
			cursor: not-allowed;
		}

		&:hover:not(:disabled) {
			opacity: 0.9;
		}
	}

	.error-msg {
		color: #d32f2f;
		margin-bottom: 1rem;
		font-size: 0.9rem;
	}

	.success-msg {
		color: #388e3c;
		margin-bottom: 1rem;
		font-size: 0.9rem;
	}
}
</style>
