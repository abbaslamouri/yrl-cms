<script setup>
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
    <header>
      <FreeShipping />
      <div class="header">
        <div class="header__top">
          <Branding />
          <div class="profile flex items-center gap-4">
            <!-- <ProfileNav /> -->
            <!-- <ProductsNavCart /> -->
          </div>
        </div>
      </div>
      <nav class="bg-slate-800 text-white">
        <!-- <nav class=""> -->
        <!-- <MainNav /> -->
        <!-- </nav> -->
        <!-- S -->
      </nav>
    </header>
    <main class="main">
      <!-- <div class="sidebar"><AdminNav /></div> -->
      <div class="main"><slot /></div>
    </main>
    <footer><Footer /></footer>
  </div>
</template>

<style lang="scss" scoped>
.header {
  background-color: #000;

  &__top {
    width: 1024px;
    color: white;
    padding: 1.5rem;
  }
  // w-[1024px] mx-auto text-white flex justify-between items-center py-6
}
</style>
