<script setup>
const prodState = inject('prodState');
</script>

<template>
  <div class="empty-variant-message">
    <div class="card">
      <h3>Set up variant groups to sell variations of the same product</h3>
      <p>
        Variants help you to sell products with slight differences, but are still the same product. For example, you
        might sell a t-shirt in different colors, or a plant pot in different sizes.<br /><br />You can configure
        variants to have their own price, SKU, and stock inventory. To get started, create groups and options for your
        variants. Groups define the type of variant (e.g. color). Options are a choice your customer can make within
        that group (e.g. blue).
      </p>
      <button class="btn btn-primary" @click="prodState.selectedItem.variantGroups.unshift({})">
        Add Variant Group
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.empty-variant-message {
  // border: 1px solid red;
  // min-height: 100vh;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .card {
    display: flex;
    flex-direction: column;
    // gap:2rem;
    padding: 4rem;
    border: 1px solid $slate-200;
    background-color: $slate-50;
    border-radius: 5px;
    max-width: 60rem;

    p {
      margin-block-start: 1em;
      margin-block-end: 1em;
    }

    .btn {
      align-self: flex-end;
    }
  }
  // max-width: 36rem;
}
</style>
