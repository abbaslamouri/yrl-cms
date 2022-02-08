<script setup>
import { useStore } from '~/pinia/useStore'

const store = useStore()

const page = ref(1)
const perPage = ref(2)
const params = {
  page: 1,
  limit: perPage.value,
  populate: 'thumbImage categories',
  sort: 'createdAt',
  fields: 'name, slug, permalink, stockQty, orders, sales',
}
await Promise.all([store.fetchAll(params), store.fetchCount(params)])

const pages = computed(() =>
  store.count % perPage.value ? parseInt(store.count / perPage.value) + 1 : parseInt(store.count / perPage.value)
)

const setPage = async (currentPage) => {
  params.page = currentPage
  await store.fetchAll(params)
}

const handleSearch = async (event) => {
  params.keyword = event
  await Promise.all([store.fetchAll(params), store.fetchCount(params)])
}
</script>

<script>
export default {
  layout: 'admin',
}
</script>

<template>
  <div class="admin-products">
    <header>
      <h3 class="title">Products</h3>
      <NuxtLink class="link" :to="{ name: 'admin-products-slug', params: { slug: ' ' } }">
        <button class="btn btn-primary">
          <IconsPlus />
          <span>Add</span>
        </button>
      </NuxtLink>
    </header>
    <div class="main" v-if="store.products.length">
      <div class="content">
        <Search @handleSubmit="handleSearch" />
        <ProductAdminList :products="store.products" />
      </div>
      <footer>
        <Pagination :page="page" :pages="pages" @pageSet="setPage" v-if="pages > 1" />
      </footer>
    </div>
    <div class="admin-no-products" v-else>
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

.admin-products {
  min-height: 92vh;
  height: 100%;
  width: 100%;
  padding: 3rem 2rem;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 3rem;

    .content {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }
  }

  .admin-no-products {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid teal;
    min-height: 50vh;

    .inner {
      gap: 1rem;
      border: 1px solid $slate-200;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      background-color: White;
      padding: 4rem;
      border-radius: 5px;

      .link {
        align-self: flex-end;
      }
    }
  }
}
</style>
