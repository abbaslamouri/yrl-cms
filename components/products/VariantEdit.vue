<script setup>
const props = defineProps({
  prodVariantEdit: {
    type: Object,
    required: true,
  },
  editIndex: {
    type: Number,
    required: true,
  },

  showVariantSlideout: {
    type: Boolean,
  },
})

const prodState = inject('prodState')
const attState = inject('attState')
const attTermsState = inject('attTermsState')

// defineEmits(['mediaSelectorClicked', 'showVariantSlideout'])
</script>

<template>
  <div class="variant-edit">
    <Slideout :showSlideout="showVariantSlideout">
      <template v-slot:header>
        <div class="header shadow-md">
          <h3 class="title">Edit Variants</h3>
          <div class="options td">
            <div v-for="term in prodVariantEdit.attrTerms" :key="term" class="attribute-term">
              <span class="attribute">
                {{ attState.items.find((a) => a._id == attTermsState.items.find((t) => t._id == term).parent).name }}:
              </span>
              <span class="term">
                {{ attTermsState.items.find((t) => t._id == term).name }}
              </span>
            </div>
          </div>
          <button class="btn close"><IconsClose @click.prevent="showVariantSlideout = false" /></button>
        </div>
      </template>
      <div class="main">
        <h2>Select options for your variant</h2>
        <div class="attributes" v-if="prodState.selectedItem.attributes">
          <div v-for="(termId, j) in prodVariantEdit.attrTerms" :key="termId">
            {{ attState.items.find((a) => a._id == attTermsState.items.find((t) => t._id == termId).parent).name }}
            <select v-model="prodState.selectedItem.variants[editIndex].attrTerms[j]">
              <option
                v-for="id in prodState.selectedItem.attributes.find(
                  (a) => a.attribute == attTermsState.items.find((t) => t._id == termId).parent
                ).terms"
                :key="id"
                :value="id"
              >
                {{ attTermsState.items.find((t) => t._id == id).name }}
              </option>
            </select>
            <FormsBaseSelect
              :options="
                prodState.selectedItem.attributes.find(
                  (a) => a.attribute == attTermsState.items.find((t) => t._id == termId).parent
                ).terms
              "
            />
          </div>
        </div>
        <h3>Variant Details</h3>
        <div class="image">
          <button class="btn btn-primary" @click.prevent="handleMediaSelectorClick({ image: 'gallery', index: null })">
            <IconsImage />
            <span> Select Images </span>
          </button>

          <span>or</span>
          <button class="btn btn-primary" @click.prevent="handleMediaSelectorClick({ image: 'gallery', index: null })">
            <IconsImage />
            <span> Choose Existing</span>
          </button>
          <!-- @click.prevent="handleMediaSelectorClick({ image: 'variant', index })" -->
        </div>
        <div class="sku-stock">
          <div class="sku">SKU</div>
          <div class="stock-qty">Stock Qty</div>
        </div>
        <div class="price">Price</div>
        <div class="description">Description</div>
      </div>
      <template v-slot:footer>
        <div class="footer shadow-md">
          <p>Here's some contact info</p>
        </div>
      </template>
    </Slideout>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.variant-edit {
  .header {
    gap: 2rem;
    .options {
      flex: 1;
      // border:1px solid red;
      display: flex;
      align-items: center;
      gap: 3rem;
      font-weight: 500;

      .attribute-term {
        // display: flex;
        // align-items: center;
        // gap:3rem;
      }
    }
  }

  .main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;

    .attributes {
      display: flex;
      align-items: center;
      justify-content: space-evenly;


      select {
        width: 100%;
        border: 1px solid red;
      }
    }
  }
}
</style>
