<script setup>
const showSidebar = ref(true);
const sidebarRef = ref('');

const toggleTranslate = () => {};

// import { useAuth } from '~/pinia/useAuth'
// const authStore = useAuth()
// const router = useRouter()
// router.beforeEach((to, from) => {
// 	if (to.name.includes('admin') && !authStore.token) {
// 		return '/auth/login'
// 	}
// })

// import { useError } from '~/pinia/useError'
// const error = useError()

// const snackbar = computed(() => error.snackbar)
</script>

<template>
  <div class="app">
    <header class="bg-black flex justify-between py-2 px-8">
      <div class="mobile-nav-icon text-white p-1">
        <button class="focus:bg-gray-600 md:hidden" @click="sidebarRef.classList.toggle('-translate-x-full')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <ProfileNav />
    </header>
    <main class="relative min-h-screen flex">
      <aside
        v-show="showSidebar"
        class="bg-slate-800 w-64 text-sm space-y-2 absolute inset-y-0 left-0 transform -translate-x-full transition duration-200 ease-in-out md:relative md:translate-x-0 shadow-xl"
        ref="sidebarRef"
      >
        <div class="branding text-white flex items-center gap-2 text-sm py-4 px-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
            />
          </svg>
          <Branding />
        </div>
        <nav class="text-slate-200">
          <AdminNav />
        </nav>
      </aside>

      <div class="content flex-1">
        <slot />
      </div>
    </main>
    <footer><Footer /></footer>
  </div>

  <!-- <header> -->
  <!-- <MainNav /> -->
  <!-- <ProfileNav /> -->
  <!-- </header> -->
  <!-- <main> -->
  <!-- <div class="sidebar"><AdminNav /></div> -->
  <!-- <div class="main"><slot /></div> -->
  <!-- </main> -->
  <!-- <footer><Footer /></footer> -->
  <!-- <SnackBar
      :show="snackbar.show"
      :message="snackbar.message"
      :snackbarType="snackbar.type"
      :duration="snackbar.duration"
      @hideSnackbar="snackbar.show = false"
    /> -->
</template>

<style lang="scss" scoped></style>
