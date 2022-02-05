<script setup>
import slugify from 'slugify'

const state = inject('state')
const actions = inject('actions')
const showSubCategorySlideout = inject('showSubCategorySlideout')

const route = useRoute()
const router = useRouter()

// Import categories
// const { state, actions } = useFactory('categories')

const showMediaSelector = ref(false) // media selector toggler
const mediaReference = ref({}) // sets which media to update once a selection is made
// const showSubCategorySlideout = ref(false)
const subCategory = ref({
  name: '',
  parent: state.selectedItem._id,
  slug: computed(() => slugify(subCategory.value.name, { lower: true })),
  permalink: computed(() => slugify(subCategory.value.name, { lower: true })),
  gallery: [],
})

// Set product filters
// state.query.slug = route.params.slug
// state.query.populate = 'parent gallery'

// fetch product, categories, attributes and attribute terms
// await actions.fetchAll()

// if (state.items.length) {
//   state.selectedItem = state.items[0]
// } else {
//   state.selectedItem = {
//     name: '',
//     slug: computed(() => slugify(state.selectedItem.name, { lower: true })),
//     permalink: computed(() => slugify(state.selectedItem.name, { lower: true })),
//     gallery: [],
//   }
// }

// const currentCategory = JSON.stringify(state.selectedItem)

////////

// Fetch category based on slug
// state.query.populate = 'parent'
// await actions.fetchAll()
// state.selectedItem =
//   route.params.slug !== ' ' ? state.items.filter((el) => el.slug === route.params.slug)[0] : { name: '', gallery: [] }

// Show media selector
const handleMediaSelectorClick = (payload) => {
  showMediaSelector.value = true
  mediaReference.value = payload
}
// Set media ince selection is made
const processSelectedMedia = async (media) => {
  console.log(mediaReference.value)
  showMediaSelector.value = false
  media = media.filter((el) => el.mimetype.includes('image'))

  if (mediaReference.value.image === 'gallery') {
    for (const prop in media) {
      const index = subCategory.value.gallery.findIndex((el) => el._id === media[prop]._id)
      if (index === -1) {
        subCategory.value.gallery.push(media[prop])
      }
    }
  }
}

// const save = async () => {
//   await actions.saveItem()
//   if (!state.errorMsg) router.push({ name: 'admin-products-categories' })
// }

// const handleCancel = async () => {
//   router.push({ name: 'admin-products-categories' })
// }
// const saveCategory = async () => {
//   if (currentCategory !== JSON.stringify(state.selectedItem)) {
//     const newCategory = await actions.saveItem()
//     if (!state.errorMsg) router.push({ name: 'admin-products-categories-slug', params: { slug: newCategory.slug } })
//   }
// }
const saveSubCategory = async () => {
  await actions.savePayload(subCategory.value)
  if (!state.errorMsg) {
    showSubCategorySlideout.value = false
    // state.items.push(newCategory)
    router.go()
    // router.push({ name: 'admin-products-categories-slug', params: { slug: state.selectedItem.slug }, force: true })
  }
}
</script>

<script>
export default {
  layout: 'admin',
}
</script>

<template>
  <div class="sub-category-details">
    <Slideout :showSlideout="showSubCategorySlideout">
      <template v-slot:header>
        <div class="header shadow-md">
          <h3 class="title">Add sub-category</h3>
          <button class="btn close"><IconsClose @click.prevent="showSubCategorySlideout = false" /></button>
        </div>
      </template>
      <div class="main">
        <h3>Details</h3>
        <section class="details shadow-md" id="details">
          <header class="admin-section-header">Details</header>
          <div class="content">
            <div class="name-permalink">
              <div class="name">
                <FormsBaseInput label="Name" placeholder="Name" required v-model="subCategory.name" />
              </div>
              <div class="permalink">
                <FormsBaseInput label="Permalink" placeholder="Permalink" v-model="subCategory.permalink" />
              </div>
            </div>
            <div class="base-textarea">
              <textarea
                v-model="subCategory.description"
                label="Description"
                placeholder="Description"
                rows="5"
              ></textarea>
              <label>Description</label>
            </div>
          </div>
        </section>
        <section class="category-image-gallery shadow-md" id="image-gallery">
          <header class="admin-section-header">Image Gallery</header>
          <div class="content">
            <div class="intro">
              <IconsInfo />
              <p>
                This image gallery contains all images associated with this product including its attached variants.
              </p>
            </div>
            <ProductsAdminCategoryImageGallery :gallery="subCategory.gallery" v-if="subCategory.gallery.length" />
            <button
              class="btn btn-image-select"
              @click.prevent="handleMediaSelectorClick({ image: 'gallery', index: null })"
            >
              <IconsImage />
              <span> Select Images </span>
            </button>
            <p>PNG, JPG, and GIF Accepted</p>
          </div>
        </section>
      </div>
      <template v-slot:footer>
        <div class="footer shadow-md">
          <div class="actions">
            <button class="btn btn-secondary cancel" @click="showSubCategorySlideout = false">Cancel</button>
            <button class="btn btn-primary save" @click.prevent="saveSubCategory">Save and Close</button>
          </div>
        </div>
      </template>
      <div class="media-selector" v-if="showMediaSelector">
        <LazyMediaUploader
          @mediaSelected="processSelectedMedia"
          @mediaSelectCancel="showMediaSelector = false"
          v-if="showMediaSelector"
        />
      </div>
    </Slideout>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.sub-category-details {
  width: 100%;
  max-width: 1280px;
  min-height: 100vh;
  padding: 2rem;

  .main {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .details {
      background-color: white;
      border-radius: 5px;
      padding: 2rem 2rem 4rem;

      .content {
        display: flex;
        flex-direction: column;
        gap: 3rem;

        .name-permalink {
          display: flex;
          align-items: center;
          gap: 2rem;
          width: 100%;

          .name,
          .permalink {
            flex: 1;
          }
        }
      }
    }
    .category-image-gallery {
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
          font-size: 80%;

          svg {
            width: 3rem;
            height: 3rem;
            fill: $sky-600;
          }
        }
      }
    }
  }

  .footer {
    .actions {
      display: flex;
      align-items: center;
      gap: 2rem;

      .btn {
        padding: 1.5rem 3rem;
        letter-spacing: 0.15rem;
        border-radius: 5px;
        font-size: 1.2rem;
        border: none;
      }
    }
  }

  .link {
    display: flex;
    align-items: center;
    gap: 0.3rem;

    svg {
      width: 1.8rem;
      height: 1.8rem;
    }
  }

  .columns {
    display: grid;
    grid-template-columns: 1fr 30rem;
    gap: 2rem;
    align-items: flex-start;

    .left {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }

    .right {
      position: sticky;
      top: 10rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }

  .link {
    font-weight: 500;
    color: $slate-400;

    &:hover {
      color: $slate-800;
    }
  }
}
</style>
