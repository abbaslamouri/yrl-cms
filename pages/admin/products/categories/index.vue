<script setup>
const { state, actions } = useFactory('categories')

// populate categories
state.query.populate = 'parent gallery'
await actions.fetchAll()

const handleDelete = (item) => {
  if (!confirm('Are you sure?')) return
  state.selectedItem = item
  actions.deleteItem()
}

const handleSearch = async (event) => {
  state.query.keyword = event
  await actions.fetchAll()
}

provide('state', state)
provide('actions', actions)
</script>

<script>
export default {
  layout: 'admin',
}
</script>

<template>
  <div class="categories">
    <Html>
      <Head><Title>Categories</Title></Head>
    </Html>
    <div v-if="state.items.length" class="main">
      <header>
        <h3 class="title">Categories</h3>
        <NuxtLink class="link" :to="{ name: 'admin-products-categories-slug', params: { slug: ' ' } }">
          <button class="btn btn-primary">
            <IconsPlus />
            <span>Add</span>
          </button>
        </NuxtLink>
      </header>
      <div class="content shadow-md">
        <Search @handleSubmit="handleSearch" />
        <!-- <Pagination :page="page" :pages="pages" @pageSet="setPage" v-if="pages > 1" /> -->
        <div class="admin-category-list">
          <div class="table">
            <div class="table__header">
              <div class="row">
                <div class="th">Name</div>
                <div class="th">Slug</div>
                <div class="th">actions</div>
              </div>
            </div>
            <div class="table__body">
              <ProductsAdminCategoryCard
                :category="category"
                v-for="(category, i) in state.items"
                :key="category._id"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-categories shadow-md">
      <div class="inner">
        <h3 class="">Add categories and subcategories</h3>
        <div class="">Create nested product categories with category images and descriptions</div>
        <NuxtLink class="link" :to="{ name: 'admin-products-categories-slug', params: { slug: ' ' } }">
          <button class="btn btn-primary">
            <IconsPlus />
            <span>Add</span>
          </button>
        </NuxtLink>
      </div>
    </div>

    <!-- <div v-if="state.items.length" class="list">
      <NuxtLink class="link" :to="{ name: 'admin-products-categories-slug', params: { slug: ' ' } }">
        <button class="btn">Add New</button>
      </NuxtLink>
      <Search v-model="state.query.keyword" @handleSubmit="handleSearch" />
      <div class="list" v-for="item in state.items" :key="item.slug">
        <div class="name">Name: {{ item.name }}</div>
        <div v-if="item.parent" class="parent">Parent: {{ item.parent.name }}</div>
        <div class="actions">
          <NuxtLink class="link" :to="{ name: 'admin-products-categories-slug', params: { slug: item.slug } }">
            <button class="btn edit"><IconsEditFill /></button>
          </NuxtLink>
          <button class="btn delete" @click="handleDelete(item)"><IconsDeleteFill /></button>
        </div>
      </div>
    </div>

    <div v-else class="no-products">
      <h3 class="">Add categories and sub-categories</h3>
      <div class="">Create product categories and sub-categories with images and descriptions.</div>
      <NuxtLink class="link" :to="{ name: 'admin-products-categories-slug', params: { slug: ' ' } }">
        <button class="btn btn-primary">
          <IconsPlus />
          <span>Add</span>
        </button>
      </NuxtLink>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.categories {
  min-height: 100%;
  height: 100%;
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
      padding: 2rem;
    }
  }

  .no-categories {
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
// .categories {
//   padding: 2rem;

//   .list {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     background-color: #f5f5f5;
//     margin-top: 2rem;

//     .actions {
//       display: flex;
//       align-items: center;

//       .btn {
//         padding: 1rem;
//         border: none;
//         background-color: transparent;

//         &.delete {
//           svg {
//             fill: #d32f2f;
//           }
//         }

//         &.edit {
//           color: #43a047;
//         }
//       }
//     }
//   }
// }
</style>
