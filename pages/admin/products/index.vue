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
  console.log(currentPage)
  state.query.page = currentPage
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
    <div v-if="state.items.length" class="list">
      <h3 class="text-xl font-bold">Products</h3>
      <NuxtLink class="link self-end" :to="{ name: 'admin-products-slug', params: { slug: ' ' } }">
        <button class="btn btn-primary rounded-full text-xs flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add</span>
        </button>
      </NuxtLink>
    </div>
    <!-- <pre class="text-sm">{{ state.totalItemCount }}============={{ state.items }}</pre> -->

    <div v-else class="no-products">
      <h3 class="">Add your first physical or digital product</h3>
      <div class="">Add your roduct and variants. Products must have at least a name and a price</div>
      <NuxtLink class="link" :to="{ name: 'admin-products-slug', params: { slug: ' ' } }">
        <button class="btn btn-primary">
          <IconsPlus />
          <span>Add</span>
        </button>
      </NuxtLink>
    </div>
    <!-- <ProductsSearch v-model="state.query.keyword" @keywordSet="submitSearch" /> -->
    <ProductsAdminList />
    <!-- <Pagination :page="page" :pages="pages" @pageSet="setPage" v-if="pages > 1" /> -->
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.products {
  min-height: 100vh;
  position: relative;

  .no-products {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid $slate-400;
    padding: 2rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .link {
      align-self: flex-end;

      .btn {
        display: flex;
        align-items: center;
        gap: 0.3rem;
      }

      svg {
        fill: $slate-50;
        width: 1.8rem;
        height: 1.8rem;
      }
    }
    // justify-content: center;
    // align-items: center;

    // absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border rounded flex flex-col gap-1 items-start w-84 p-4 space-y-2
  }
}
// h-full relative py-6 px-4
</style>
