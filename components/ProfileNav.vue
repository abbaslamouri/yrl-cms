<script setup>
// import Cookies from 'js-cookie'

// import { useCart } from '~/pinia/useCart'
import { storeToRefs } from 'pinia'

import { useAuth } from '~/pinia/useAuth'

// const cart = useCart()
const auth = useAuth()
const { user: currentUser } = storeToRefs(auth)

const route = useRoute()
const router = useRouter()
// console.log('R', route)

const showAuthForm = ref(false)
const showAuthDropdown = ref(false)
const user = reactive({
  email: '',
  password: '',
})

const handleSignin = async () => {
  console.log(user)
  // mainStore.setSnackbar({ show: false })
  await auth.login(user)
  if (!auth.errorMsg) {
    // router.push(route.path || '/admin')
    // } else {
    //   mainStore.setSnackbar({ show: true, message: auth.errorMsg })
  }
  showAuthForm.value = false
}

const handleSignout = async () => {
  // const cartCustomer = useCookie('cartCustomer').value
  // cartCustomer._id = null
  // console.log(cartCustomer)
  // cart.updateCustomerInfo(cartCustomer)
  await auth.logout()
  // currentUser = {}
  // auth.token = null
  // Cookies.remove('user')
  // Cookies.remove('token')
  // window.location.reload(true)
  // window.location.assign('/')
  showAuthDropdown.value = false
}

// onMounted(() => {
// 	if (process.client) {
// 		cart.cart = JSON.parse(localStorage.getItem('cart'))
// 	}
// })
</script>

<template>
  <div class="profile-nav text-white flex items-center gap-2 text-xs">
    <div v-if="auth.authenticated" class="relative z-40">
      <div
        class="flex items-center gap-2 px-4 py-1 rounded-t uppercase border border-white hover:bg-white hover:text-gray-800 cursor-pointer"
        v-bind:class="{ 'bg-white': showAuthDropdown, 'text-gray-800': showAuthDropdown }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
        <h3 class="tracking-wide" @click="showAuthDropdown = !showAuthDropdown">Welcome {{ currentUser.name }}</h3>
      </div>
      <div v-if="showAuthDropdown" class="w-full bg-white text-gray-800 absolute rounded-b py-2 px-4 space-y-6">
        <div>
          <h3 class="text-center font-bold mb-3">My Accoun</h3>
          <ul class="mb-3">
            <li v-if="currentUser.role === 'admin'" class="border-y py-2 capitalize font-bold">
              <NuxtLink class="" :to="{ name: `admin` }">Admin</NuxtLink>
            </li>
            <li class="border-y py-2 capitalize font-bold">
              <NuxtLink class="" :to="{ name: `auth-forgot-password` }">Order History</NuxtLink>
            </li>
            <li class="border-y py-2 capitalize font-bold">
              <NuxtLink class="" :to="{ name: `auth-forgot-password` }">Account Information?</NuxtLink>
            </li>
            <li class="border-y py-2 capitalize font-bold">
              <NuxtLink class="" :to="{ name: `auth-forgot-password` }">Addresses?</NuxtLink>
            </li>
          </ul>
          <button class="tracking-wider uppercase" @click="handleSignout">Sign out</button>
        </div>
      </div>
    </div>
    <div v-else class="relative z-40">
      <div
        class="flex items-center gap-2 px-4 py-1 rounded-t  uppercase border border-white hover:bg-white hover:text-gray-800 cursor-pointer"
        v-bind:class="{ 'bg-white': showAuthForm, 'text-gray-800': showAuthForm }"
        @click="showAuthForm = !showAuthForm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
        <h3 class="tracking-wide">Sign in / Create acount</h3>
      </div>
      <form
        class="width-full bg-white text-gray-800 absolute rounded-b py-2 px-4 space-y-6"
        v-if="showAuthForm"
        @submit.prevent="handleSignin"
      >
        <h2 class="uppercase">Sin in</h2>
        <p class="text-xs">Access your account and place an order:</p>
        <FormsBaseInput label="Email" type="email" v-model="user.email" required />
        <FormsBaseInput label="Password" type="password" v-model="user.password" required />
        <div>
          <NuxtLink class="tracking-wider uppercase" :to="{ name: `auth-forgot-password` }">Forgot Password?</NuxtLink>
        </div>
        <button
          class="border border-gray-400 w-full uppercase py-2 flex justify-between px-2 rounded hover:bg-gray-900 hover:text-white"
        >
          <p>Sign in</p>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <hr />
        <p>New User?</p>
        <button
          class="border border-gray-400 w-full uppercase py-2 flex justify-between px-2 rounded hover:bg-gray-900 hover:text-white"
        >
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
    </div>

    <div
      class="fixed w-[100vw] h-[100vh] top-0 left-0 bg-gray-900 z-10 opacity-50"
      v-if="showAuthForm"
      @click="showAuthForm = !showAuthForm"
    ></div>
    <div
      class="fixed w-[100vw] h-[100vh] top-0 left-0 bg-gray-900 z-10 opacity-50"
      v-if="showAuthDropdown"
      @click="showAuthDropdown = !showAuthDropdown"
    ></div>

    <!-- backdrop fixed w-[50vw] h-[50vh] top-0 left-0  bg-gray-400 -->
    <!-- <div class="profile-nav flex items-center gap-2 px-3 py-2 rounded text-sm uppercase border border-white bg-white text-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
        <h3>Sign in / Create acount</h3>
      </div> -->

    <!-- <div class="auth">
        <div class="profile-nav flex items-center gap-2 px-3 py-2 rounded text-sm uppercase border border-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
          <h3>Sign in / Create acount</h3>
        </div>
      </div> -->

    <!-- <div v-if="!auth.authenticated" class="nav-links">
			<NuxtLink class="link" :to="{ name: 'auth-login' }">
				<IconsPersonFill />
				<span>Login</span>
			</NuxtLink>
			<NuxtLink class="link" :to="{ name: 'auth-register' }">
				<IconsHttpsFill />
				<span>Register</span>
			</NuxtLink>
		</div>
		<div v-else class="nav-links">
			<a href="#" @click="handleLogout" class="link">Logout</a>
			<div class="nav-user">
				<img
					v-if="currentUser.avatar && currentUser.avatar.path"
					:src="`${currentUser.avatar.path}`"
					:alt="`${currentUser.name} Photo`"
				/>
				<img v-else src="/user-placeholder.jpg" :alt="`${currentUser.name} Photo`" />
				<div @mouseenter="showUserSubmenu = true" @mouseleave="showUserSubmenu = false">
					{{ currentUser.name.split(' ')[0] }} -->
    <!-- <ul v-if="showUserSubmenu">
						<li>
							<NuxtLink class="link" :to="{ name: 'shop' }">
								<IconsCartFill />
								<span>Shop</span>
							</NuxtLink>
						</li>
						<li>
							<NuxtLink class="link" :to="{ name: 'shop-cart' }">
								<IconsCartFill />
								<span>Cart</span>
							</NuxtLink>
						</li>
					</ul> -->
    <!-- </div>
			</div>
		</div> -->
    <!-- </client-only> -->
    <!-- {{ useCookie('token') }} -->
    <!-- {{currentUser}} -->
  </div>
</template>

<style lang="scss" scoped>
// .dropdown-bg {
//   background-color: white;
//   color: black;
// }

// .auth-dropdown {
//   width: 100%;
// }
// .profile-nav {
// 	// padding: 1rem 2rem;
// 	// box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
// 	font-size: 1.2rem;
// 	text-transform: uppercase;
// 	display: flex;
// 	// justify-content: flex-end;
// 	gap: 1rem;

// 	.cart {
// 		a {
// 			display: flex;
// 			align-items: center;

// 			.badge {
// 				display: flex;
// 				align-items: center;
// 				justify-content: center;
// 				background-color: #f02020;
// 				color: #fff;
// 				border-radius: 50%;
// 				width: 2.5rem;
// 				height: 2.5rem;
// 				// padding: 0.3rem 0.7rem;
// 				font-size: 1.4rem;
// 				align-self: flex-start;
// 			}
// 		}
// 	}

// 	.nav-links {
// 		display: flex;
// 		align-items: center;
// 		justify-content: flex-end;
// 		gap: 2rem;

// 		.link {
// 			display: flex;
// 			align-items: center;
// 			gap: 0.3rem;

// 			svg {
// 				width: 1.5rem;
// 			}

// 			&.router-link-active {
// 				color: green;
// 			}
// 		}

// 		.nav-user {
// 			display: flex;
// 			align-items: center;
// 			gap: 1rem;
// 			margin-left: 2rem;

// 			img {
// 				border-radius: 50%;
// 				width: 3rem;
// 			}
// 		}
// 	}
// }
</style>
