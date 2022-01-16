<script setup>
	import { useAuth } from '~/pinia/useAuth'

	const router = useRouter()

	const auth = useAuth()

	const route = useRoute()

	const user = reactive({
		email: 'axl@yrlus.com',
		password: 'adrar0714',
	})

	const handleLogin = async () => {
		// mainStore.setSnackbar({ show: false })
		await auth.login(user)
		if (!auth.errorMsg) {
			router.push(route.query.redirect || '/admin')
			// } else {
			//   mainStore.setSnackbar({ show: true, message: auth.errorMsg })
		}
	}
</script>

<!-- <script>
export default {
  inheritAttrs: false,
}
</script> -->

<template>
	<main class="auth-wrap">
		<form @submit.prevent="handleLogin">
			<p class="account-check">
				Don't have an account?
				<NuxtLink class="nuxt-link" :to="{ name: `auth-register` }">Register</NuxtLink>
			</p>
			<h2>Login</h2>
			<FormsBaseInput
				type="email"
				label="Email"
				icon="envelope"
				v-model="user.email"
				leadingIcon="IconsPersonFill"
				trailingIcon="IconsPersonFill"
				:required="true"
				minlength="8"
				maxlength="25"
				hint="Enter a valid email"
				class="xxxxxxxxxxxx"
			/>
			<FormsBaseInput
				type="password"
				label="Password"
				icon="lock"
				v-model="user.password"
				leadingIcon="IconsHttpsFill"
				trailingIcon="IconsVisibilityFill"
				alternateTrailingIcon="IconsVisibilityOffFill"
				:required="true"
				minlength="8"
				maxlength="25"
			/>
			<button class="btn submit primary">Sign In</button>
			<p><NuxtLink class="nuxt-link" :to="{ name: `auth-forgot-password` }">Forgot Password?</NuxtLink></p>
		</form>
	</main>
</template>

<style lang="scss" scoped></style>
