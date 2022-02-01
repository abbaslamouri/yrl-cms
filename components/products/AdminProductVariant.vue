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
    <div class="image td" @click="$emit('showVariantSlideout')">
      <img v-if="prodVariant.gallery[0]" :src="prodVariant.gallery[0].path" alt="Variant Image" />
      <img v-else src="/placeholder.png" alt="Variant Image" />
    </div>
    <div class="option td" @click="$emit('showVariantSlideout')">
      <div v-for="term in prodVariant.attrTerms" :key="term" class="attribute-term">
        <div class="attribute">
          {{ attState.items.find((a) => a._id == term.parent).name }}
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
  </div>
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
        padding: 0.25rem 0.5rem 0.3rem;
        border-radius: 2rem 0 0 2rem;
      }

      .term {
        background-color: $slate-200;
        padding: 0.25rem 0.5rem 0.3rem;
        border-radius: 0 2rem 2rem 0;
      }
    }
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
