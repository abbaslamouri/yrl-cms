<script setup>
const prodState = inject('prodState');

const showMediaSelector = ref(false); // media selector toggler
const mediaReference = ref({}); // sets which media to update once a selection is made
const draggableElements = ref([]);

const handleMediaSelectorClick = (payload) => {
  showMediaSelector.value = true;
  console.log(payload);
  mediaReference.value = payload;
};

const processSelectedMedia = (media) => {
  console.log('media', media);
  console.log('reference', mediaReference.value);
  showMediaSelector.value = false;
  media = media.filter((el) => el.mimetype.includes('image'));
  if (mediaReference.value.image === 'variant')
    prodState.selectedItem.variants[mediaReference.value.index].featuredImage = media[0];

  if (mediaReference.value.image === 'featuredImage') prodState.selectedItem.featuredImage = media[0];

  if (mediaReference.value.image === 'gallery')
    for (const prop in media) {
      // console.log('kkkkkk', prop, media[prop])
      const index = prodState.selectedItem.gallery.findIndex((el) => el._id === media[prop]._id);
      // console.log('index', index)
      if (index === -1) prodState.selectedItem.gallery.push(media[prop]);
    }
};

const handleSelectTab = (tabKey) => {
  // console.log(tabKey)
  for (const prop in productDataTabs.value) {
    // console.log(prop, productDataTabs.value[prop])
    if (productDataTabs.value[prop].key == tabKey) productDataTabs.value[prop].open = true;
    else productDataTabs.value[prop].open = false;
  }
};

const save = async () => {
  if (
    prodState.selectedItem.type === 'variable' &&
    (!prodState.selectedItem.variants || !prodState.selectedItem.variants.length)
  ) {
    appError.setSnackbar(
      true,
      `Variable products must have at least one variant.  Please add variants or change product type to "simple"`,
      'error',
      5
    );
    return;
  }

  if (!prodState.selectedItem.customSlug) prodState.selectedItem.customSlug = prodState.selectedItem.slug;
  prodState.selectedItem.categories = prodState.selectedItem.categories.map((el) => el._id);
  prodState.selectedItem.gallery = prodState.selectedItem.gallery.map((el) => el._id);
  prodState.selectedItem.attributes = prodState.selectedItem.attributes.map((el) => {
    return {
      defaultTerm: el.defaultTerm._id,
      item: el.item._id,
      terms: el.terms && el.terms.length ? el.terms.map((t) => t._id) : [],
    };
  });

  let i = 0;
  while (i < prodState.selectedItem.variants.length) {
    prodState.selectedItem.variants[i].attrTerms = prodState.selectedItem.variants[i].attrTerms.map((el) => el._id);
    if (prodState.selectedItem.variants[i].featuredImage)
      prodState.selectedItem.variants[i].featuredImage = prodState.selectedItem.variants[i].featuredImage._id;
    i++;
  }

  console.log('PRD', prodState.selectedItem);
  const product = await prodActions.saveItem();
  if (!prodState.errorMsg) {
    // delete existing variants
    await variantActions.deleteMany({ product: product._id });
    if (!variantState.errorMsg) {
      // save new variants
      variantState.selectedItems = prodState.selectedItem.variants;
    }
    // variantState.selectedItem = prodState.selectedItem.variants
    // console.log('VAR', variantState.selectedItem)
    i = 0;
    // console.log(variantState.selectedItem.length)
    while (i < variantState.selectedItems.length) {
      // console.log('PI', product._id)
      variantState.selectedItems[i].product = product._id;
      // console.log('I', variantState.selectedItem[i])

      i++;
    }
    console.log(await variantActions.saveMany());
    if (!variantState.errorMsg) router.push({ name: 'admin-products' });
  }
};

const handleDragstart = (event, index) => {
  pickIndex.value = index;
  event.target.closest('.thumb').classList.remove('hovered');
};

const handleDragend = (event, index) => {
  for (const prop in draggableElements.value) {
    console.log(draggableElements.value[prop].closest('.thumb'));
    draggableElements.value[prop].closest('.thumb').classList.remove('hovered');
  }
};

const handleDragover = (event, index) => {
  event.target.closest('.thumb').classList.add('over');
};

const handleDragenter = (event, index) => {};

const handleDragleave = (event) => {
  event.target.closest('.thumb').classList.remove('over');
};
const handleDrop = (event, index) => {
  const pickedElement = prodState.selectedItem.gallery[pickIndex.value];
  const droppedElement = prodState.selectedItem.gallery[index];
  prodState.selectedItem.gallery[pickIndex.value] = droppedElement;
  prodState.selectedItem.gallery[index] = pickedElement;
  event.target.closest('.thumb').classList.remove('over');
};
</script>

<template>
  <div class="image-gallery shadow-md">
    <header class="admin-section-header">Images</header>
    <div class="image-gallery">
      <div class="thumbs container">
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
            <span class="delete" @click.prevent="removeGalleryImage(image._id)"><IconsDeleteFill /></span>
            <span class="move"><IconsMove /></span>
          </div>
          <span class="index">{{ index + 1 }}</span>
          <div class="tooltip">{{ image.name }}</div>
        </div>
      </div>
      <button class="btn btn-primary" @click.prevent="handleMediaSelectorClick({ image: 'gallery', index: null })">
        <IconsImage />
        <span> Select Images </span>
      </button>
    </div>
    <div class="media-selector" v-if="showMediaSelector">
      <MediaUploader @mediaSelected="processSelectedMedia" @mediaSelectCancel="showMediaSelector = false" />
    </div>
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
  .media-selector {
    position: fixed;
    inset: 0;
    background-color: $slate-200;
    z-index: 9999;
    // fixed top-0 left-0 w-full bg-slate-600
  }
}
</style>
