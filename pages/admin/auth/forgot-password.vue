<script setup>
import axios from 'axios'

const email = ref('abbaslamouri@yrlus.com')

const sendPasswordResetEmail = async () => {
  const response = await axios({
    method: 'POST',
    url: 'http://localhost:3000/api/v1/auth/forgotpassword',
    data: { email: email.value },
  })
  // console.log(response.data)
}
</script>

<template>
  <main class="form-wrap">
    <form class="login" @submit.prevent="sendPasswordResetEmail">
      <p class="login-register">Forgot your password ? Enter your email to reset it</p>
      <FormsBaseInput
        type="email"
        label="Email"
        icon="envelope"
        v-model="email"
        leadingIcon="IconsPersonFill"
        trailingIcon="IconsPersonFill"
        :required="true"
        minlength="8"
        maxlength="25"
        hint="Enter a valid email"
      />
      <!-- <FormGroup type="email" label="Email" icon="envelope" v-model="email" /> -->
      <button class="btn">Reset Password</button>
    </form>
    <!-- <span class="background"> <img src="~/assets/images/background.jpg" /></span> -->
  </main>
</template>
