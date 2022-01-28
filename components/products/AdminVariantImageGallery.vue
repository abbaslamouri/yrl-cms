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
  <div class="image-gallery shadow-md">
    <!-- <pre style="font-size:1rem;">{{ prodState.selectedItem }}</pre> -->
    <header class="admin-section-header">Images</header>
    <div class="image-gallery">
      <div class="thumbs container" v-if="prodState.selectedItem.variants[editIndex].gallery">
        <div
          class="thumb shadow-md relative"
          v-for="(image, index) in prodState.selectedItem.variants[editIndex].gallery"
          :key="image._id"
          @dragover="handleDragover($event, index)"
          @drop="handleDrop($event, index)"
          @dragenter="handleDragenter($event, index)"
          @dragleave="handleDragleave($event, index)"
          @dragover.prevent
          @mouseenter="$event.target.classList.add('hovered')"
          @mouseleave="$event.target.classList.remove('hovered')"
        >
          <div
            class="draggable"
            :class="{ first: index == 0 }"
            :ref="(el) => (draggableElements[index] = el)"
            draggable="true"
            @dragstart="handleDragstart($event, index)"
            @dragend="handleDragend($event, index)"
          >
            <img :src="image.path" :alt="`${image.name} Photo`" draggable="false" />
            <span class="delete" @click.prevent="removeGalleryImage(index)"><IconsDeleteFill /></span>
            <span class="move"><IconsMove /></span>
          </div>
          <span class="index">{{ index + 1 }}</span>
          <div class="tooltip">{{ image.name }}</div>
        </div>
      </div>
      <div class="actions">
        <button
          class="btn btn-primary"
          @click.prevent="handleMediaSelectorClick({ image: 'variant', index: editIndex })"
        >
          <IconsImage />
          <span> Select Images </span>
        </button>
        <span>or</span>
        <button class="btn btn-primary" @click.prevent="showProductGallery = true">
          <IconsImage />
          <span> Choose Existing</span>
        </button>
      </div>
    </div>

    <div v-if="showProductGallery">
      <div class="overlay"></div>
      <div class="product-gallery">
        <div class="wrapper shadow-md">
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

.image-gallery {
  background-color: white;
  border-radius: 5px;
  padding: 2rem 2rem;

  .image-gallery {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    // gap: 3rem;

    .thumbs {
      // display: flex;
      // flex-wrap: wrap;
      // justify-content: space-around;
      // align-items: center;

      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      padding: 2rem;
      // border: 1px solid teal;
      min-height: 20px;

      .thumb {
        position: relative;
        border: 1px solid red;
        padding: 1rem;

        cursor: pointer;
        // border: 1px solid$slate-200;
        border-radius: 5px;
        width: 12rem;
        height: 12rem;

        .index {
          position: absolute;
          top: 2%;
          left: 2%;
          transform: translate(-50%, -50%);
          background-color: $slate-600;
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: $slate-50;
          border-radius: 50%;
          font-size: x-small;
        }

        .tooltip {
          position: absolute;
          top: -1.5rem;
          left: 50%;
          transform: translate(-50%, -100%);
          background-color: $slate-600;
          display: grid;
          grid-template-columns: minmax(max-content, 40rem);

          // max-width: 400px;
          // width: 40rem;
          color: white;
          padding: 1rem 2rem;
          border-radius: 5px;
          font-weight: 500;
          // width: 100%;
          // height: 100%;
          visibility: hidden;

          &::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: $slate-600 transparent transparent transparent;
          }
        }

        &.hovered {
          background-color: $slate-400;

          img {
            opacity: 0.5;
          }

          .tooltip {
            visibility: visible;
          }

          // &:hover {
          .draggable {
            .delete,
            .move {
              opacity: 1;
            }
          }
          // }
        }

        &.over {
          opacity: 0.3;
          border: 2px dashed $slate-600;
        }

        .draggable {
          position: relative;
          width: 100%;
          height: 100%;
          // border: 1px solid green;
          img {
            width: 100%;
            height: 100%;
          }

          .delete {
            position: absolute;
            top: 1rem;
            right: 1rem;
            opacity: 0;

            svg {
              fill: $slate-50;
            }
          }

          .move {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;

            svg {
              fill: $slate-50;
            }
          }
        }

        &:first-child {
          grid-column: 1 / 3;
          grid-row: 1 / 3;

          width: 100%;
          height: 100%;

          &.dragged {
            width: 12rem;
            height: 12rem;
          }
        }
      }
    }

    .btn {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 2rem;
      background-color: $slate-200;
      color: $slate-800;

      svg {
        fill: $slate-800;
      }
    }
  }

  .product-gallery {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .wrapper {
      display: flex;
      flex-direction: column;
      // align-items: center;
      justify-content: center;
      gap: 2rem;
      background-color: white;
      padding: 4rem;
      border: 1px solid red;
      opacity: 1;
      min-width: 50%;
      min-height: 50%;

      .thumbs {
        display: flex;
        align-items: center;
        gap: 2rem;
        flex-wrap: wrap;

        .thumb {
          position: relative;
          border: 1px solid $slate-400;
          padding: 1rem;

          cursor: pointer;
          // border: 1px solid$slate-200;
          border-radius: 5px;
          width: 12rem;
          height: 12rem;

          &.selected {
            border: 2px solid $green-700;

            .check {
              opacity: 1;
              visibility: visible;
            }
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .check {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: -1rem;
            left: -1rem;
            background: $green-600;
            border-radius: 50%;
            padding: 0.3rem;
            width: 2rem;
            height: 2rem;
            opacity: 0;
            visibility: hidden;

            svg {
              fill: white;
            }
          }
        }
      }

      .actions {
        align-self: flex-end;
        display: flex;
        gap: 2rem;
      }
    }
  }
  // .media-selector {
  // 	position: fixed;
  // 	inset: 0;
  // 	background-color: $slate-200;
  // 	z-index: 9999;
  // 	// fixed top-0 left-0 w-full bg-slate-600
  // }
}
</style>
