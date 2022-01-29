<script setup>
const prodState = inject('prodState')
const handleMediaSelectorClick = inject('handleMediaSelectorClick')
// const imageGallery = inject('imageGallery')
// const fetchGallery = inject('fetchGallery')
const draggableElements = ref([])

const pickIndex = ref(null)
const dropIndex = ref(null)

// const showMediaSelector = ref(false) // media selector toggler
// const mediaReference = ref({}) // sets which media to update once a selection is made

// const handleMediaSelectorClick = (payload) => {
// 	showMediaSelector.value = true
// 	console.log(payload)
// 	mediaReference.value = payload
// }

// const processSelectedMedia = (media) => {
// 	console.log('media', media)
// 	console.log('reference', mediaReference.value)
// 	showMediaSelector.value = false
// 	media = media.filter((el) => el.mimetype.includes('image'))
// 	if (mediaReference.value.image === 'variant')
// 		prodState.selectedItem.variants[mediaReference.value.index].featuredImage = media[0]

// 	if (mediaReference.value.image === 'featuredImage') prodState.selectedItem.featuredImage = media[0]

// 	if (mediaReference.value.image === 'gallery')
// 		for (const prop in media) {
// 			// console.log('kkkkkk', prop, media[prop])
// 			const index = prodState.selectedItem.gallery.findIndex((el) => el._id === media[prop]._id)
// 			// console.log('index', index)
// 			if (index === -1) prodState.selectedItem.gallery.push(media[prop])
// 		}
// }

const removeGalleryImage = (index) => {
  prodState.selectedItem.gallery.splice(index, 1)
}

const handleDragstart = (event, index) => {
  pickIndex.value = index
  event.target.closest('.thumb').classList.remove('hovered')
}

const handleDragend = (event, index) => {
  for (const prop in draggableElements.value) {
    // console.log(draggableElements.value[prop].closest('.thumb'))
    if (draggableElements.value[prop]) draggableElements.value[prop].closest('.thumb').classList.remove('hovered')
  }
}

const handleDragover = (event, index) => {
  event.target.closest('.thumb').classList.add('over')
}

const handleDragenter = (event, index) => {}

const handleDragleave = (event) => {
  event.target.closest('.thumb').classList.remove('over')
}
const handleDrop = async (event, index) => {
  // console.log(pickIndex.value, index)
  const pickedElement = prodState.selectedItem.gallery[pickIndex.value]
  const droppedElement = prodState.selectedItem.gallery[index]
  // console.log(pickedElement, droppedElement)
  prodState.selectedItem.gallery[pickIndex.value] = droppedElement
  prodState.selectedItem.gallery[index] = pickedElement
  event.target.closest('.thumb').classList.remove('over')
  // await fetchGallery()
}
</script>

<template>
  <div class="image-gallery shadow-md" id="image-gallery">
    <header class="admin-section-header">Images</header>
    <div class="wrapper">
      <div class="info flex-cc gap-1">
        <IconsInfo />
        <p>This image gallery contains all images associated with this product including its attached variants.</p>
      </div>
      <div class="gallery">
        <div class="thumbs container" v-if="prodState.selectedItem.gallery">
          <div
            class="thumb shadow-md relative"
            v-for="(image, index) in prodState.selectedItem.gallery"
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
      </div>
      <button class="btn btn-primary" @click.prevent="handleMediaSelectorClick({ image: 'gallery', index: null })">
        <IconsImage />
        <span> Select Images </span>
      </button>
      <!-- <div class="media-selector" v-if="showMediaSelector">
      <MediaUploader @mediaSelected="processSelectedMedia" @mediaSelectCancel="showMediaSelector = false" />
    </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.image-gallery {
  background-color: white;
  border-radius: 5px;
  padding: 2rem 2rem;

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    .info {
      width: 90%;
      background-color: $sky-100;
      border: 1px solid $sky-400;
      border-radius: 5px;
      padding: 1rem 2rem;
      font-size: 80%;

      svg {
        width: 3rem;
        height: 3rem;
        fill: $sky-600;
      }
    }

    .gallery {
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
    }
    .btn {
      // align-self: center;
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
  // .media-selector {
  // 	position: fixed;
  // 	inset: 0;
  // 	background-color: $slate-200;
  // 	z-index: 9999;
  // 	// fixed top-0 left-0 w-full bg-slate-600
  // }
}
</style>
