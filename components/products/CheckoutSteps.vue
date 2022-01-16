<script setup>
// import { useAuth } from '~/pinia/useAuth'
import { useCart } from '~/pinia/useCart'

defineProps({
  step1: Boolean,
  step2: Boolean,
  step3: Boolean,
  step4: Boolean,
})
// const auth = useAuth()
const cart = useCart()

cart.updateCustomerInfo()
// console.log('AU', auth.user)
// const cart = useCart()
</script>

<template>
  <div>
    <!-- {{ cart.customer }}===={{ cart.items }} -->
    <nav class="checkout-steps">
      <div class="step" :class="{ active: step1 }">
        <nuxt-link :to="{ name: 'auth-login' }">Sign In</nuxt-link>
        <!-- <a v-else class="disabled">Sign In</a> -->
      </div>
      <div class="step" :class="{ active: step2 }">
        <nuxt-link :to="{ name: 'shipping' }">Shipping</nuxt-link>
        <!-- <a v-else class="disabled">Shipping</a> -->
      </div>
      <div class="step" :class="{ active: step3 }">
        <nuxt-link :to="{ name: 'shipping' }">Payment</nuxt-link>
        <!-- <a v-else class="disabled">Payment</a> -->
      </div>
      <div class="step" :class="{ active: step4 }">
        <nuxt-link :to="{ name: 'shipping' }">Place Order</nuxt-link>
        <!-- <a v-else class="disabled">Place Order</a> -->
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.checkout-steps {
  display: flex;
  justify-content: space-around;
  font-size: 1.6rem;
  margin: 2rem 0;

  .step {
    display: flex;
    justify-content: center;
    cursor: pointer;
    flex: 1;
    border-top: 0.3rem solid #c0c0c0;
    color: #c0c0c0;
    padding: 1rem;
    cursor: not-allowed;

    &.active {
      border-top: 0.3rem solid #f0c040;
      color: #f0c040;
      font-weight: bold;
    }
  }
}
</style>
