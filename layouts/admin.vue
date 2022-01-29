<script setup>
const showAdminSidebar = ref(true);

const checkScreen = () => {
  if (process.client) {
    if (window.innerWidth < 768) showAdminSidebar.value = false;
    if (window.innerWidth >= 768) showAdminSidebar.value = true;
  }
};

if (process.client) {
  window.addEventListener('resize', checkScreen);
  checkScreen();
}
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
          <AdminNav />
        </aside>
      </transition>
      <div class="content">
        <slot />
      </div>
    </main>
    <footer><Footer /></footer>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.admin {
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000;
    color: white;
    padding: 1rem 2rem;
    z-index: 99;
  }

  main {
    display: flex;

    aside {
      position: fixed;
      display: flex;
      flex-direction: column;
      background-color: $slate-800;
      width: 25rem;
      top: 0;
      bottom: 0;
      left: 0;
      height: 100vh;
      transition: all 0.2s ease-in-out;
      color: white;
      font-size: 1.4rem;
      gap: 2rem;
      padding: 2rem 1rem;
      z-index: 999;

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
      margin-left: 25rem;
      margin-top: 5rem;
      background-color: $slate-100;
      min-height: 100vh;
      display:flex;
      justify-content: center;
      // min-height: 90vh;
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
