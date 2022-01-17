<script setup>
import { storeToRefs } from 'pinia';

import { useAuth } from '~/pinia/useAuth';

// const cart = useCart()
const auth = useAuth();
const { user: currentUser } = storeToRefs(auth);
const showAuthDropdown = ref(false);

const route = useRoute();
const router = useRouter();

const handleSignout = async () => {
  // const cartCustomer = useCookie('cartCustomer').value
  // cartCustomer._id = null
  // console.log(cartCustomer)
  // cart.updateCustomerInfo(cartCustomer)
  await auth.logout();
  // currentUser = {}
  // auth.token = null
  // Cookies.remove('user')
  // Cookies.remove('token')
  // window.location.reload(true)
  // window.location.assign('/')
  showAuthDropdown.value = false;
};
</script>

<template>
  <div class="profile-dropdown">
    <div class="header" v-bind:class="{ selected: showAuthDropdown }">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
      </svg>
      <h3 @click="showAuthDropdown = !showAuthDropdown">Welcome {{ currentUser.name }}</h3>
    </div>
    <div v-if="showAuthDropdown" class="menu flex flex-col">
      <h3 class="">My Accoun</h3>
      <ul>
        <li v-if="currentUser.role === 'admin'">
          <NuxtLink :to="{ name: `admin` }">Admin</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ name: `admin` }">Order History</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ name: `admin` }">Account Information?</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ name: `admin` }">Addresses?</NuxtLink>
        </li>
      </ul>
      <button class="btn btn-primary" @click="handleSignout">Sign out</button>
    </div>
    <div class="backdrop" v-if="showAuthDropdown" @click="showAuthDropdown = !showAuthDropdown"></div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.profile-dropdown {
  position: relative;
  min-width: 20rem;
  font-size: 1.25rem;

  .header {
    display:flex;
    align-items: center;
    gap:1rem;
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

  .menu {
    padding: 2rem 2rem;
    gap: 2rem;
    position: absolute;
    z-index: 99;
    background-color: white;
    color: $slate-800;
    width: 100%;
    ul {
      li {
        padding: 0.5rem 0;
        border-top: 1px solid $slate-400;
        text-transform: capitalize;

        &:last-child {
          border-bottom: 1px solid $slate-400;
        }
      }
    }

    // w-full bg-white text-gray-800 absolute -b py-2 px-4 space-y-6
  }

  //  hover:bg-white hover:text-gray-800 cursor-pointer
}
</style>
