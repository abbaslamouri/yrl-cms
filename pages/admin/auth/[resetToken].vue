<script setup>
import axios from 'axios'

const route = useRoute()

const password = ref('test1234')
const confirmPassword = ref('test1234')

const resetPassword = async () => {
  const response = await axios({
    method: 'PATCH',
    url: `http://localhost:3000/api/v1/auth/resetpassword/${route.params.resetToken}`,
    data: {
      password: password.value,
      confirmPassword: confirmPassword.value,
    },
  })
  // console.log(response.data)
}
</script>

<template>
  <main class="form-wrap">
    <!-- <Head lang="en-US"><Title>Register</Title></Head> -->
    <form class="register" @submit.prevent="resetPassword">
      <!-- <p class="login-register">
        Already have an account?
        <NuxtLink :to="{ name: `admin-auth-login` }">Login</NuxtLink>
      </p> -->
      <h2>Reset Password</h2>
      <FormsBaseInput
        type="password"
        label="Password"
        icon="lock"
        v-model="password"
        leadingIcon="IconsHttpsFill"
        trailingIcon="IconsVisibilityFill"
        alternateTrailingIcon="IconsVisibilityOffFill"
        :required="true"
        minlength="8"
        maxlength="25"
      />
      <!-- <FormGroup type="password" label="Password" icon="lock" v-model="password" /> -->
      <FormsBaseInput
        type="password"
        label="Password"
        icon="lock"
        v-model="confirmPassword"
        leadingIcon="IconsHttpsFill"
        trailingIcon="IconsVisibilityFill"
        alternateTrailingIcon="IconsVisibilityOffFill"
        :required="true"
        minlength="8"
        maxlength="25"
      />
      <!-- <FormGroup type="confirmPassword" label="confirm Password" icon="lock" v-model="confirmPassword" /> -->
      <button class="btn">Reset Password</button>
    </form>
    <!-- <span class="background"> <img src="~/assets/images/background.jpg" /></span> -->
  </main>
</template>
