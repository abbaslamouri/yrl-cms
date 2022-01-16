<script setup>
import { useError } from '~/pinia/useError';
// import { useAuth } from '~/pinia/useAuth'
// import { useCart } from '~/pinia/useCart'

const appError = useError();

const error = computed(() => appError.snackbar);

// import { useCart } from '~/pinia/useCart'

// const cart = useCart()

// if (process.client) {
//   cart.cart = JSON.parse(localStorage.getItem('cart'))
// }
</script>
<template>
  <div>
    <!-- {{auth.user}} -->
    <NuxtPage />
    <!-- <SnackBar
      :show="error.show"
      :message="error.message"
      :snackbarType="error.type"
      :duration="error.duration"
      @hideSnackbar="error.show = false"
    /> -->
  </div>
</template>
