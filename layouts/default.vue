<script setup>
import { useAuth } from '~/pinia/useAuth'

// const cart = useCart()
const auth = useAuth()
// import { useAuth } from '~/pinia/useAuth'
// const authStore = useAuth()
// const router = useRouter()
// router.beforeEach((to, from) => {
// 	if (to.name === 'auth-login' && authStore.token) {
// 		return '/shop'
// 	}
// })

// const categoryStore = useCategory()
// categoryStore.fetchAll()
</script>

<template>
  <div class="app">
    <FreeShipping />
    <header>
      <div class="header">
        <Branding />
        <div class="profile-cart">
          <div class="profile">
            <LoginDropdown v-if="!auth.authenticated" />
            <ProfileDropdown v-else />
          </div>
          <ProductsNavCart />
        </div>
      </div>
    </header>
    <!-- <nav class="nav"> -->
    <MainNav />
    <!-- </nav> -->
    <main>
      <!-- <div class="main"> -->
      <slot />
      <!-- </div> -->
    </main>
    <footer><Footer /></footer>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.app {
  header {
    background-color: $slate-900;
    display: flex;
    align-items: center;
    justify-content: center;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      height: 6rem;
      padding: 0 2rem;
      width: 996px;

      .profile-cart {
        display: flex;
        align-items: center;
        gap: 2rem;
      }
    }
  }
}
</style>
