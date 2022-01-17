<script setup>
const { state, actions } = useFactory('categories')

// populate categories
state.query.populate = 'parent'
await actions.fetchAll()

const handleDelete = (item) => {
  if (!confirm('Are you sure?')) return
  state.selectedItem = item
  actions.deleteItem()
}

const handleSearch = async () => {
  await actions.fetchAll()
}
</script>

<script>
export default {
  layout: 'admin',
}
</script>

<template>
  <div class="categories">
    {{ state.items }}
    <!-- Add new category button -->
    <NuxtLink class="link" :to="{ name: 'admin-products-categories-slug', params: { slug: ' ' } }">
      <button class="btn">Add New</button>
    </NuxtLink>

    <!-- Search input field -->
    <Search v-model="state.query.keyword" @handleSubmit="handleSearch" />

    <!-- Category list -->
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
</template>

<style lang="scss" scoped>
.categories {
  padding: 2rem;

  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    margin-top: 2rem;

    .actions {
      display: flex;
      align-items: center;

      .btn {
        padding: 1rem;
        border: none;
        background-color: transparent;

        &.delete {
          svg {
            fill: #d32f2f;
          }
        }

        &.edit {
          color: #43a047;
        }
      }
    }
  }
}
</style>
