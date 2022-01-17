<script setup>
const { state, actions } = useFactory('coupons')

provide('state', state)
provide('actions', actions)

// Populate attribute and atribute terms states
// state.query.populate = 'products'
await actions.fetchAll()

const handleSearch = async () => {
  // await actions.fetchAll()
}
</script>

<script>
export default {
  layout: 'admin',
}
</script>

<template>
  <div class="coupons">
    <!-- Add new attribute button -->
    <NuxtLink class="link" :to="{ name: 'admin-products-coupons-slug', params: { slug: ' ' } }">
      <button class="btn">Add New</button>
    </NuxtLink>

    <!-- Search field -->
    <!-- <Search v-model="state.query.keyword" @handleSubmit="handleSearch" /> -->

    <!-- Attributes list -->
    <div class="list" v-for="item in state.items" :key="item.slug">
      <ProductsCoupon :item="item" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// .attributes {
//   padding: 2rem;
// }
</style>
