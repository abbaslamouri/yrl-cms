<script setup>
const prodState = inject('prodState')
</script>

<template>
  <section class="details shadow-md" id="details">
    <header class="admin-section-header">Details</header>
    <div class="content">
      <FormsBaseInput label="Name" placeholder="Name" required v-model="prodState.selectedItem.name" />
      <div class="sku-inventory">
        <div class="sku">
          <FormsBaseInput label="SKU" placeholder="SKU" v-model="prodState.selectedItem.sku" />
        </div>
        <div class="inventory">
          <div class="available">
            <h4 class="title">Available Stock:</h4>
            <span>{{ prodState.selectedItem.stockQty || 0 }}</span>
          </div>
          <FormsBaseToggle v-model="prodState.selectedItem.manageInventory" label="Manage Inventory" />
        </div>
      </div>
      <div class="base-textarea">
        <textarea
          v-model="prodState.selectedItem.description"
          label="Description"
          placeholder="Description"
          rows="5"
        ></textarea>
        <label>Description</label>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.details {
  background-color: white;
  border-radius: 5px;
  padding: 2rem 2rem 4rem;

  .content {
    display: flex;
    flex-direction: column;
    gap: 3rem;

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
