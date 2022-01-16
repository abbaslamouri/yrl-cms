<script setup>
const navLinks = ref([
  { name: 'admin', title: 'Dashboard', icon: 'IconsHomeFill', subMenu: [], open: false },
  { name: 'admin-media', title: 'Media', icon: 'IconsFolderFill', subMenu: [], open: false },
  {
    name: '',
    title: 'Store',
    icon: 'IconsCartFill',
    subMenu: [
      { name: 'admin-products', title: 'Products', icon: 'IconsCartFill' },
      { name: 'admin-products-categories', title: 'Categories', icon: 'IconsClipboard' },
      { name: 'admin-products-attributes', title: 'Attributes', icon: 'IconsIdentification' },
      { name: 'admin-products-coupons', title: 'IconsCoupons', icon: 'IconsCartFill' },
    ],
    open: false,
  },
]);

// import FolderFill from './icons/FolderFill.vue'
// import axios from 'axios'
// const router = useRouter()
// // console.log(router.getRoutes())

// const user = ref('')
// const avatar = ref('')

// // const user = computed(() => useState('user').value)
// // const avatar = computed(() => useState('avatar').value)

// const mobile = ref(false)
// const sideNav = ref(true)
// const showAdminNav = ref(false)
const menuWidth = ref('auto');
// // const windowWidth = ref(null)

// const checkWindowWidth = () => {
// 	showAdminNav.value = window.innerWidth <= 750 ? true : false
// 	// if (window.innerWidth <= 750) {
// 	//   showAdminNav.value = true
// 	// } else {
// 	//   mobile.value = false
// 	//   // sideNav.value = false
// 	// }
// }

// onMounted(() => {
// 	window.addEventListener('resize', checkWindowWidth)
// 	checkWindowWidth()
// })

// const toggleSideNav = () => {
// 	showAdminNav.value = !showAdminNav.value
// 	// menuWidth.value = '10rem'
// }

// const logout = async () => {
// 	// const response = await axios({
// 	//   method: 'GET',
// 	//   url: 'http://localhost:3000/api/v1/auth/logout',
// 	// })
// 	// console.log(response.data)
// 	// // window.location.reload(true)
// 	// window.location.assign('/admin/auth/login')
// }
</script>

<template>
  <!-- <header> -->
  <transition name="adminMenuSlide">
    <ul class="admin-nav">
      <li
        v-for="item in navLinks"
        :key="item.name"
        class="border-b border-b-gray-100 hover:bg-slate-100 hover:text-gray-900 hover:border-slate-800 transition duration-200"
      >
        <NuxtLink
          class="link flex gap-2 px-6 py-2"
          :to="{ name: item.subMenu ? `${item.name}` : 'admin' }"
          @click="item.open = !item.open"
        >
          <component :is="item.icon" class="w-[16px] h-[16px]"></component>
          <p>{{ item.title }}</p>
        </NuxtLink>
        <div v-if="item.subMenu && item.open === true">
          <ul class="admin-sub-menu bg-slate-800 text-slate-200">
            <li
              v-for="subItem in item.subMenu"
              :key="subItem.name"
              class="text-xs border-y pl-4 hover:bg-slate-100 hover:text-gray-900 hover:border-slate-800 transition duration-200"
            >
              <NuxtLink class="link flex gap-2 px-6 py-2" :to="{ name: subItem.name }">
                <component :is="subItem.icon" class="w-[16px] h-[16px]"></component>
                <p>{{ subItem.title }}</p>
              </NuxtLink>
            </li>
          </ul>
        </div>
        <!-- <a v-else href="#" class="link flex gap-2 px-6 py-2">
          <component :is="item.icon" class="w-[16px] h-[16px]"></component>
          <p>{{ item.title }}</p>
        </a> -->
      </li>
    </ul>
  </transition>

  <!-- <NuxtLink class="link" :to="{ name: 'admin' }"> <IconsHomeFill /><span>Dashboard</span> </NuxtLink>
      <NuxtLink class="link" :to="{ name: 'admin-media' }"><IconsFolderFill /><span>Media</span></NuxtLink>

      <NuxtLink class="link" :to="{ name: 'admin-products' }"><IconsHomeFill /><span>Products</span> </NuxtLink>
      <NuxtLink class="link" :to="{ name: 'admin-products-categories' }"
        ><IconsHomeFill /><span>Categories</span>
      </NuxtLink>
      <NuxtLink class="link" :to="{ name: 'admin-products-attributes' }"
        ><IconsHomeFill /><span>Attributes</span>
      </NuxtLink>
      <NuxtLink class="link" :to="{ name: 'admin-products-coupons' }"><IconsHomeFill /><span>Coupons</span> </NuxtLink> -->
  <!-- <NuxtLink class="link" :to="{ name: 'admin-products-attributes' }"
          ><IconsHomeFill /><span>Attributes</span>
        </NuxtLink> -->

  <!-- <NuxtLink class="link" :to="{ name: 'blog' }"><IconsHomeFill /></NuxtLink>
      <NuxtLink class="link" :to="{ name: 'admin' }"
        ><IconsPersonFill /><span v-if="!showAdminNav">Admin</span></NuxtLink
      >
      <NuxtLink class="link" :to="{ name: 'admin-media-folder', params: { folder: 'all' } }"
        ><IconsCommonFill /><span v-if="!showAdminNav">Media</span></NuxtLink
      >
      <button class="link toggle" href="#" @click="toggleSideNav">
        <IconsArrowLeft v-if="!showAdminNav" />
        <IconsArrowRight v-else />
      </button> -->

  <!-- </header> -->
</template>

<style lang="scss" scoped>
.admin-menu {
  .admin-sub-menu {
    li {
      &:last-child {
        border: none;
      }
    }
  }
  //   border: 1px red solid;
  //   padding: 2rem 0;
  //   // width: v-bind(menuWidth);
  //   color: #fff;

  //   // width: 70%;
  //   // max-width: 15rem;
  //   display: flex;
  //   flex-direction: column;
  //   // position: fixed;
  //   // top: 0;
  //   // left: 0;
  //   height: 100%;
  //   background-color: #203040;
  //   font-size: 1.2rem;
  //   // transform: translateX(-25rem);

  //   .link {
  //     padding: 1rem 0;
  //     padding: 0.5rem 2rem;
  //     text-transform: uppercase;
  //     display: flex;
  //     align-items: center;
  //     gap: 1rem;

  //     svg {
  //       width: 2rem;
  //       fill: #fff;
  //     }

  //     &:hover {
  //       background-color: #fff;
  //       color: #303030;
  //     }

  //     &.toggle {
  //       justify-content: center;
  //       background-color: transparent;
  //       border: none;
  //       color: #fff;
  //       cursor: pointer;

  //       svg {
  //         width: 2rem;
  //       }
  //     }
  //   }
}
</style>
