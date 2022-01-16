<script setup>
const navLinkItems = ref([
  {
    title: 'Coffee',
    icon: 'icon',
    open: false,
    subMenu: [
      {
        title: 'Coffee',
        image: 'coffee-OLVL-480x480.webp',
        link: 'index',
      },
      {
        title: 'Barista Creations',
        image: 'nav-caramel.webp',
        link: 'index',
      },
      {
        title: 'Capsule Recycling',
        image: 'caps-rec.webp',
        link: 'index',
      },
      {
        title: '',
        content: 'Hello World',
        image: '2nav-coffee-reedem10.webp',
        link: 'index',
      },
    ],
  },
  {
    title: 'Coffee',
    icon: 'icon',
    open: false,
    subMenu: [
      {
        title: 'Coffee',
        image: 'coffee-OLVL-480x480.webp',
        link: 'index',
      },
      {
        title: 'Barista Creations',
        image: 'nav-caramel.webp',
        link: 'index',
      },
      {
        title: 'Capsule Recycling',
        image: 'caps-rec.webp',
        link: 'index',
      },
      {
        title: '',
        content: 'Hello World',
        image: '2nav-coffee-reedem10.webp',
        link: 'index',
      },
    ],
  },
  {
    title: 'Coffee',
    icon: 'icon',
    open: false,
    subMenu: [
      {
        title: 'Coffee',
        image: 'coffee-OLVL-480x480.webp',
        link: 'index',
      },
      {
        title: 'Barista Creations',
        image: 'nav-caramel.webp',
        link: 'index',
      },
      {
        title: 'Capsule Recycling',
        image: 'caps-rec.webp',
        link: 'index',
      },
      {
        title: '',
        content: 'Hello World',
        image: '2nav-coffee-reedem10.webp',
        link: 'index',
      },
    ],
  },
  {
    title: 'Coffee',
    icon: 'icon',
    open: false,
    subMenu: [
      {
        title: 'Coffee',
        image: 'coffee-OLVL-480x480.webp',
        link: 'index',
      },
      {
        title: 'Barista Creations',
        image: 'nav-caramel.webp',
        link: 'index',
      },
      {
        title: 'Capsule Recycling',
        image: 'caps-rec.webp',
        link: 'index',
      },
      {
        title: '',
        content: 'Hello World',
        image: '2nav-coffee-reedem10.webp',
        link: 'index',
      },
    ],
  },
])
// const router= useRouter()
// console.log(router.getRoutes())
// import { useError } from '~/pinia/useError'
// const appError = useError()

// const myError = computed(() => appError.snackbar)

// watchEffect(async () => {
//   console.log('PPPP', error.snackbar.show)
//   console.log('PPPP', error.snackbar.message)
//   if (error.snackbar.show) {
//     snackbar.show = true
//     snackbar.message = error.snackbar.message
//     snackbar.duration = 30
//     // } else if (categoryErrorMsg.value) {
//     //   snackbar.show = true
//     //   snackbar.message = categoryErrorMsg.value
//     //   snackbar.duration = 30
//     // } else {
//   } else {
//     snackbar.show = false
//     snackbar.message = ''
//     snackbar.duration = 0
//   }
// })

const enter = (el) => {
  // setTimeout(() => {
  //   //
  // }, 100)
  el.style.height = 'auto'
  const height = getComputedStyle(el).height
  el.style.height = 0
  getComputedStyle(el)
  setTimeout(() => {
    el.style.height = height
  })
  // setTimeout(() => {
  //   //
  // }, 100)
}

const leave = (el) => {
  // setTimeout(() => {
  // }, 100)
  el.style.height = getComputedStyle(el).height
  getComputedStyle(el)
  setTimeout(() => {
    el.style.height = 0
  })
  // setTimeout(() => {}, 100)
}

const afterEnter = (el) => {
  el.style.height = 'auto'
}
</script>

<template>
  <ul class="main-nav w-[1024px] mx-auto flex items-center justify-center relative">
    <li
      v-for="(item, i) in navLinkItems"
      :key="item.title"
      @mouseenter="item.open = !item.open"
      @mouseleave="item.open = !item.open"
    >
      <div
        class="menu-item flex flex-col gap-1 items-center px-20 py-2 border-x border-x-gray-600 hover:bg-white hover:text-slate-600 hover:shadow-lg cursor-pointer -ml-[1px]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
        <div>{{ item.title }}</div>
      </div>
      <transition name="dropdown" @enter="enter" @after-enter="afterEnter" @leave="leave">
        <ul
          class="grid grid-cols-4 bg-white absolute inset-x-0 top-full text-gray-800 overflow-hidden"
          v-show="item.open"
        >
          <li
            class="submenu-item border-x shadow-md border-x-gray-200 h-48 flex justify-center items-center overflow-hidden"
            v-for="subItem in item.subMenu"
            :key="subItem.title"
          >
            <NuxtLink class="link flex flex-col gap-2" :to="{ name: `${subItem.link}` }">
              <div>{{ subItem.title }}</div>
              <img class="w-24" :src="`/assets/${subItem.image}`" alt="" />
            </NuxtLink>
          </li>
        </ul>
      </transition>
    </li>
  </ul>
  <!-- {{ snackbar }} -->
  <!-- <div class="branding">
			<NuxtLink :to="{ name: `index` }"><img src="/yrl-logo.png" alt="" /></NuxtLink>
		</div> -->
  <!-- <ul> -->
  <!-- <NuxtLink class="link" :to="{ name: 'index' }"><span>Home</span></NuxtLink>
    <NuxtLink class="link" :to="{ name: 'admin' }"><span>Admin</span></NuxtLink>
    <NuxtLink class="link" :to="{ name: 'products' }"><span>Shop</span></NuxtLink>
    <NuxtLink class="link" to="#"><span>Categories</span> </NuxtLink> -->
  <!-- <NuxtLink class="link" :to="{ name: 'blog' }">Blog</NuxtLink> -->
  <!-- <NuxtLink class="link" :to="{ name: `admin-media-folder`, params: { folder: `all` } }">
				<span>Media</span>
			</NuxtLink> -->
  <!-- </ul> -->

  <!-- <SnackBar
      :show="myError.show"
      :message="myError.message"
      :snackbarType="myError.type"
      :duration="myError.duration"
      @hideSnackbar="myError.show = false"
    /> -->
</template>

<style lang="scss" scoped>
.submenu-item {
  &:last-child {
    a {
      img {
        width: 100%;
        // height: 100%;
        // object-fit: cover;
      }
    }
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: height 0.2s ease-in-out;
}


// .dropdown-leave-from,
// .dropdown-enter-to {
//   // transform: translateX(20px);
//   opacity: 0;
// }

// .main-nav {
//   display: flex;
//   align-items: center;

//   .branding {
//     display: flex;
//     align-items: center;

//     img {
//       width: 3rem;
//       margin-right: 1rem;
//     }
//   }

//   .link {
//     margin-right: 1rem;
//     cursor: pointer;
//     text-transform: uppercase;
//     font-weight: 500;
//     transition: 0.3s color ease-in-out;

//     &:hover {
//       color: #1eb8b8;
//     }
//   }
// }
</style>
