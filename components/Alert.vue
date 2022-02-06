<script setup>
defineProps({
  outerBoxWidth: {
    type: Number,
    default: 40,
  },
  outerBoxHeight: {
    type: Number,
    default: 40,
  },
})

defineEmits(['cancel', 'ok'])
</script>

<template>
  <div class="alert">
    <div class="overlay"></div>
    <div class="wrapper" @click.self="$emit('cancel')">
      <div class="content" :style="{ width: `${outerBoxWidth}%`, 'min-height': `${outerBoxHeight}%` }">
        <IconsError />
        <slot></slot>
        <div class="actions">
          <button class="btn btn-secondary" @click="$emit('cancel')">Cancel</button>
          <button class="btn btn-primary" @click="$emit('ok')">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.alert {
  .wrapper {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 4rem;
      background-color: white;
      border-radius: 5px;
      overflow: auto;
      text-align: center;
      line-height: 2.5rem;
      letter-spacing: 0.15rem;
      font-size: 1.5rem;

      .actions {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .btn {
        padding: 1rem 3rem;
        border-radius: 5px;
        border: 1px solid $slate-300;
        font-size: 1.3rem;
        letter-spacing: 0.15rem;
      }

      svg {
        width: 10rem;
        height: 10rem;
        fill: $yellow-400;
      }

      // header {
      //   display: flex;
      //   justify-content: space-between;
      //   align-items: center;
      //   border-bottom: 1px #ccc solid;
      //   width: 100%;
      //   padding: 0 0 1rem 0;

      //   .btn {
      //     border: none;
      //     svg {
      //       background-color: transparent;
      //       width: 2rem;
      //       height: 2rem;
      //     }
      //   }
      // }

      // main {
      //   padding: 2rem;
      //   margin-top: 1rem;
      //   border-radius: 5px;
      // }

      // footer {
      //   width: 100%;
      //   padding: 1rem;
      // }
    }
  }
}
</style>
