<script setup>
const state = inject('state')
const actions = inject('actions')

const products = computed(() => state.items.filter((el) => el.slug.includes(state.query.keyword.toLowerCase())))

state.query.populate = 'featuredImage'
state.query.limit = 2
state.query.sort.field = 'createdAt'
await actions.fetchAllProductsAndCategories()
</script>

<template>
  <div :class="{ list: viewStyle === 'list', tile: viewStyle === 'tile' }">
    <ProductsCard :product="product" v-for="product in products" :key="product._id" />
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
      justify-content: space-around;
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
