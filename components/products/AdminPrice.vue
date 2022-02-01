<script setup>
const prodState = inject('prodState');
</script>

<template>
  <section class="price shadow-md" id="price">
    <header class="admin-section-header">Price</header>
    <FormsBaseInput label="Price" required currency v-model="prodState.selectedItem.price" />
  </section>
</template>

<style lang="scss" scoped>
.price {
  background-color: white;
  border-radius: 5px;
  padding: 2rem 2rem 4rem;;
}
</style>
