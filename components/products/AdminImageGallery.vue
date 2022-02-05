<script setup>
const prodState = inject('prodState')
const props = defineProps({
  gallery: {
    type: Array,
    required: true,
  },
})
const draggableElements = ref([])
const pickIndex = ref(null)

const removeGalleryImage = (index) => {
  props.gallery.splice(index, 1)
}

const handleDragstart = (event, index) => {
  pickIndex.value = index
  event.target.closest('.thumb').classList.remove('hovered')
}

const handleDragend = (event, index) => {
  for (const prop in draggableElements.value) {
    if (draggableElements.value[prop]) draggableElements.value[prop].closest('.thumb').classList.remove('hovered')
  }
}

const handleDragover = (event, index) => {
  event.target.closest('.thumb').classList.add('over')
}

const handleDragleave = (event) => {
  event.target.closest('.thumb').classList.remove('over')
}
const handleDrop = async (event, index) => {
  const pickedElement = props.gallery[pickIndex.value]
  const droppedElement = props.gallery[index]
  props.gallery[pickIndex.value] = droppedElement
  props.gallery[index] = pickedElement
  event.target.closest('.thumb').classList.remove('over')
}

const setFeaturedImage = (event) => {
  console.log(event.target, pickIndex.value)
  prodState.selectedItem.featuredImage = props.gallery[pickIndex.value]
}
</script>

<template>
  <section class="admin-image-gallery shadow-md" id="image-gallery">
    <div class="gallery">
      <div class="thumbs" v-if="gallery">
        <div
          class="thumb shadow-md relative"
          v-for="(image, index) in gallery"
          :key="image._id"
          @dragover="handleDragover($event, index)"
          @drop="handleDrop($event, index)"
          @dragleave="handleDragleave($event, index)"
          @dragover.prevent
          @mouseenter="$event.target.classList.add('hovered')"
          @mouseleave="$event.target.classList.remove('hovered')"
        >
          <div
            class="thumb__draggable"
            :class="{ first: index == 0 }"
            :ref="(el) => (draggableElements[index] = el)"
            draggable="true"
            @dragstart="handleDragstart($event, index)"
            @dragend="handleDragend($event, index)"
          >
            <img :src="image.path" :alt="`${image.name} Photo`" draggable="false" />
            <span class="thumb__delete" @click.prevent="removeGalleryImage(index)"><IconsDeleteFill /></span>
            <span class="thumb__move"><IconsMove /></span>
          </div>
          <span class="thumb__index">{{ index + 1 }}</span>
          <div class="thumb__tooltip">{{ image.name }}</div>
        </div>
      </div>
    </div>
    <div class="gallery">
      <div class="thumbs">
        <div
          class="featured-image images thumb shadow-md relative"
          @drop="prodState.selectedItem.featuredImage = props.gallery[pickIndex]"
          @dragover.prevent
        >
          <div class="header">
            <p class="title">Featured Iage</p>
            <IconsClose />
          </div>
          <div class="image">
            <img
              v-if="prodState.selectedItem.featuredImage"
              :src="prodState.selectedItem.featuredImage.path"
              :alt="`${prodState.selectedItem.featuredImage.name} Photo`"
            />
          </div>
        </div>

        <div
          class="thumb-image images thumb shadow-md relative"
          @drop="prodState.selectedItem.thumbImage = props.gallery[pickIndex]"
          @dragover.prevent
        >
          <div class="header">
            <p class="title">Thumbnail</p>
            <IconsClose />
          </div>
          <div class="image">
            <img
              v-if="prodState.selectedItem.thumbImage"
              :src="prodState.selectedItem.thumbImage.path"
              :alt="`${prodState.selectedItem.thumbImage.name} Photo`"
            />
          </div>
        </div>
        <div
          class="body-bg-image images thumb shadow-md relative"
          @drop="prodState.selectedItem.bodyBgImage = props.gallery[pickIndex]"
          @dragover.prevent
        >
          <div class="header">
            <p class="title">Bg.Image</p>
            <IconsClose />
          </div>
          <div class="image">
            <img
              v-if="prodState.selectedItem.bodyBgImage"
              :src="prodState.selectedItem.bodyBgImage.path"
              :alt="`${prodState.selectedItem.bodyBgImage.name} Photo`"
            />
          </div>
        </div>
        <div
          class="attributes-image images thumb shadow-md relative"
          @drop="prodState.selectedItem.attributesImage = props.gallery[pickIndex]"
          @dragover.prevent
        >
          <div class="header">
            <p class="title">Attrs. Image</p>
            <IconsClose />
          </div>
          <div class="image">
            <img
              v-if="prodState.selectedItem.attributesImage"
              :src="prodState.selectedItem.attributesImage.path"
              :alt="`${prodState.selectedItem.attributesImage.name} Photo`"
            />
          </div>
        </div>
        <div
          class="recipe-image images thumb shadow-md relative"
          @drop="prodState.selectedItem.recipeImage = props.gallery[pickIndex]"
          @dragover.prevent
        >
          <div class="header">
            <p class="title">Recipe Image</p>
            <IconsClose />
          </div>
          <div class="image">
            <img
              v-if="prodState.selectedItem.recipeImage"
              :src="prodState.selectedItem.recipeImage.path"
              :alt="`${prodState.selectedItem.recipeImage.name} Photo`"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.admin-image-gallery {
  .gallery {
    max-width: 50rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    .thumbs {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1rem;
      padding: 2rem;
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

        &.images {
          position: relative;
          padding: 1rem 1rem 2rem 1rem;

          // flex-direction: column;
          // gap: 2rem;
          // border: 1px solid red;

          &:first-child {
            grid-column: span 2 / span 2;
            grid-row: span 2 / span 2;
          }

          .header {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            font-size: 1.1rem;
            background-color: $slate-200;
            padding: 0.5rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            svg {
              cursor: pointer;
              width: 1.5rem;
              height: 1.5rem;
            }
          }

          img {
            transform: translateY(2rem);
          }
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        &__delete {
          position: absolute;
          top: 1rem;
          right: 1rem;
          opacity: 0;
          visibility: hidden;

          svg {
            fill: $slate-50;
          }
        }

        &__move {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          visibility: hidden;

          svg {
            fill: $slate-50;
          }
        }

        &__index {
          position: absolute;
          top: 2%;
          left: 2%;
          transform: translate(-50%, -50%);
          background-color: $slate-600;
          width: 1.5rem;
          height: 1.5rem;
          color: $slate-50;
          border-radius: 50%;
          font-size: x-small;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        &__tooltip {
          position: absolute;
          top: -1.5rem;
          left: 50%;
          transform: translate(-50%, -100%);
          background-color: $slate-600;
          display: grid;
          grid-template-columns: minmax(max-content, 40rem);
          color: white;
          padding: 1rem 2rem;
          border-radius: 5px;
          font-weight: 500;
          opacity: 0;
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
          background-color: $slate-500;

          img {
            opacity: 0.1;
          }

          .thumb__tooltip,
          .thumb__delete,
          .thumb__move {
            opacity: 1;
            visibility: visible;
          }
        }

        &.over {
          opacity: 0.3;
          border: 2px dashed $slate-600;
        }

        &.featured-image,
        &.body-bg-image,
        &.attributes-image,
        &.recipe-image,
        &.thumb-image {
          // border: 1px solid red;
          min-width: 10rem;
          min-height: 10rem;
        }
      }
    }
  }

  // .featured-image {
  //   min-height: 10rem;
  //   min-width: 1orem;
  //   border: 1px solid red;
  // }
}
</style>
