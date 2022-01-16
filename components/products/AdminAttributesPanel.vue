<script setup>
const attState = inject('attState')
const prodState = inject('prodState')
const attTermsState = inject('attTermsState')
// const attributeSelect = inject('attributeSelect')

const attributeSelect = ref('')

const addAttribute = () => {
  console.log(attributeSelect.value)
  const attribute = attState.items.filter((el) => el._id == attributeSelect.value)[0]
  const terms = attTermsState.items.filter((el) => el.parent == attribute._id)
  attribute.visible = true
  attribute.variation = true
  prodState.selectedItem.attributes.push({ item: attribute, defaultTerm: terms[0] })
  attributeSelect.value = ''
}
</script>

<template>
  <div>
    <!-- <pre class="text-sm">{{ prodState.selectedItem }}</pre> -->

    <div class="attributes-select">
      <select class="bg-gray-200" v-model="attributeSelect" @change="addAttribute">
        <option value="">Select Product Attributes</option>
        <option
          v-for="attr in attState.items"
          :key="attr._id"
          :value="attr._id"
          :disabled="prodState.selectedItem.attributes.filter((el) => el.item._id == attr._id).length"
        >
          {{ attr.name }}
        </option>
      </select>
    </div>

    <div class="attributes-list">
      <div class="attribute" v-for="(attribute, index) in prodState.selectedItem.attributes">
        <ProductsAdminAttribute :index="index" />
      </div>
    </div>
  </div>
</template>

<style lang=""></style>
