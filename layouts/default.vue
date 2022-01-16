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
      <div class="header flex flex-between">
        <!-- <div class="header__top"> -->
        <Branding />
        <!-- <div class="header__right"> -->
        <ProfileNav />
        <!-- <ProductsNavCart /> -->
        <!-- </div> -->
        <!-- </div> -->
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
.app {
  header {
    .header {
      // border: 1px solid white;
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      background-color: #000;
      color: white;
      padding: 1rem 2rem;

      // &__profile{
      //   flex:1
      // }

      // &__right {
      //   display: flex;
      //   justify-content: center;
      //   align-items: center;
      //   flex: 1;
      //   gap: 1rem;
      // }

      // &__top {
      //   width: 1024px;
      //   padding: 1.5rem;
      // }
      // w-[1024px] mx-auto text-white flex justify-between items-center py-6
    }
  }
}
</style>
