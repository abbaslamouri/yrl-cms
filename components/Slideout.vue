<script setup>
const props = defineProps({
  showSlideout: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="slideout">
    <div class="backdrop" v-show="showSlideout"></div>
    <transition name="slide">
      <div class="dialog shadow-md" v-show="showSlideout">
        <!-- <header class="shadow-md"> -->
        <slot name="header"></slot>
        <!-- </header> -->
        <!-- <main> -->
        <slot></slot>
        <!-- </main> -->
        <!-- <footer> -->
        <slot name="footer"></slot>
        <!-- </footer> -->
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.slideout {
  .dialog {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    max-width: 1040px;
    max-width: 800px;
    background-color: $slate-200;
    z-index: 99;

    .backdrop {
      opacity: 0.8;
    }

    // .dialog {
    //   position: absolute;
    //   background-color: $slate-100;

    // header {
    //   display: flex;
    //   align-items: center;
    //   justify-content: space-between;
    //   background-color: white;
    //   padding: 2rem;

    // }
  }
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.9s ease;
}
</style>
