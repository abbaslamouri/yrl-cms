<script setup>
const prodState = inject('prodState')
const catState = inject('catState')

const addCategory = (catId) => {
  const category = catState.items.find((c) => c._id == catId)
  console.log('CAT', category)
  const index = prodState.selectedItem.categories.findIndex((c) => c._id == catId)
  if (index === -1) prodState.selectedItem.categories.push(category)
  else prodState.selectedItem.categories.splice(index, 1)
}
</script>
<template>
  <div>
    <div class="categories">
      <h3>Product Categories</h3>
      <div v-for="(category, index) in catState.items" :key="category._id">
        <label class="inline-flex items-center">
          <input
            type="checkbox"
            class="form-checkbox"
            :value="category._id"
            @change="addCategory($event.target.value)"
            :checked="!!prodState.selectedItem.categories.find((el) => el._id == category._id)"
          />
          <span class="ml-2">{{ category.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style lang=""></style>
