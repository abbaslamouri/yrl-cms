<script setup>
import slugify from 'slugify'

const prodState = inject('prodState')
// const attState = inject('attState')
// const attTermsState = inject('attTermsState')
</script>

<template>
  <div>
    <div class="mb-6 space-x-2">
      <label class="" for="product-name">Name</label>
      <input
        class="bg-gray-200"
        type="text"
        v-model="prodState.selectedItem.name"
        @input="prodState.selectedItem.slug = slugify(prodState.selectedItem.name, { lower: true })"
      />
    </div>
    <div class="slug">Slug: {{ prodState.selectedItem.slug }}</div>
    <div class="mb-6">
      <label class="" for="product-name">Custom Slug</label>
      <input class="bg-gray-200" id="product-name" type="text" v-model="prodState.selectedItem.customSlug" />
    </div>
    <div class="mb-6">
      <label class="block text-gray-500 font-bold" for="product-name">Description</label>
      <input class="bg-gray-200" id="product-name" type="text" v-model="prodState.selectedItem.description" />
    </div>
    <div>
      <label for="">Product Data</label>
      <select class="bg-gray-200" v-model="prodState.selectedItem.type">
        <option value="simple">Simple Product</option>
        <option value="variable">Variable Product</option>
      </select>
    </div>
  </div>
</template>

<style lang=""></style>
