<script setup>
const state = inject('state')
</script>

<template>
  <div class="admin-product-list">
    <div class="table">
      <div class="table__header">
        <div class="row">
          <div class="th">Product</div>
          <div class="th">Stock Qty.</div>
          <div class="th">Orders</div>
          <div class="th">Sales</div>
          <div class="th">actions</div>
        </div>
      </div>
      <div class="table__body">
        <ProductAdminCard :product="product" v-for="product in state.items" :key="product._id" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// @import '@/assets/scss/variables';
</style>
