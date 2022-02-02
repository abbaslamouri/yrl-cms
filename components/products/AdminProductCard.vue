<script setup>
const state = inject('state')
const actions = inject('actions')

defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const showActions = ref(false)

const handleDelete = (product) => {
  if (!confirm('Are you sure?')) return
  state.selectedItem = product
  actions.deleteItem()
}
</script>

<template>
  <div class="product row shadow-md">
    <div class="thumb-title td">
      <div class="thumb">
        <img
          v-if="product.gallery.length && product.gallery[0] && product.gallery[0].mimetype.includes('image')"
          :src="`${product.gallery[0].path}`"
        />
        <img v-else class="thumb" :src="`/placeholder.png`" />
      </div>
      <h3 class="title">{{ product.name }}</h3>
    </div>
    <div class="stock td">{{ product.stockQty }}</div>
    <div class="stock td">{{ product.orders }}</div>
    <div class="stock td">{{ product.sales }}</div>
    <div class="actions td">
      <button class="btn" @click.prevent="showActions = !showActions"><IconsMoreHoriz /></button>
      <div class="menu shadow-md" v-show="showActions">
        <NuxtLink class="link" :to="{ name: 'admin-products-slug', params: { slug: product.slug } }">
          <span>Edit</span>
        </NuxtLink>
        <a href="#" class="link" @click.prevent="handleDelete(product)">
          <div class="cancel">Delete</div>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.product {
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
