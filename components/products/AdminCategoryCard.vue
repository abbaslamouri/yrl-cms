<script setup>
const state = inject('state')
const actions = inject('actions')

defineProps({
  category: {
    type: Object,
    required: true,
  },
})

const showActions = ref(false)

const handleDelete = (category) => {
  if (!confirm('Are you sure?')) return
  state.selectedItem = category
  actions.deleteItem()
}
</script>

<template>
  <div class="admin-category row shadow-md">
    <!-- {{ state.items }} -->
    <div class="thumb-title td">
      <div class="thumb">
        <img
          v-if="category.gallery.length && category.gallery[0] && category.gallery[0].mimetype.includes('image')"
          :src="`${category.gallery[0].path}`"
        />
        <img v-else class="thumb" :src="`/placeholder.png`" />
      </div>
      <h3 class="title">{{ category.name }}</h3>
    </div>

    <div class="stock td">{{ category.slug }}</div>
    <div class="actions td">
      <button class="btn" @click.prevent="showActions = !showActions"><IconsMoreHoriz /></button>
      <div class="menu shadow-md" v-show="showActions">
        <NuxtLink class="link" :to="{ name: 'admin-products-categories-slug', params: { slug: category.slug } }">
          <span>Edit</span>
        </NuxtLink>
        <a href="#" class="link" @click.prevent="handleDelete(category)">
          <div class="cancel">Delete</div>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.admin-category {
  padding: 1rem;
  // border: none;
  // border-bottom: 2px solid $slate-200;

  .thumb-title {
    display: flex;
    align-items: center;
    gap: 2rem;

    .thumb {
      width: 5rem;
      height: 5rem;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
