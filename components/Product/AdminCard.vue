<script setup>
import { useStore } from '~/pinia/useStore'

const store = useStore()

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})
// const deleteById = inject('deleteById')
const router = useRouter()
const showActions = ref(false)
const showAlert = ref(false)
const itemToDeleteId = ref(null)

const setItemToDelete = () => {
  itemToDeleteId.value = props.product._id
  showActions.value = false
  showAlert.value = true
}

const deleteProduct = async () => {
  await store.deleteById(itemToDeleteId.value)
  if (!store.errorMsg) {
    console.log('DEL')
    router.go()
  }
}
</script>

<template>
  <div class="product row shadow-md">
    <div class="thumb-title td">
      <!-- {{ itemToDeleteId }} -->
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
        <a href="#" class="link" @click.prevent="setItemToDelete">
          <div class="cancel">Delete</div>
        </a>
      </div>
    </div>
    <Alert @cancel="showAlert = false" @ok="deleteProduct" v-show="showAlert">
      <div class="modal-content">
        <h3>Are you sure you want to delete this item?</h3>
        <p>Your data will be lost forever</p>
      </div>
    </Alert>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.product {
  padding: 1rem;

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
