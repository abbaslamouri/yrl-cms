<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  show: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: [String, Number],
    default: 0,
  },
  snackbarType: {
    type: String,
    default: 'Error',
    validator: (value) => {
      return !value || ['Success', 'Warning', 'Error', 'Info'].includes(value);
    },
  },
  position: {
    type: String,
    default: 'top-left',
  },
});

const emit = defineEmits(['hideSnackbar']);

let timeout = ref(null);
const getType = () =>
  ['Success', 'Warning', 'Error', 'Info'].includes(props.snackbarType) ? props.snackbarType : 'Success';
const getPosition = () => (['top-right', 'top-left'].includes(props.position) ? props.position : 'top-left');

watchEffect(() => {
  clearTimeout(timeout.value);
  if (props.duration != 0) {
    // console.log(props.duration)
    timeout.value = setTimeout(() => {
      emit('hideSnackbar');
    }, props.duration * 1000);
  }
});

const title = computed(() =>
  props.title ? props.title : props.snackbarType.charAt(0).toUpperCase() + props.snackbarType.slice(1)
);
const transitionName = computed(() => (getPosition().includes('right') ? 'rtl' : 'ltr'));
</script>

<template>
  <transition :name="transitionName">
    <div
      class="snackbar shadow-md"
      :class="{
        error: snackbarType === 'Error',
        success: snackbarType === 'Success',
      }"
      v-show="show"
    >
      <div class="icon">
        <component :is="`Icons${getType()}`" />
      </div>
      <div class="content">
        <h3 class="title">{{ title }}</h3>
        <div class="message" v-html="message"></div>
      </div>
      <button class="btn" @click="$emit('hideSnackbar')">&times;</button>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

//  min-width-min p-4 drop-shadow-lg fixed z-20 top-12 left-2 border-l-8
.snackbar {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  gap: 2rem;
  // min-width: 60rem;
  padding: 2rem;
  position: fixed;
  z-index: 99;
  top: 6rem;
  left: 10rem;
  font-size: 1.4rem;
  z-index:999;

  &.success {
    background: $green-50;
    border-left: 5px solid $green-500;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      background: $green-400;
      border-radius: 50%;
      padding: 0.4rem;
      svg {
        fill: $green-50;
        width: 2rem;
        height: 2rem;
      }
    }
  }

  &.error {
    background: $red-50;
    border-left: 5px solid $red-500;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      background: $red-400;
      border-radius: 50%;
      padding: 0.4rem;
      svg {
        fill: $red-50;
        width: 2rem;
        height: 2rem;
      }
    }
  }

  .content {
    .message {
      color: $slate-900;
    }
  }

  .btn {
    font-size: 2rem;
  }

  //   &__button {
  //     cursor: pointer;
  //     width: 2rem;
  //     height: 2rem;
  //     padding: 0;
  //     color: #9ca3af;
  //     opacity: 0.7;
  //     border: none;
  //     background: transparent;
  //     font-size: 2rem;

  //     &:hover {
  //       opacity: 1;
  //     }
  //   }

  // &.top-right {
  //   right: 4rem;
  // }

  // &.top-left {
  //   left: 5rem;

  // .icon {
  //   width: 3rem;
  //   height: 3rem;
  //   border-radius: 50%;
  //   // padding: 0.7rem;
  // }
}

.rtl-enter-active,
.rtl-leave-active,
.ltr-enter-active,
.ltr-leave-active {
  transition: all 0.5s ease-in-out;
}

.rtl-enter-from,
.rtl-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.ltr-enter-from,
.ltr-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

// .rtl-leave-to {
//   opacity: 0;
// }

// .rtl-enter,
// .rtl-leave {
//   transform: translateX(0rem);
// }
</style>
