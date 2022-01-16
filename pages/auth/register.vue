<script setup>
// const { state, actions } = useAuth('auth')
// provide('state', state)
// provide('actions', actions)

import { useAuth } from '~/pinia/useAuth'

const router = useRouter()
const auth = useAuth()

const user = reactive({
  name: 'Abbas Lamouri',
  email: 'axl@yrlus.com',
  password: 'adrar0714',
  confirmPassword: 'adrar0714',
})

const handleRegister = async () => {
  await auth.register(user)
  // if (!authStore.errorMsg) {
  // router.push({ name: 'shop' })
  // }
}
</script>

<template>
  <main class="auth-wrap">
    <form @submit.prevent="handleRegister">
      <p class="account-check">
        Already have an account?
        <NuxtLink class="nuxt-link" :to="{ name: `auth-login` }">Login</NuxtLink>
      </p>
      <h2>Register</h2>
      <FormsBaseInput
        type="name"
        label="Name"
        icon="envelope"
        v-model="user.name"
        leadingIcon="IconsPersonFill"
        :required="true"
      />
      <FormsBaseInput
        type="email"
        label="Email"
        icon="envelope"
        v-model="user.email"
        leadingIcon="IconsEmailFill"
        :required="true"
        minlength="8"
        hint="Enter a valid email"
      />
      <!-- <FormsBaseInput
        type="password"
        label="Password"
        icon="lock"
        v-model="user.password"
        leadingIcon="IconsHttpsFill"
        trailingIcon="IconsVisibilityOffFilled"
        alternateTrailingIcon="IconsVisibilityFilled"
        :required="true"
        minlength="2"
      /> -->
      <!-- <FormsBaseInput
        type="password"
        label="Confirm Password"
        icon="lock"
        v-model="user.confirmPassword"
        leadingIcon="IconsHttpsFill"
        trailingIcon="IconsVisibilityOffFilled"
        alternateTrailingIcon="IconsVisibilityFilled"
        :required="true"
        minlength="2"
      /> -->
      <button class="btn submit primary">Sign Up</button>
    </form>
  </main>
</template>
