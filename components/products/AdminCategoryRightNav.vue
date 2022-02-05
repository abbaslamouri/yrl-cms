<script setup>
defineEmits(['saveCategory'])
const state = inject('state')
const actions = inject('actions')
const showSubCategorySlideout = inject('showSubCategorySlideout')
// const catState = inject('catState')

const router = useRouter()
// const subCategories = ref([])

// const selectedCategories = ref([])
// const nameInputRef = ref(null)
// const priceInputRef = ref(null)

// const setProductCategories = () => {
//   state.selectedItem.categories = []
//   // console.log(selectedCategories.value)
//   for (const prop in selectedCategories.value) {
//     state.selectedItem.categories.push(catState.items.find((c) => c._id == selectedCategories.value[prop]))
//   }
// }

// watch(
//   () => state.items,
//   (currentValue, oldValue) => {
//     console.log(currentValue)
//     console.log(oldValue)
//     subCategories.value = currentValue.filter((c) => c.parent && c.parent._id == state.selectedItem._id)
//   },
//   { deep: true, immediate: true }
// )
</script>

<template>
  <div class="admin-right-nav">
    <div class="save-changes shadow-md">
      <button class="btn btn-primary" @click.prevent="$emit('saveCategory')">Save Changes</button>
    </div>
    <pre>    {{ state.items.length }}</pre>

    <section class="parent shadow-md">
      <header class="admin-section-header">Parent</header>
      <div class="content">Please add another category first</div>
    </section>
    <section class="sub-categories shadow-md">
      <header class="admin-section-header">
        <p class="title">Sub Categories</p>
        <button class="btn btn-heading" @click="showSubCategorySlideout = true">
          <IconsPlus />
          <span>Add</span>
        </button>
      </header>
      <div class="content">
        <p v-if="!state.items.filter((c) => c.parent && c.parent._id == state.selectedItem._id)">
          This category has no sub-categories
        </p>
        <div
          v-else
          v-for="category in state.items.filter((c) => c.parent && c.parent._id == state.selectedItem._id)"
          :key="category._id"
        >
          <div class="name">{{ category.name }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.admin-right-nav {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .save-changes {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 5px;
    padding: 2rem 2rem;

    .btn {
      padding: 2rem 3rem;
      border-radius: 5px;
      background-color: $green-800;
      font-size: 1.4rem;
      letter-spacing: 0.15rem;
    }
  }
  .parent {
    background-color: white;
    border-radius: 5px;
    padding: 2rem 2rem 4rem;

    .content {
      display: flex;
      flex-direction: column;
      gap: 3rem;

      .name-permalink {
        display: flex;
        align-items: center;
        gap: 2rem;
        width: 100%;

        .name,
        .permalink {
          flex: 1;
        }
      }
    }
  }

  .sub-categories {
    background-color: white;
    border-radius: 5px;
    padding: 2rem 2rem 4rem;
    // display: flex;
    // flex-direction: column;
    // align-items: flex-start;
    // gap: 2rem;
    // background-color: white;
    // border-radius: 5px;
    // padding: 2rem 2rem;

    .admin-section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  // w-1/4 border shadow-lg bg-white rounded py-4 px-4
}
</style>
