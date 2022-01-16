<script setup>
import { useCart } from '~/pinia/useCart'

const cart = useCart()

onMounted(() => {
  if (process.client) {
    cart.cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : {
          items: [],
          customer: { shippingAddress: {} },
          paymentMethod: 'stripe',
          coupons: [],
        }
  }
})
</script>

<template>
  <div class="nav-cart bg-green-900">
    <NuxtLink class="link border border-white flex items-center gap-2 rounded px-3 py-1" :to="{ name: 'cart' }">
      <!-- <IconsCartFill /> -->
      <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path
					d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
				/>
			</svg> -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
          clip-rule="evenodd"
        />
      </svg>
      <span>Your bag</span>
      <span v-if="cart.hasItems" class="badge">({{ cart.numberOfItems }})</span>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
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
