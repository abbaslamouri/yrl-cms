<script setup>
const props = defineProps({
  index: Number,
})

const emit = defineEmits(['saveVariants'])

const prodState = inject('prodState')
const attState = inject('attState')
const variantState = inject('variantState')
const variantActions = inject('variantActions')

const showAttVarSlideout = inject('showAttVarSlideout')

const router = useRouter()

// const showAttVarSlideout = ref(false)

const getAttribute = (attributeId) => {
  return prodState.selectedItem.attributes.filter((el) => el.item._id == attributeId)[0].item
}

const getTerms = (attributeId) => {
  const terms = prodState.selectedItem.attributes.filter((el) => el.item._id == attributeId)[0].terms
  return terms
}

const removeVariant = () => {
  if (!confirm('Are you sure?')) return
  prodState.selectedItem.variants.splice(props.index, 1)
}

const updateVariant = (attribute, termId) => {
  // console.log('AT', attribute)
  // console.log(value)
  const term = attribute.terms.find((t) => t._id == termId)

  // console.log('T', term)

  // if (!prodState.selectedItem.variants[props.index].attrTerms.length) {
  prodState.selectedItem.variants[props.index].attrTerms.push(term)
  // }
}

const saveVariants = async () => {
  showAttVarSlideout.value = false
  emit('saveVariants')
}
</script>

<template>
  <section class="attributes-variants-panels">
    <Slideout :showSlideout="showAttVarSlideout">
      <template v-slot:header>
        <div class="header shadow-md">
          <h3 class="title">Edit Variants</h3>
          <button class="btn close"><IconsClose @click.prevent="showAttVarSlideout = false" /></button>
        </div>
      </template>
      <div class="main">
        <ProductsAdminEmptyVariantMsg
          v-if="!attState.items.length || !prodState.selectedItem._id"
          @closeAttVarSlideout="showAttVarSlideout = false"
        />
        <div v-else class="attributes-variants">
          <h3>Please select attributes to use for variants</h3>
          <ProductsAdminProductAttributesPanel />
          <ProductsAdminProductVariantsPanel />
        </div>
      </div>

      <template v-slot:footer>
        <div class="footer shadow-md">
          <div class="actions" v-if="prodState.selectedItem._id && prodState.selectedItem.attributes.length">
            <button class="btn btn-secondary cancel" @click="saveAttributes">Cancel</button>
            <button class="btn btn-primary save" @click.prevent="saveVariants">Save Changes</button>
          </div>
        </div>
      </template>
    </Slideout>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.attributes-variants-panels {
  .header {
    .btn {
      border: none;
    }
  }
  .main {
    .attributes-variants {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }
}
</style>
