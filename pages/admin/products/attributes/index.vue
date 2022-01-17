<script setup>
const { state: attState, actions: attActions } = useFactory('attributes')
const { state: attTermsState, actions: attTermsActions } = useFactory('attributeterms')
provide('attState', attState)
provide('attActions', attActions)
provide('attTermsState', attTermsState)
provide('attTermsActions', attTermsActions)

// Populate attribute and atribute terms states
await Promise.all([attActions.fetchAll(), attTermsActions.fetchAll()])

const handleSearch = async () => {
  await attActions.fetchAll()
}
</script>

<script>
export default {
  layout: 'admin',
}
</script>

<template>
  <div class="attributes">
    <!-- Add new attribute button -->
    <NuxtLink class="link" :to="{ name: 'admin-products-attributes-slug', params: { slug: ' ' } }">
      <button class="btn">Add New</button>
    </NuxtLink>

    <!-- Search field -->
    <Search v-model="attState.query.keyword" @handleSubmit="handleSearch" />

    <!-- Attributes list -->
    <div class="list" v-for="item in attState.items" :key="item.slug">
      <ProductsAttribute :item="item" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.attributes {
  padding: 2rem;
}
</style>
