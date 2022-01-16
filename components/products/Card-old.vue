<script setup>
// const state = inject('state')
// const actions = inject('actions')

defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const handleDelete = (product) => {
  if (!confirm('Are you sure?')) return
  // state.selectedItem = product
  // actions.deleteItem()
}
</script>

<template>
  <div class="card">
    <div class="header"></div>
    <div class="body">
      <img
        v-if="
          product.featuredImage && product.featuredImage.mimetype && product.featuredImage.mimetype.includes('image')
        "
        class="thumb"
        :src="`${product.featuredImage.path}`"
      />
      <img v-else class="thumb" :src="`/placeholder.png`" />
    </div>
    <div class="footer">
      <h3 class="title">{{ product.name }}</h3>
      <h3 class="price">{{ product.price }}</h3>
      <!-- <h3 class="price">{{ product.category.name }}</h3> -->
      <div class="actions">
        <NuxtLink class="link" :to="{ name: 'products-slug', params: { slug: product.slug } }">
          <button class="btn"><IconsCartFill /></button>
        </NuxtLink>
        <NuxtLink class="link" :to="{ name: 'products-slug', params: { slug: product.slug } }">
          <button class="btn view"><IconsVisibilityOnFill /></button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  // width: 24rem;
  // height: 24rem;
  cursor: pointer;
  border: 1px solid #ddd;
  padding: 0;
  border-radius: 5px;

  .body {
    // display: flex;
    // justify-content: center;
    // align-items: center;

    height: 12rem;

    img {
      width: 100%; /* or any custom size */
      height: 100%;
      object-fit: cover;
    }
  }

  &.selected {
    background-color: #0277bd;
    color: #fff;
  }

  .footer {
    border-top: 1px solid grey;
    // display: flex;
    // gap: 1rem;
    // align-items: center;
    // height: 5rem;
    padding: 1rem;
    font-size: 1.2rem;

    .title {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .actions {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .btn {
        padding: 1rem;
        border: none;
        background-color: transparent;

        &.delete {
          svg {
            fill: #d32f2f;
          }
        }

        &.edit {
          color: #43a047;
        }
      }
    }

    .filename {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
