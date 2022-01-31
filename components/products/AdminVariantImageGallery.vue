<script setup>
const props = defineProps({
  // prodVariantEdit: {
  //   type: Object,
  //   required: true,
  // },
  editIndex: {
    type: Number,
    required: true,
  },

  // showVariantSlideout: {
  //   type: Boolean,
  // },
})

const prodState = inject('prodState')
const handleMediaSelectorClick = inject('handleMediaSelectorClick')
// const imageGallery = inject('imageGallery')
// const fetchGallery = inject('fetchGallery')
const draggableElements = ref([])

const galleryThumbRef = ref([])
const showProductGallery = ref(false)

const selectedImages = ref([])

// const pickIndex = ref(null)
// const dropIndex = ref(null)

const removeGalleryImage = (index) => {
  prodState.selectedItem.variants[props.editIndex].gallery.splice(index, 1)
}

const setSelectedImages = (event, image, j) => {
  galleryThumbRef.value[j].classList.toggle('selected')
  // const index = prodState.selectedItem.variants[props.editIndex].gallery.findIndex((img) => img._id == image._id)
  // if (index === -1) prodState.selectedItem.variants[props.editIndex].gallery.push(image)
  // else prodState.selectedItem.variants[props.editIndex].gallery.splice(index, 1)

  const index = selectedImages.value.findIndex((img) => img._id == image._id)
  if (index === -1) selectedImages.value.push(image)
  else selectedImages.value.splice(index, 1)
  // console.log(event.target)
  // console.log(image)
  // for (const prop in galleryThumbRef.value) {
  //   console.log(galleryThumbRef.value[prop])
  // } // for (const prop in galleryThumbRef.value) {
  //   console.log(galleryThumbRef.value[prop].closest('.thumb').classList)
  // }
  // galleryThumbRef[j].closest('.thumb').classList.toggle('selected')
}

const cancelSelectedImages = () => {
  showProductGallery.value = false
  selectedImages.value = []
}

const SetVariantGallery = () => {
  prodState.selectedItem.variants[props.editIndex].gallery = [
    ...prodState.selectedItem.variants[props.editIndex].gallery,
    ...selectedImages.value,
  ]
  selectedImages.value = []
  showProductGallery.value = false
}
</script>

<template>
  <div class="variant-image-gallery shadow-md">
    <header class="admin-section-header">Images</header>
    <div class="content">
      <div class="image-gallery" v-if="prodState.selectedItem.variants[editIndex].gallery.length">
        <ProductsAdminImageGallery :gallery="prodState.selectedItem.variants[editIndex].gallery" />
      </div>
      <div class="actions">
        <div class="buttons">
          <button
            class="btn btn-image-select"
            @click.prevent="handleMediaSelectorClick({ image: 'variant', index: editIndex })"
          >
            <IconsImage />
            <span> Select Images </span>
          </button>
          <span>or</span>
          <button class="btn btn-image-select" @click.prevent="showProductGallery = true">
            <IconsImage />
            <span> Choose Existing</span>
          </button>
        </div>
        <p class="image-types">PNG, JPG & GIF ACCEPTED</p>
      </div>
    </div>

    <div class="variant-select-from-gallery" v-if="showProductGallery">
      <div class="overlay"></div>
      <div class="wrapper">
        <div class="content shadow-md">
          <!-- <div class="wrapper shadow-md"> -->
          <h3>Select Images</h3>
          <div class="thumbs" v-if="prodState.selectedItem.variants[editIndex].gallery">
            <div
              class="thumb shadow-md relative"
              :class="{
                selected: prodState.selectedItem.variants[editIndex].gallery.find((img) => img._id == image._id),
              }"
              v-for="(image, j) in prodState.selectedItem.gallery.filter(
                (img) => !prodState.selectedItem.variants[editIndex].gallery.find((item) => item._id == img._id)
              )"
              :key="image._id"
              :ref="(el) => (galleryThumbRef[j] = el)"
              @click="setSelectedImages($event, image, j)"
            >
              <div v-if="!prodState.selectedItem.variants[editIndex].gallery.find((img) => img._id == image._id)">
                <img :src="image.path" :alt="`${image.name} Photo`" />
                <span class="check"><IconsSuccess /></span>
              </div>
            </div>
          </div>
          <div class="actions">
            <button class="btn btn-secondary" @click.prevent="cancelSelectedImages">
              <span> Cancel</span>
            </button>
            <button class="btn btn-primary" @click.prevent="SetVariantGallery">
              <span> Select</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="media-selector" v-if="showMediaSelector">
      <MediaUploader @mediaSelected="processSelectedMedia" @mediaSelectCancel="showMediaSelector = false" />
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.variant-image-gallery {
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

    .actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;

      .buttons {
        display: flex;
        align-items: center;
        gap: 2rem;
      }

      .image-types {
        font-size: 80%;
      }
    }
  }
}

.variant-select-from-gallery {
  // width: 100%;
  // height: 100%;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  border: 10px solid red;

  // opacity: 0.9;

  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    // background-color: white;
    z-index: 9;
    // opacity: 0.99;

    border: 10px solid $slate-600;

    .content {
      border-radius: 5px;
      max-width: 50%;
      background-color: white;
      padding: 4rem 6rem;

      border: 1px solid $slate-200;
      .thumbs {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 2rem;
        padding: 4rem;
        min-height: 20px;
        border: 1px solid $slate-200;
        border-radius: 5px;

        .thumb {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          border: 1px solid $slate-200;
          padding: 1rem;
          cursor: pointer;
          border-radius: 5px;

          &.selected {
            border: 1px solid $green-600;

            .check {
              background-color: $green-600;
            }
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .check {
            position: absolute;
            top: 0;
            left: 0;
            background-color: $slate-400;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.25rem;
            transform: translate(-50%, -50%);
            svg {
              fill: white;
            }
          }
        }
      }
      .actions {
        display: flex;
        gap: 2rem;
      }
    }
  }
}
</style>
