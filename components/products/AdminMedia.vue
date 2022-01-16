<script setup>
const prodState = inject('prodState')

const removeGalleryImage = (imageId) => {
  const index = prodState.selectedItem.gallery.findIndex((el) => el._id == imageId)
  if (index !== -1) prodState.selectedItem.gallery.splice(index, 1)
}
</script>

<template>
  <div>
    <div class="featured-image border border-red-600 w-full">
      <img
        class="w-full h-full object-cover"
        v-if="prodState.selectedItem.featuredImage"
        :src="prodState.selectedItem.featuredImage.path"
        :alt="`${prodState.selectedItem.featuredImage.name} Photo`"
      />
      <img v-else src="/placeholder.png" alt="Product Image Placeholder" />
      <button
        class="block bg-gray-300"
        @click.prevent="$emit('mediaSelectorClicked', { image: 'featuredImage', index: null })"
      >
        Select Featured Images
      </button>
    </div>
    <div class="gallery border border-yellow-300 p-10">
      <div
        v-if="prodState.selectedItem.gallery && prodState.selectedItem.gallery.length"
        class="images flex flex-wrap justify-center gap-10"
      >
        <div
          class="thumb relative inline-block border border-blue-600 w-40 h-40 cursor-pointer"
          v-for="image in prodState.selectedItem.gallery"
          :key="image._id"
        >
          <img class="w-full h-full object-cover" :src="image.path" :alt="`${image.name} Photo`" />
          <span
            class="
              absolute
              top-0
              right-0
              w-10
              h-10
              transform
              translate-x-1/2
              -translate-y-1/2
              bg-red-600
              rounded-full
              flex
              justify-center
              items-start
              text-white
            "
            @click.prevent="removeGalleryImage(image._id)"
            >x</span
          >
        </div>
      </div>
      <button
        class="
          bg-transparent
          hover:bg-blue-500
          text-blue-700
          font-semibold
          hover:text-white
          py-2
          px-4
          border border-blue-500
          hover:border-transparent
          rounded
        "
        @click.prevent="$emit('mediaSelectorClicked', { image: 'gallery', index: null })"
      >
        Select Product Gallery
      </button>
    </div>
  </div>
</template>

<style lang=""></style>
