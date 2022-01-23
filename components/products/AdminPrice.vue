<script setup>
const prodState = inject('prodState');
</script>

<template>
  <div class="price shadow-md">
    <header class="admin-section-header">Price</header>
    <FormsBaseInput label="Price" required currency v-model="prodState.selectedItem.price" />
  </div>
</template>

<style lang="scss" scoped>
.price {
  background-color: white;
  border-radius: 5px;
  padding: 2rem 2rem;
}
</style>
