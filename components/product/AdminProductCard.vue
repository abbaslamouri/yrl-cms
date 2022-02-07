<script setup>
const router = useRouter()
const deleteById = inject('deleteById')

defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const showActions = ref(false)

const handleDelete = (id) => {
  deleteById(id)
  router.go()
  // const index = state.items.findIndex((el) => el._id == state.selectedItem._id)
  //     // console.log(index)
  //     if (index !== -1) state.items.splice(index, 1)

  // if (!confirm('Are you sure?')) return
  // state.selectedItem = product
  // actions.deleteItem()
}
</script>

<template>
  <div class="product row shadow-md">
    <div class="thumb-title td">
      <div class="thumb">
        <img v-if="product.thumbImage && product.thumbImage.path" :src="`${product.thumbImage.path}`" />
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
        <a href="#" class="link" @click.prevent="handleDelete(product._id)">
          <div class="cancel">Delete</div>
        </a>
      </div>
    </div>
    <Alert>
      <h3>Are you sure you want to delete this product?</h3>
      <p>Your chages will be lost forever</p>
    </Alert>
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
