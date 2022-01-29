<script setup>
const prodState = inject('prodState')
</script>

<template>
  <div class="shipping-options flex-bc shadow-md" id="shipping-options">
    <header class="admin-section-header">Shipping Options</header>
    <FormsBaseToggle v-model="prodState.selectedItem.manageInventory" label="Enable" />
  </div>
</template>

<style lang="scss" scoped>
.shipping-options {
  background-color: white;
  border-radius: 5px;
  padding: 2rem 2rem;

  .info {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .sku-inventory {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;

      .sku {
        flex: 1;
      }

      .inventory {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-size: 1.3rem;

        .available {
          display: flex;
          align-items: center;
          gap: 1rem;

          .title {
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
