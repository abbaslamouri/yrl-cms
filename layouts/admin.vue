<script setup>
// const windowWidth = ref(null);
// const mobile = ref(null);
// const  = ref(null);
const showAdminSidebar = ref(true);
const sidebarRef = ref('');

const checkScreen = () => {
  if (process.client) {
    // console.log(showAdminSidebar.value, window.innerWidth);
    if (window.innerWidth < 768) showAdminSidebar.value = false;
    if (window.innerWidth >= 768) showAdminSidebar.value = true;
    // windowWidth.value = window.innerWidth;
    // console.log(windowWidth.value);
  }
};

// onMounted(() => {
if (process.client) {
  window.addEventListener('resize', checkScreen);
  checkScreen();
}

const toggleAdminSidebar = () => {
  console.log(sidebarRef.value.style);
  // if (sidebarRef.value.classList.contains('show')) {
  sidebarRef.value.classList.toggle('hide');
  // } else {
  //   sidebarRef.value.classList.remove('hide').classList.add('show');
  // }
};
// console.log(sidebarRef.value);

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
  <div class="app admin">
    <header>
      <MobileNavToggler @hideAdminSidebar="showAdminSidebar = !showAdminSidebar" />
      <ProfileNav />
    </header>
    <main>
      <transition name="slide">
        <aside v-show="showAdminSidebar">
          <div class="branding">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
            </svg>
            <Branding />
          </div>
          <!-- <nav class=""> -->
          <AdminNav />
          <!-- </nav> -->
        </aside>
      </transition>
      <div class="content">
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

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.admin {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000;
    color: white;
    padding: 1rem 2rem;
  }

  main {
    display: flex;
    position: relative;
    min-height: 100vh;
    // border: 1px solid red;

    aside {
      display: flex;
      flex-direction: column;
      background-color: $slate-800;
      width: 25rem;
      // position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      height: 100vh;
      transition: all 0.2s ease-in-out;
      color: white;
      // transform: translateX(-100%);
      font-size: 1.4rem;
      gap: 2rem;
      padding: 2rem 1rem;

      // &.show {
      //   transform: translateX(0);
      //   position: relative;
      // }

      // &.hide {
      //   transform: translateX(-100%);
      //   position: absolute;
      // }

      // @media only screen and (min-width: 768px) {
      //   position: relative;
      //   transform: translateX(0);
      // }
      //  text-sm space-y-2 absolute inset-y-0 left-0 transform -translate-x-full transition duration-200 ease-in-out md:relative md:translate-x-0 shadow-xl

      .branding {
        display: flex;
        align-items: center;
        gap: 1rem;
        svg {
          fill: white;
          cursor: pointer;
        }

        // text-white flex items-center gap-2 text-sm py-4 px-4
      }

      nav {
        // text-slate-200
      }
    }

    .content {
      flex: 1;
      min-height: 100vh;
    }
  }
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}
</style>
