<script setup>
const prodState = inject('prodState')
const handleMediaSelectorClick = inject('handleMediaSelectorClick')
</script>

<template>
  <section class="product-image-gallery shadow-md" id="image-gallery">
    <header class="admin-section-header">Image Gallery</header>
    <div class="content">
      <div class="intro">
        <IconsInfo />
        <p>This image gallery contains all images associated with this product including its attached variants.</p>
      </div>
      <!-- <div class="image-gallery"> -->
        <ProductsAdminImageGallery :gallery="prodState.selectedItem.gallery" v-if="prodState.selectedItem.gallery.length"/>
      <!-- </div> -->
      <button
        class="btn btn-image-select"
        @click.prevent="handleMediaSelectorClick({ image: 'gallery', index: null })"
      >
        <IconsImage />
        <span> Select Images </span>
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.product-image-gallery {
  background-color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    .intro {
      display: flex;
      align-items: center;
      gap: 1rem;
      background-color: $sky-100;
      padding: 1rem 2rem;
      border-radius: 5px;
      font-size:80%;

      svg {
        width: 3rem;
        height: 3rem;
        fill: $sky-600;
      }
    }
  }
}
</style>
