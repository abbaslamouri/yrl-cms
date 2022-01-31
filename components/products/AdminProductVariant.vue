<script setup>
const props = defineProps({
  prodVariant: {
    type: Object,
    required: true,
  },
  i: {
    type: Number,
    required: true,
  },
})

defineEmits(['mediaSelectorClicked', 'showVariantSlideout'])

// const props = defineProps({
//   // variant: Object,
//   index: Number,
// })

const prodState = inject('prodState')
const attState = inject('attState')
const attTermsState = inject('attTermsState')
const showActions = ref(false)
const showVariantSlideout = ref(false)

const getAttribute = (attributeId) => {
  return prodState.selectedItem.attributes.filter((el) => el.item._id == attributeId)[0].item
}

const getTerms = (attributeId) => {
  const terms = prodState.selectedItem.attributes.filter((el) => el.item._id == attributeId)[0].terms
  return terms
}

const removeProductVariant = () => {
  if (!confirm('Are you sure?')) return
  prodState.selectedItem.variants.splice(props.i, 1)
}

const updateVariant = (attribute, termId) => {
  console.log('AT', attribute)
  // console.log(value)
  const term = attribute.terms.find((t) => t._id == termId)

  console.log('T', term)

  // if (!prodState.selectedItem.variants[props.i].attrTerms.length) {
  prodState.selectedItem.variants[props.i].attrTerms.push(term)
  // }
}
</script>

<!-- &&
      prodState.selectedItem.variants[i].attrTerms &&
      prodState.selectedItem.variants[i].attrTerms.length -->

<template>
  <div class="admin-product-variant">
        <!-- <pre style="font-size: 1rem">{{ prodState.selectedItem }}</pre> -->


    <!-- <div class="td"> -->
    <div class="image td" @click="$emit('showVariantSlideout')">
      <img v-if="prodVariant.gallery[0]" :src="prodVariant.gallery[0].path" alt="Variant Image" />
      <img v-else src="/placeholder.png" alt="Variant Image" />
    </div>
    <div class="option td" @click="$emit('showVariantSlideout')">
      <div v-for="term in prodVariant.attrTerms" :key="term" class="attribute-term">
        <div class="attribute">
          {{ attState.items.find((a) => a._id == term.parent).name}}
        </div>
        <div class="term">
          {{ attTermsState.items.find((t) => t._id == term._id).name }}
        </div>
      </div>
    </div>
    <div class="stock-qty td">
      <div v-if="!prodState.selectedItem.manageInventory">&infin;</div>
      <div v-else>{{ prodVariant.stockQty }}</div>
    </div>
    <div class="price td">{{ prodVariant.price }}</div>
    <div class="sku td">{{ prodVariant.sku }}</div>
    <div class="actions td">
      <button class="btn" @click.prevent="showActions = !showActions"><IconsMoreHoriz /></button>
      <div class="menu shadow-md" v-show="showActions">
        <a href="#" class="link"><div class="advanced">Advanced</div></a>
        <a href="#" class="link" @click.prevent="removeProductVariant">
          <div class="cancel">Delete</div>
        </a>
        <a href="#" class="link" @click.prevent="attState.items.splice(i, 1)">
          <div class="cancel">Cancel</div>
        </a>
      </div>
    </div>

    <!-- <div class="actions td">
            <IconsDeleteFill @click="removeProductAttribute" />
          </div> -->

    <!-- </div> -->

    <!-- <form @keypress.enter.prevent>
          <ProductsAdminAttribute
            :attribute="attribute"
            :i="i"
            class="row"
            v-for="(attribute, i) in attState.items"
            :key="attribute._id"
            :ref="
              (el) => {
                if (el) attributeRefs[i] = el
              }
            "
          />
          <button class="btn btn-primary" @click="saveAttributes">Save Changes</button>
        </form> -->
  </div>
  <!-- <div class="variant space-y-4 border p-6" v-if="prodState.selectedItem.variants[i]">
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
                :selected="prodState.selectedItem.variants[i].attrTerms.find((t) => t._id == term._id)"
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
            v-if="prodState.selectedItem.variants[i].featuredImage"
            :src="prodState.selectedItem.variants[i].featuredImage.path"
            alt="Variant Image"
          />
          <img v-else src="/placeholder.png" alt="Variant Image" />
        </div>
        <div class="flex1 sku">
          SKU
          <input class="bg-gray-300" type="text" v-model="prodState.selectedItem.variants[i].sku" />
        </div>
      </div>
      <div class="row flex items-center gap-10">
        <div><input type="checkbox" v-model="prodState.selectedItem.variants[i].enabled" />Enabled</div>
        <div><input type="checkbox" v-model="prodState.selectedItem.variants[i].virtual" />Virtual</div>
        <div><input type="checkbox" v-model="prodState.selectedItem.variants[i].downloadable" />downloadable</div>
      </div>
      <div class="row flex items-center justify-around">
        <div class="price">
          Price
          <input class="bg-gray-300" type="text" v-model="prodState.selectedItem.variants[i].price" />
        </div>
        <div class="flex1 sale-price">
          Sale Price
          <input class="bg-gray-300" type="text" v-model="prodState.selectedItem.variants[i].salePrice" />
        </div>
      </div>
      <div class="row flex items-center justify-around">
        <div class="stock-qty">
          Stock Quantity
          <input class="bg-gray-300" type="text" v-model="prodState.selectedItem.variants[i].stockQty" />
        </div>
        <div class="allow-backorder">
          Allow Backorders
          <input class="bg-gray-300" type="text" v-model="prodState.selectedItem.variants[i].allowBackorders" />
        </div>
      </div>
      <div class="row">
        <div class="allow-backorder bg-gray-300">
          Low Stock Threshold
          <input
            class="bg-gray-300"
            type="text"
            v-model="prodState.selectedItem.variants[i].allowBackorders"
            placeholder="Storewide threshold: 2"
          />
        </div>
      </div>
      <div class="row flex items-center justify-around gap-10" v-if="prodState.selectedItem.variants[i].shipping">
        <div class="weight">
          Weight (lb)
          <input class="bg-gray-300" type="text" v-model="prodState.selectedItem.variants[i].shipping.weight" />
        </div>
        <div class="dimensions">
          <div>Dimensions (L X W X H) (in)</div>
          <div class="flex items-center justify-around gap-5">
            <input
              class="bg-gray-300"
              type="text"
              v-model="prodState.selectedItem.variants[i].shipping.dimensions.length"
            />
            <input
              class="bg-gray-300"
              type="text"
              v-model="prodState.selectedItem.variants[i].shipping.dimensions.width"
            />
            <input
              class="bg-gray-300"
              type="text"
              v-model="prodState.selectedItem.variants[i].shipping.dimensions.height"
            />
          </div>
        </div>
      </div>
      <div class="shipping-class bg-gray-300">
        <label>Tax Class</label>
        <select v-model="prodState.selectedItem.variants[i].taxClass">
          <option value="same-as-parent">Same as parent</option>
          <option value="standard">Standard</option>
          <option value="reduced">Reduced</option>
          <option value="zero">Xero</option>
        </select>
      </div>
      <div class="row flex items-center justify-around gap-10">
        <div class="shipping-class bg-gray-300">
          <label>Sipping Class</label>
          <select v-model="prodState.selectedItem.variants[i].shippingClass">
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
            v-model="prodState.selectedItem.variants[i].description"
            placeholder="Storewide threshold: 2"
          />
        </div>
      </div>
    </div>
  </div> -->
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.admin-product-variant {
  cursor: pointer;

  .td {
    display: flex;
    align-items: center;
  }

  .image {
    width: 5rem;
    height: 5rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .option {
    display: flex;
    .attribute-term {
      display: flex;
      align-items: center;
      // cursor: pointer;

      .attribute {
        background-color: $slate-400;
        color: white;
        padding: 0.5rem 1.5rem;
        border-radius: 2rem 0 0 2rem;
      }

      .term {
        background-color: $slate-200;
        padding: 0.5rem 1.5rem;
        border-radius: 0 2rem 2rem 0;
      }
    }
  }
}
</style>
