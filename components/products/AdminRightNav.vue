<script setup>
defineEmits(['saveProduct'])
const prodState = inject('prodState')
const prodActions = inject('prodActions')
const catState = inject('catState')

const router = useRouter()

const selectedCategories = ref([])
const nameInputRef = ref(null)
const priceInputRef = ref(null)

const setProductCategories = () => {
  prodState.selectedItem.categories = []
  // console.log(selectedCategories.value)
  for (const prop in selectedCategories.value) {
    prodState.selectedItem.categories.push(catState.items.find((c) => c._id == selectedCategories.value[prop]))
  }
}
</script>

<template>
  <div class="admin-right-nav">
    <div class="save-changes shadow-md">
      <button class="btn btn-primary" @click.prevent="$emit('saveProduct')">Save Changes</button>
      <FormsBaseToggle v-model="prodState.selectedItem.active" label="Active" />
    </div>
    <div class="categories shadow-md">
      <header class="admin-section-header">Categories</header>
      <div class="category-list">
        <FormsBaseSelectMultiple
          v-model="selectedCategories"
          @update:modelValue="setProductCategories"
          label="Select Categories"
          :options="
            catState.items.map((c) => {
              return { key: c._id, name: c.name }
            })
          "
        />
      </div>
      <NuxtLink class="link" :to="{ name: 'admin-products-categories' }">
        <span>Edit Categories</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.admin-right-nav {
  .save-changes {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: white;
    border-radius: 5px;
    padding: 2rem 2rem;

    .btn {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
  }

  .categories {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    background-color: white;
    border-radius: 5px;
    padding: 2rem 2rem;

    .category-list {
      width: 100%;
    }
  }

  // w-1/4 border shadow-lg bg-white rounded py-4 px-4
}
</style>
