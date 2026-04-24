<template>
	<main>
		<h5 id="contact" class="smltitle zero">Message me</h5>
		<p class="sub">
			Let me know what you think about this website! Or let's work on a project
			together!
			<span v-if="!submitted">
				I'll try to get back to you as soon as possible. </span
			>Alternatively, you can email me at
			<a href="mailto:divysharma029@gmail.com" target="_blank">divysharma029@gmail.com</a>.
		</p>

		<div class="row">
			<!-- <div class="flex-center"> -->
			<div class="seven columns">
				<form v-if="!submitted" @submit.prevent="submitForm()">
					<input
						type="text"
						:disabled="loading"
						v-model="form.name"
						required
						placeholder="Name"
						aria-label="Name"
					/>
					<input
						type="email"
						v-model="form.email"
						required
						placeholder="Email"
						aria-label="Email"
						:disabled="loading"
					/>
					<textarea
						type="text"
						v-model="form.message"
						required
						placeholder="Anything you wanna say"
						aria-label="Message"
						:disabled="loading"
					/>

					<p v-if="error">{{ error }}</p>

					<div class="flex-center">
						<button
							type="submit"
							:disabled="loading"
							class="cool u-pull-right"
							:class="{ 'btn-loading': loading }"
						>
							<span v-if="!loading">Send message</span>
							<span v-if="loading">
								<div class="loader"></div>
							</span>
						</button>
					</div>
					<br />
				</form>
			</div>
			<div class="u-cf"></div>
			<div v-if="submitted">
				<p style="font-size: 1.2em">
					Thank you for the message! I'll get back to you as soon as possible.
				</p>
				<br />
			</div>
		</div>
	</main>
</template>

<script>
import axios from 'axios'
const errormsg =
	'An error occurred. Please try again, or message me on one of my socials instead.'
export default {
	data() {
		return {
			loading: false,
			submitted: false,
			error: false,
			form: {
				name: '',
				email: '',
				message: ''
			}
		}
	},
	methods: {
		submitForm() {
			this.loading = true
			var url = '/api/msg'
			axios
				.post(url, this.form)
				.then((res) => {
					if (res.data.error == false) {
						this.form.name = ''
						this.form.email = ''
						this.form.message = ''
						this.submitted = true
						this.loading = false
					} else {
						this.error = errormsg

						this.loading = false
						this.submitted = false
					}
				})
				.catch((err) => {
					this.error = errormsg
					this.loading = false
					this.submitted = false
				})
		}
	}
}
</script>

<style scoped lang="scss">
form input,
form textarea {
	background-color: rgba($color: #fff, $alpha: 0.2);
	min-width: 100%;
	max-width: 100%;
	font-family: var(--font-sans);
	transition: 0.2s;
}

form textarea {
	min-height: 6rem;
}

form input:focus,
form textarea:focus {
	border-color: var(--color-heading);
}

button {
	font-family: var(--font-sans);
	text-transform: initial;
}

.btn-loading {
	padding: 0 3em;
}

button.cool {
	// ff983a
	background-color: #ff993a32;
	color: #a0550f;
	border: none;
	transition: 0.3s;
	letter-spacing: 0;
	font-size: 0.9rem;
	width: fit-content;
	padding: 0.75rem 2rem;
	font-size: 1rem;
}

button.cool:hover:not(:disabled) {
	transform: translateY(0px);
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	box-shadow: none;
	background-color: #ff993a5b;
}

button.cool:disabled {
	transform: translateY(0px);
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	box-shadow: none;
	background-color: #ff993a5b;
	cursor: wait;
}

/* Loader */
.loader,
.loader:after {
	border-radius: 50%;
	width: 1rem;
	height: 1rem;
}
.loader {
	margin: 0 auto;
	font-size: 10px;
	position: relative;
	border: 0.2em solid rgba(255, 255, 255, 0.847);
	// border-right: 0.2em solid rgba(255, 255, 255, 0.2);
	// border-bottom: 0.2em solid rgba(255, 255, 255, 0.2);
	border-left: 0.2em solid #a0550f;
	// border-left: 0.2em solid #fff;
	-webkit-transform: translateZ(0);
	-ms-transform: translateZ(0);
	transform: translateZ(0);
	-webkit-animation: load8 1.1s infinite linear;
	animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
	0% {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}
@keyframes load8 {
	0% {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

@media (max-width: 750px) {
	button.cool {
		margin-bottom: 3rem;
		width: 60%;
		margin-top: 0.75em;
	}
}

.flex-centerbro {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
