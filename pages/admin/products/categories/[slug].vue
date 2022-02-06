<script setup>
import slugify from 'slugify'
const route = useRoute()
const router = useRouter()

// Import categories
const { state, actions } = useFactory('categories')

const showMediaSelector = ref(false) // media selector toggler
const mediaReference = ref({}) // sets which media to update once a selection is made
const showSubCategorySlideout = ref(false)
const subCategory = ref({
  gallery: [],
})

// Set product filters
// state.query.slug = route.params.slug
state.query.populate = 'parent gallery'

// fetch product, categories, attributes and attribute terms
await actions.fetchAll()

const found = state.items.find((c) => c.slug == route.params.slug)
if (found) {
  state.selectedItem = found
} else {
  state.selectedItem = {
    name: '',
    slug: computed(() => slugify(state.selectedItem.name, { lower: true })),
    permalink: computed(() => slugify(state.selectedItem.name, { lower: true })),
    gallery: [],
  }
}

const currentCategory = JSON.stringify(state.selectedItem)

////////

// Fetch category based on slug
state.query.populate = 'parent'
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
      const index = state.selectedItem.gallery.findIndex((el) => el._id === media[prop]._id)
      if (index === -1) {
        state.selectedItem.gallery.push(media[prop])
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
const saveCategory = async () => {
  if (currentCategory !== JSON.stringify(state.selectedItem)) {
    const newCategory = await actions.saveItem()
    if (!state.errorMsg) router.push({ name: 'admin-products-categories-slug', params: { slug: newCategory.slug } })
  }
}
// const saveSubCategory = async () => {
//   if (currentCategory !== JSON.stringify(state.selectedItem)) {
//     const newCategory = await actions.saveItem()
//     if (!state.errorMsg)
//     router.push({ name: 'admin-products-categories-slug', params: { slug: newCategory.slug } })
//   }
// }

provide('state', state)
provide('actions', actions)
provide('showSubCategorySlideout', showSubCategorySlideout)
</script>

<script>
export default {
  layout: 'admin',
}
</script>

<template>
  <div class="category-details">
    <Html>
      <Head><Title>Category</Title></Head>
    </Html>

    <NuxtLink class="link" :to="{ name: 'admin-products-categories' }">
      <IconsArrowWest /><span>Category</span>
    </NuxtLink>

    <pre>    {{ state.selectedItem }}</pre>

    <h3 class="header">Edit Category</h3>
    <div class="columns">
      <div class="left">
        <ProductsAdminCategoryDetails />
        <section class="category-image-gallery shadow-md" id="image-gallery">
          <header class="admin-section-header">Image Gallery</header>
          <div class="content">
            <div class="intro">
              <IconsInfo />
              <p>
                This image gallery contains all images associated with this product including its attached variants.
              </p>
            </div>
            <ProductsAdminCategoryImageGallery
              :gallery="state.selectedItem.gallery"
              v-if="state.selectedItem.gallery.length"
            />
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
        <!-- <ProductsAdminPrice /> -->
        <!-- <ProductsAdminProductImageGallery /> -->
      </div>

      <div class="right">
        <ProductsAdminCategoryRightNav @saveCategory="saveCategory" />
      </div>
    </div>
    <div class="media-selector" v-if="showMediaSelector">
      <LazyMediaUploader
        @mediaSelected="processSelectedMedia"
        @mediaSelectCancel="showMediaSelector = false"
        v-if="showMediaSelector"
      />
    </div>
    <ProductsAdminCategorySubCategory />
    <!-- <Slideout :showSlideout="showSubCategorySlideout">
      <template v-slot:header>
        <div class="header shadow-md">
          <h3 class="title">Add sub-category</h3>
          <button class="btn close"><IconsClose @click.prevent="showSubCategorySlideout = false" /></button>
        </div>
      </template>
      <div class="main">
        <h3>Details</h3>
        <div class="name-permalink">
          <div class="name">
            <FormsBaseInput label="Name" placeholder="Name" required v-model="subCategory.name" />
          </div>
          <div class="permalink">
            <FormsBaseInput label="Permalink" placeholder="Permalink" v-model="subCategory.permalink" />
          </div>
        </div>
        <div class="base-textarea">
          <textarea v-model="subCategory.description" label="Description" placeholder="Description" rows="5"></textarea>
          <label>Description</label>
        </div>
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
            <button class="btn btn-primary save" @click.prevent="saveSubCategory">Save Changes</button>
          </div>
        </div>
      </template>
    </Slideout> -->
    <!-- <form @submit.prevent="save">
      <h2></h2>
      {{ state.selectedItem }}==== {{ state.items }}
      <div class="inputs">
        <FormsBaseInput
          type="text"
          label="Name"
          v-model="state.selectedItem.name"
          :required="true"
          minlength="3"
          maxlength="25"
          hint="Enter a valid category name"
        />
        <FormsBaseSelect
          label="Parent Category"
          :options="
            route.params.slug != ' '
              ? state.items.filter(
                  (el) =>
                    // el.slug !== route.params.slug ||
                    (!el.parent && el.slug !== route.params.slug) ||
                    (el.parent && el.parent._id != state.selectedItem._id)
                )
              : state.items
          "
          v-model="state.selectedItem.parent"
        />
      </div>
      <div class="actions">
        <button class="btn submit primary" v-if="!state.selectedItem.slug">Create Category</button>
        <button class="btn submit primary" v-else>Update Category</button>
        <button class="btn submit outline" @click.prevent="handleCancel">Cancel</button>
      </div>
    </form> -->
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.category-details {
  width: 100%;
  max-width: 1280px;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

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
