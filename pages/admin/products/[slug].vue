<script setup>
import { useError } from '~/pinia/useError';
// import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';

const appError = useError();
const router = useRouter();
const route = useRoute();

// const enabled = ref(false);

// Import products, categories, attributes, atterbute terms and variants state and actions
const { state: prodState, actions: prodActions } = useFactory('products');
const { state: catState, actions: catActions } = useFactory('categories');
const { state: attState, actions: attActions } = useFactory('attributes');
const { state: attTermsState, actions: attTermsActions } = useFactory('attributeterms');
const { state: variantState, actions: variantActions } = useFactory('variants');

const showMediaSelector = ref(false); // media selector toggler
const mediaReference = ref({}); // sets which media to update once a selection is made
const productDataTabs = ref([
  { key: 'general', title: 'General', open: true },
  { key: 'attributes', title: 'Attribute', open: false },
  { key: 'variants', title: 'Variants', open: false },
]);

const nav = ref([
  { key: 'details', title: 'Details', open: true },
  { key: 'price', title: 'Price', open: false },
  { key: 'variants', title: 'Variants', open: false },
]);

provide('prodState', prodState);
provide('catState', catState);
provide('attState', attState);
provide('attTermsState', attTermsState);
provide('showMediaSelector', showMediaSelector.value);

// Set product filters
prodState.query.slug = route.params.slug;
prodState.query.populate =
  'featuredImage gallery categories attributes attributes.item attributes.terms attributes.defaultTerm';

// fetch product, categories, attributes and attribute terms
await Promise.all([prodActions.fetchAll(), catActions.fetchAll(), attActions.fetchAll(), attTermsActions.fetchAll()]);

// Set selected product (create or edit)
prodState.selectedItem = prodState.items.length
  ? prodState.items[0]
  : {
      // name: 'Hello',
      type: 'simple',
      attributes: [],
      categories: [],
      gallery: [],
      taxStatus: 'none',
      taxClass: 'standard',
      allowBcakOrder: 'notify',
    };

// Fetch product variants if any
variantState.query.populate = 'attrTerms featuredImage';
variantState.query.product = prodState.selectedItem._id;
if (variantState.query.product) await variantActions.fetchAll();

prodState.selectedItem.variants = variantState.items || [];
// prodState.selectedItem.attributes = variantState.items || []

if (prodState.selectedItem._id) {
}

const handleCancel = async () => {
  router.push({ name: 'admin-products' });
};

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
</script>

<script>
export default {
  layout: 'admin',
};
</script>

<template>
  <div class="product-detail py-4 px-4 space-y-4 bg-slate-100 text-slate-500 text-sm">
    <!-- <pre class="text-sm">{{ prodState.selectedItem }}</pre> -->
    <!-- <pre class="text-sm">{{ cart.cart }}</pre> -->
    <!-- <div>
      <NuxtLink class="flex gap-1 items-center" :to="{ name: 'admin-products' }">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
        <span class="">Products</span>
      </NuxtLink>
      <h2 class="text-2xl text-slate-800">Edit Product</h2>
      <div class="flex gap-4">
        <div class="w-1/5 shadow-lg bg-white rounded py-4 px-2">
          <nav>
            <ul>
              <li
                class="hover:bg-slate-100 px-2 py-1 rounded transition duration-200"
                v-for="navItem in nav"
                :key="navItem"
              >
                <a :href="`#${navItem.key}`">{{ navItem.title }}</a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="flex-1 border shadow-lg bg-white rounded py-4 px-4">
          <div>
            <header class="mb-4">Details</header>
            <div class="space-y-4">
              <FormsBaseInput label="Name" />
              <div class="flex gap-4 items-center">
                <FormsBaseInput label="SKU" />
                <div class="border border-gray-300 py-2 px-4 rounded-md">
                  <SwitchGroup>
                    <div class="flex items-center">
                      <SwitchLabel class="mr-4">Manage Inventory</SwitchLabel>
                      <Switch
                        v-model="prodState.selectedItem.manageInventory"
                        :class="prodState.selectedItem.manageInventory ? 'bg-slate-900' : 'bg-slate-700'"
                        class="relative inline-flex items-center h-6 rounded-full w-11"
                      >
                        <transition
                          enter-active-class="transition duration-1000 ease-in-out"
                          leave-active-class="transition duration-1000 ease-in-out"
                        >
                          <span
                            :class="prodState.selectedItem.manageInventory ? 'translate-x-6' : 'translate-x-1'"
                            class="inline-block w-4 h-4 transform bg-white rounded-full"
                          />
                        </transition>
                      </Switch>
                    </div>
                  </SwitchGroup>
                </div>
              </div>
              <FormsBaseInput label="Description" />
            </div>
          </div>
        </div>
        <div class="w-1/4 border shadow-lg bg-white rounded py-4 px-4">
          <div class="space-y-4">
            <button class="btn btn-primary w-full">Save Changes</button>
            <div class="">
              <SwitchGroup>
                <div class="flex items-center">
                  <SwitchLabel class="mr-4">Active</SwitchLabel>
                  <Switch
                    v-model="prodState.selectedItem.manageInventory"
                    :class="prodState.selectedItem.manageInventory ? 'bg-slate-900' : 'bg-slate-700'"
                    class="relative inline-flex items-center h-6 rounded-full w-11"
                  >
                    <transition
                      enter-active-class="transition duration-1000 ease-in-out"
                      leave-active-class="transition duration-1000 ease-in-out"
                    >
                      <span
                        :class="prodState.selectedItem.manageInventory ? 'translate-x-6' : 'translate-x-1'"
                        class="inline-block w-4 h-4 transform bg-white rounded-full"
                      />
                    </transition>
                  </Switch>
                </div>
              </SwitchGroup>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <div class="product-data flex mt-6">
      <ProductsAdminSidebar :productDataTabs="productDataTabs" @tabSelected="handleSelectTab" />
      <div class="main border border-green-400">
        <div class="general" v-show="productDataTabs.filter((el) => el.key === 'general')[0].open == true">
          <ProductsAdminGeneralPanel />
        </div>
        <div class="attributes" v-show="productDataTabs.filter((el) => el.key === 'attributes')[0].open == true">
          <ProductsAdminAttributesPanel />
        </div>
        <div class="variants" v-show="productDataTabs.filter((el) => el.key === 'variants')[0].open == true">
          <ProductsAdminVariantsPanel @mediaSelectorClicked="handleMediaSelectorClick" />
        </div>
      </div>

      <form class="" @submit.prevent="save">
        <div class="product-detail__columns grid grid-cols-4 gap-4">
          <div class="product-detail__columns-left col-span-3 border border-blue-400">
            <ProductsAdminCommon />
            <div class="product-data flex mt-6">
              <ProductsAdminSidebar :productDataTabs="productDataTabs" @tabSelected="handleSelectTab" />
              <div class="main border border-green-400">
                <div class="general" v-show="productDataTabs.filter((el) => el.key === 'general')[0].open == true">
                  <ProductsAdminGeneralPanel />
                </div>
                <div
                  class="attributes"
                  v-show="productDataTabs.filter((el) => el.key === 'attributes')[0].open == true"
                >
                  <ProductsAdminAttributesPanel />
                </div>
                <div class="variants" v-show="productDataTabs.filter((el) => el.key === 'variants')[0].open == true">
                  <ProductsAdminVariantsPanel @mediaSelectorClicked="handleMediaSelectorClick" />
                </div>
              </div>
            </div>
          </div>
          <div class="product-detail__columns-right border border-orange-400">
            <div class="action">
              <button class="btn submit primary" v-if="!prodState.selectedItem._id">Create Product</button>
              <button class="btn submit primary" v-else>Update Product</button>
              <button class="btn submit outline" @click.prevent="handleCancel">Cancel</button>
            </div>
            <ProductsAdminCategoriesNTags />
            <div class="media flex">
              <ProductsAdminMedia @mediaSelectorClicked="handleMediaSelectorClick" />
            </div>
          </div>
        </div>
      </form>

      <div class="media-selector fixed top-0 left-0 w-full bg-slate-600" v-if="showMediaSelector">
        <MediaUploader @mediaSelected="processSelectedMedia" @mediaSelectCancel="showMediaSelector = false" />
      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
// .product-details {
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
//   padding: 2rem;
//   background-color: rgba(225, 245, 254, 0.3);

//   &__header {
//     font-size: 120%;
//   }

//   &__columns {
//     display: grid;
//     grid-template-columns: 20rem 1fr 20rem;
//     gap: 2rem;

//     &-left {
//       // border: 1px solid red;
//       grid-column: 1 / 2;
//       background-color: #fff;

//       ul {
//         li {
//           border-bottom: 1px solid #ddd;
//           padding: 1rem;
//           cursor: pointer;
//           color: #42a5f5;
//         }
//       }
//     }

//     &-middle {
//       border: 1px solid red;
//       grid-column: 2 / 3;

//       .attributes {
//         .attribute {
//           .content {
//             .row {
//               display: flex;
//               gap: 2rem;
//               .values {
//                 flex: 1;
//                 border: 1px solid red;
//                 .options {
//                   display: flex;
//                   gap: 1rem;

//                   .option {
//                     display: flex;
//                     gap: 1rem;
//                     background-color: #ddd;
//                     padding: 0.5rem;

//                     .remove {
//                       color: #fff;
//                       background-color: #ccc;
//                       cursor: pointer;
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }

//       .variants {
//         // .actions {
//         // }

//         .content {
//           .variant {
//             border: 1px solid teal;
//             background-color: #fff;

//             .header {
//               display: flex;
//               gap: 2rem;
//               padding: 1rem;
//             }
//             .content {
//               .row {
//                 display: flex;
//                 justify-content: space-between;
//                 align-items: center;
//                 gap: 4rem;
//                 padding: 2rem;

//                 .image {
//                   width: 7rem;
//                   height: 7rem;
//                   overflow: hidden;
//                   border: 1px solid red;

//                   img {
//                     width: 100%;
//                     height: 100%;
//                     object-fit: contain;
//                   }
//                 }

//                 .flex1 {
//                   flex: 1;

//                   &.multiple {
//                     display: flex;
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }

//     &-right {
//       border: 1px solid red;

//       grid-column: 3 / 4;
//     }
//   }

//   form {
//     .info {
//       display: grid;
//       grid-template-columns: 1fr 1fr;
//       gap: 2rem;
//       .media {
//         grid-column: 1 / 2;
//         display: flex;
//         flex-direction: column;
//         gap: 2rem;

//         .featured-image {
//           box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

//           img {
//             width: 100%;
//             object-fit: cover;
//           }
//         }

//         .gallery {
//           .images {
//             // border: 1px solid red;
//             display: flex;
//             gap: 2rem;
//             // justify-content: center;
//             align-items: center;
//             .thumb {
//               border: 1px solid #ddd;
//               padding: 0.2rem;
//               position: relative;
//               width: 10rem;
//               height: 10rem;

//               img {
//                 height: 100%;
//                 width: 100%;
//                 object-fit: cover;
//               }

//               .badge {
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 position: absolute;
//                 top: 0;
//                 right: 0;
//                 transform: translate(1rem, -1rem);
//                 border-radius: 50%;
//                 background-color: red;
//                 color: #fff;
//                 width: 2rem;
//                 height: 2rem;
//                 cursor: pointer;
//               }
//             }
//           }
//         }
//       }

//       .details {
//         grid-column: 2 / 3;
//         box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
//         // padding: 1rem;

//         .title {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           font-size: 2rem;
//           background-color: #b3e5fc;
//           padding: 1rem;
//         }

//         .average-rating {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           padding: 1rem;
//         }

//         // ul {
//         //   li {
//         //     // display: flex;
//         //     // justify-content: space-between;
//         //     // border-bottom: 1px solid #ddd;
//         //     // padding: 1rem;

//         //     // &.price {
//         //     //   border-top: 1px solid #ddd;
//         //     // }
//         //   }
//         // }

//         .actions {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 1rem;

//           .btn {
//             display: flex;
//             flex-direction: column;
//             justify-content: space-between;
//             align-items: center;
//             font-size: 1rem;
//             background-color: transparent;
//           }
//         }
//       }
//     }

//     form {
//       // .gallery {
//       //   .images {
//       //     // border: 1px solid red;
//       //     display: flex;
//       //     gap: 1rem;
//       //     // justify-content: center;
//       //     align-items: center;
//       //     .image {
//       //       // border: 1px solid red;
//       //       position: relative;
//       //       width: 10rem;
//       //       height: 10rem;

//       //       img {
//       //         height: 100%;
//       //         width: 100%;
//       //         object-fit: cover;
//       //       }

//       //       .badge {
//       //         display: flex;
//       //         justify-content: center;
//       //         align-items: center;
//       //         position: absolute;
//       //         top: 0;
//       //         right: 0;
//       //         transform: translate(1rem, -1rem);
//       //         border-radius: 50%;
//       //         background-color: red;
//       //         color: #fff;
//       //         width: 2rem;
//       //         height: 2rem;
//       //         cursor: pointer;
//       //       }
//       //     }
//       //   }
//       // }

//       .featured-image {
//         .image {
//           border: 1px solid red;

//           width: 20rem;
//           height: 20rem;
//           img {
//             height: 100%;
//             width: 100%;
//             object-fit: cover;
//           }
//         }
//       }
//     }
//   }

//   .media-selector {
//     position: fixed;
//     top: 0;
//     left: 0;
//     background-color: rgba(0, 0, 0, 0.8);
//     width: 100vw;
//     height: 100vh;
//     padding: 1rem;
//   }

//   // .slide-enter-active,
//   // .slide-leave-active {
//   //   transition: all 0.5s ease-in-out;
//   // }
// }
</style>
