<script setup>
import { useAuth } from '~/pinia/useAuth';

// const cart = useCart()
const auth = useAuth();

const showAuthForm = ref(false);

const user = reactive({
  email: '',
  password: '',
});

const handleSignin = async () => {
  // console.log(user);
  // mainStore.setSnackbar({ show: false })
  await auth.login(user);
  if (!auth.errorMsg) {
    // router.push(route.path || '/admin')
    // } else {
    //   mainStore.setSnackbar({ show: true, message: auth.errorMsg })
  }
  showAuthForm.value = false;
};

const handleSignup = async () => {
  // console.log(user);
  // mainStore.setSnackbar({ show: false })
  await auth.login(user);
  if (!auth.errorMsg) {
    // router.push(route.path || '/admin')
    // } else {
    //   mainStore.setSnackbar({ show: true, message: auth.errorMsg })
  }
  showAuthForm.value = false;
};
</script>

<template>
  <div class="login-dropdown">
    <div class="header" v-bind:class="{ selected: showAuthForm }" @click="showAuthForm = !showAuthForm">
      <svg xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
      </svg>
      <h3>Sign in / Create acount</h3>
    </div>
    <form class="flex flex-col" v-if="showAuthForm">
      <h3 class="title">Sin in</h3>
      <p class="description">Access your account and place an order:</p>
      <FormsBaseInput label="Email" type="email" v-model="user.email" required />
      <FormsBaseInput label="Password" type="password" v-model="user.password" required />
      <div>
        <NuxtLink class="forgot-password" :to="{ name: `auth-forgot-password` }">Forgot Password?</NuxtLink>
      </div>
      <button class="btn btn-primary flex" @click.prevent="handleSignin">
        <p>Sign in</p>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-2 h-2" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <p>New User?</p>
      <button class="btn btn-primary flex" @click.prevent="handleSignup">
        <p>Create an account</p>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </form>
    <div class="backdrop" v-if="showAuthForm" @click="showAuthForm = !showAuthForm"></div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.login-dropdown {
  position: relative;

  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
    z-index: 99;
    font-size: 1.2rem;
    padding: 0.5rem 2rem;
    cursor: pointer;
    // border-radius:3px;
    // border:1px solid red;

    &:hover,
    &.selected {
      background-color: white;
      color: $slate-800;
    }

    svg {
      width: 2rem;
      height: 2rem;
    }

    h3 {
      font-weight: 300;
      text-transform: uppercase;
    }
  }

  form {
    // border: 1px solid $slate-400;

    color: $slate-800;
    font-size: 1.4rem;
    gap: 2rem;
    // display: flex;
    // flex-direction: column;
    // gap: 1rem;
    background-color: white;
    width: 100%;
    padding: 2rem 2rem;
    position: absolute;
    // top: 3rem;
    // left: 0;
    z-index: 99;

    .description {
      margin: 1rem 0;
      font-size: 1.2rem;
    }

    .forgot-password {
      text-transform: uppercase;
    }

    // width-full bg-white text-gray-800 absolute rounded-b py-2 px-4 space-y-6
  }
}
</style>
