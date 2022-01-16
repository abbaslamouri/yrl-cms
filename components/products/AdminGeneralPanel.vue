<script setup>
const prodState = inject('prodState')

// const taxStatusOptions = ref([
//   { key: '', value: 'None' },
//   { key: 'taxable', value: 'Taxable' },
//   { key: 'sipping-only', value: 'Shipping Only' },
// ])
// const taxClassOptions = ref([
//   { key: 'standard', value: 'Standard Rate' },
//   { key: 'reduced', value: 'Reduced Rate' },
//   { key: 'zero', value: 'Zero Rate' },
// ])
</script>

<template>
  <div>
    <div v-if="prodState.selectedItem.type == 'simple'">
      <div class="mb-6">
        <label class="block text-gray-500 font-bold" for="product-name">Price</label>
        <input class="bg-gray-200" id="product-name" type="text" v-model="prodState.selectedItem.price" />
      </div>
      <div class="mb-6">
        <label class="block text-gray-500 font-bold" for="product-name">Sale Price</label>
        <input class="bg-gray-200" id="product-name" type="text" v-model="prodState.selectedItem.salePrice" />
      </div>
    </div>
    <label>Tax Status</label>
    <select class="bg-gray-200" v-model="prodState.selectedItem.taxStatus">
      <option value="none">None</option>
      <option value="taxable">Taxable</option>
      <option value="shipping-only">Shipping Only</option>
    </select>
    <label>Tax Class</label>
    <select class="bg-gray-200" v-model="prodState.selectedItem.taxClass">
      <option value="standard">Standard Rate</option>
      <option value="reduced">Reduced Rate</option>
      <option value="zero">Zero Rate</option>
    </select>
    <!-- <ProductsBaseSelect v-model="prodState.selectedItem.taxStatus" :options="taxStatusOptions" label="Tax Status" /> -->
    <!-- <ProductsBaseSelect v-model="prodState.selectedItem.taxClass" :options="taxClassOptions" label="Tax Class" /> -->
  </div>
</template>

<style lang=""></style>
