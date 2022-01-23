<script setup>
const props = defineProps({
  // variant: Object,
  index: Number,
});

const prodState = inject('prodState');
const attState = inject('attState');

const showSlideout = ref(false);

const getAttribute = (attributeId) => {
  return prodState.selectedItem.attributes.filter((el) => el.item._id == attributeId)[0].item;
};

const getTerms = (attributeId) => {
  const terms = prodState.selectedItem.attributes.filter((el) => el.item._id == attributeId)[0].terms;
  return terms;
};

const removeVariant = () => {
  if (!confirm('Are you sure?')) return;
  prodState.selectedItem.variants.splice(props.index, 1);
};

const updateVariant = (attribute, termId) => {
  console.log('AT', attribute);
  // console.log(value)
  const term = attribute.terms.find((t) => t._id == termId);

  console.log('T', term);

  // if (!prodState.selectedItem.variants[props.index].attrTerms.length) {
  prodState.selectedItem.variants[props.index].attrTerms.push(term);
  // }
};
</script>

<!-- &&
      prodState.selectedItem.variants[index].attrTerms &&
      prodState.selectedItem.variants[index].attrTerms.length -->

<template>
  <div class="variants">
    <header class="admin-section-header">Variants</header>
    <div class="content">
      <div>Different types of this product (e.g. size, color)</div>
      <button class="btn btn-primary" @click="showSlideout = true">
        <IconsPlus />
        <span>Add</span>
      </button>
    </div>
    <Slideout :showSlideout="showSlideout">
      <template v-slot:header>
        <div class="header shadow-md">
          <h3 class="title">Edit Variants</h3>
          <button class="btn close"><IconsClose @click="showSlideout = false" /></button>
        </div>
      </template>
      <div class="main">
        <ProductsAdminEmptyVariantMsg
          v-if="!prodState.selectedItem.variants.length && !prodState.selectedItem.variantGroups.length"
        />
        <ProductsAdminVariantsPanel v-else />
      </div>
      <template v-slot:footer>
        <div class="footer shadow-md">
          <p>Here's some contact info</p>
        </div>
      </template>
    </Slideout>
  </div>
  <!-- <div class="variant space-y-4 border p-6" v-if="prodState.selectedItem.variants[index]">
    <div class="header bg-blue-100 flex gap-8 py-4 justify-between">
      <div class="flex gap-8 py-4 justify-between">
        <div
          class="flex gap-8 py-4 justify-between"
          v-for="attribute in prodState.selectedItem.attributes.filter((a) => a.terms && a.terms.length)"
          :key="attribute.item._id"
        >
          <div>
            {{ attribute.item.name }}
            <select @change="updateVariant(attribute, $event.target.value)">
              <option value="">Select Option</option>
              <option
                v-for="term in attribute.terms"
                :key="term._id"
                :value="term._id"
                :selected="prodState.selectedItem.variants[index].attrTerms.find((t) => t._id == term._id)"
              >
                {{ term.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div @click="removeVariant"><IconsDeleteFill /></div>
    </div>
    <div class="content space-y-4">
      <div class="row flex items-center justify-around">
        <div class="image w-20" @click="$emit('mediaSelectorClicked', { image: 'variant', index })">
          <img
            v-if="prodState.selectedItem.variants[index].featuredImage"
            :src="prodState.selectedItem.variants[index].featuredImage.path"
            alt="Variant Image"
          />
          <img v-else src="/placeholder.png" alt="Variant Image" />
        </div>
        <div class="flex1 sku">
          SKU
          <input class="bg-gray-300" type="text" v-model="prodState.selectedItem.variants[index].sku" />
        </div>
      </div>
      <div class="row flex items-center gap-10">
        <div><input type="checkbox" v-model="prodState.selectedItem.variants[index].enabled" />Enabled</div>
        <div><input type="checkbox" v-model="prodState.selectedItem.variants[index].virtual" />Virtual</div>
        <div><input type="checkbox" v-model="prodState.selectedItem.variants[index].downloadable" />downloadable</div>
      </div>
      <div class="row flex items-center justify-around">
        <div class="price">
          Price
          <input class="bg-gray-300" type="text" v-model="prodState.selectedItem.variants[index].price" />
        </div>
        <div class="flex1 sale-price">
          Sale Price
          <input class="bg-gray-300" type="text" v-model="prodState.selectedItem.variants[index].salePrice" />
        </div>
      </div>
      <div class="row flex items-center justify-around">
        <div class="stock-qty">
          Stock Quantity
          <input class="bg-gray-300" type="text" v-model="prodState.selectedItem.variants[index].stockQty" />
        </div>
        <div class="allow-backorder">
          Allow Backorders
          <input class="bg-gray-300" type="text" v-model="prodState.selectedItem.variants[index].allowBackorders" />
        </div>
      </div>
      <div class="row">
        <div class="allow-backorder bg-gray-300">
          Low Stock Threshold
          <input
            class="bg-gray-300"
            type="text"
            v-model="prodState.selectedItem.variants[index].allowBackorders"
            placeholder="Storewide threshold: 2"
          />
        </div>
      </div>
      <div class="row flex items-center justify-around gap-10" v-if="prodState.selectedItem.variants[index].shipping">
        <div class="weight">
          Weight (lb)
          <input class="bg-gray-300" type="text" v-model="prodState.selectedItem.variants[index].shipping.weight" />
        </div>
        <div class="dimensions">
          <div>Dimensions (L X W X H) (in)</div>
          <div class="flex items-center justify-around gap-5">
            <input
              class="bg-gray-300"
              type="text"
              v-model="prodState.selectedItem.variants[index].shipping.dimensions.length"
            />
            <input
              class="bg-gray-300"
              type="text"
              v-model="prodState.selectedItem.variants[index].shipping.dimensions.width"
            />
            <input
              class="bg-gray-300"
              type="text"
              v-model="prodState.selectedItem.variants[index].shipping.dimensions.height"
            />
          </div>
        </div>
      </div>
      <div class="shipping-class bg-gray-300">
        <label>Tax Class</label>
        <select v-model="prodState.selectedItem.variants[index].taxClass">
          <option value="same-as-parent">Same as parent</option>
          <option value="standard">Standard</option>
          <option value="reduced">Reduced</option>
          <option value="zero">Xero</option>
        </select> -->
  <!-- <input
            class="bg-gray-300"
            type="text"
            v-model="prodState.selectedItem.variants[index].shippingClass"
            placeholder="Storewide threshold: 2"
          /> -->
  <!-- </div>
      <div class="row flex items-center justify-around gap-10">
        <div class="shipping-class bg-gray-300">
          <label>Sipping Class</label>
          <select v-model="prodState.selectedItem.variants[index].shippingClass">
            <option value="same-as-parent">Same as parent</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="allow-backorder bg-gray-300">
          Description
          <input
            class="bg-gray-300"
            type="text"
            v-model="prodState.selectedItem.variants[index].description"
            placeholder="Storewide threshold: 2"
          />
        </div>
      </div>
    </div>
  </div> -->
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.variants {
  background-color: white;
  border-radius: 5px;
  padding: 2rem 2rem;

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn {
      display: flex;
      align-items: center;
      gap: 0.3rem;

      svg {
        fill: $slate-50;
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }

  // .slideout {
  //   .dialog {
  //     .header {
  //       display: flex;
  //       align-items: center;
  //       justify-content: space-between;
  //       padding: 2rem;
  //       background-color: $slate-50;
  //       .btn {
  //         svg {
  //           width: 1.8rem;
  //           height: 1.8rem;
  //         }
  //       }
  //     }

  //     .main {
  //       // border: 1px solid green;
  //       min-height: 100vh;
  //     }
  //   }
  // }
}
</style>
