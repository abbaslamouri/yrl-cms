<script setup>
const { state, actions } = useFactory('products')
provide('state', state)
provide('actions', actions)

const page = ref(1)
const perPage = ref(10)
const selectedCategories = ref('')
const timer = ref(null)

// state.query.fields = 'name,slug,price'
state.query.page = 1
state.query.limit = perPage.value
state.query.populate = 'featuredImage categories'
state.sort.field = 'createdAt'
state.sort.order = '-'
state.query.sort = `${state.sort.order}${state.sort.field}`
await Promise.all([actions.fetchAll(), actions.fetchCount()])

const pages = computed(() =>
  state.totalItemCount % perPage.value
    ? parseInt(state.totalItemCount / perPage.value) + 1
    : parseInt(state.totalItemCount / perPage.value)
)

// state.query.fields = 'name,slug,price'
// state.query.page = 1
// state.query.limit = perPage.value
// state.query.populate = 'featuredImage categories'
// state.sort.field = 'createdAt'
// state.sort.order = '-'
// state.query.sort = `${state.sort.order}${state.sort.field}`
// await Promise.all([actions.fetchAll(), actions.fetchCount()])

const setPage = async (currentPage) => {
  // console.log(currentPage)
  state.query.page = currentPage
  await actions.fetchAll()
}

const handleSearch = async () => {
  await actions.fetchAll()
}

// watch(
//   () => selectedCategories.value,
//   async (newVal) => {
//     if (newVal) {
//       console.log(newVal)
//       filters.categories = selectedCategories.value
//     } else {
//       delete filters.categories
//     }
//   }
// )

// watch(
//   () => price,
//   async (newVal) => {
//     filters['price[gte]'] = newVal.min || '0'
//     filters['price[lte]'] = newVal.max || '0'
//   },
//   { deep: true }
// )

// watch(
//   () => filters,
//   async (newVal) => {
//     if (timer.value) {
//       clearTimeout(timer.value)
//     }
//     timer.value = setTimeout(async () => {
//       await Promise.all([await actions.fetchAll(filters), await actions.fetchCount(filters)])
//     }, 500)
//   },
//   { deep: true }
// )
</script>

<script>
export default {
  layout: 'admin',
}
</script>

<template>
  <div class="products">
    <!-- {{ state.items }} -->
    <div v-if="state.items.length" class="main">
      <header>
        <h3 class="title">Products</h3>
        <NuxtLink class="link" :to="{ name: 'admin-products-slug', params: { slug: ' ' } }">
          <button class="btn btn-primary">
            <IconsPlus />
            <span>Add</span>
          </button>
        </NuxtLink>
      </header>
      <div class="content">
        <Search v-model="state.query.keyword" @handleSubmit="handleSearch" /> <ProductsAdminList />
        <!-- <Pagination :page="page" :pages="pages" @pageSet="setPage" v-if="pages > 1" /> -->
      </div>
    </div>
    <div v-else class="no-products shadow-md">
      <div class="inner">
        <h3 class="">Add your first physical or digital product</h3>
        <div class="">Add your roduct and variants. Products must have at least a name and a price</div>
        <NuxtLink class="link" :to="{ name: 'admin-products-slug', params: { slug: ' ' } }">
          <button class="btn btn-primary">
            <IconsPlus />
            <span>Add</span>
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.products {
  min-height: 92vh;
  width: 100%;
  padding: 3rem 2rem;

  .main {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }
  }

  .no-products {
    height: 92vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .inner {
      gap: 1rem;
      border: 1px solid $slate-200;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      transform: translateY(-50%);

      background-color: White;
      padding: 4rem;
      border-radius: 5px;

      .link {
        align-self: flex-end;
      }
      // justify-content: center;
      // align-items: center;

      // absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border rounded flex flex-col gap-1 items-start w-84 p-4 space-y-2
    }
  }

  .btn {
    svg {
      fill: $slate-50;
      width: 1.8rem;
      height: 1.8rem;
    }
  }
}
// h-full relative py-6 px-4
</style>
