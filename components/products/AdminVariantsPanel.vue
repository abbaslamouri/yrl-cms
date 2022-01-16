<script setup>
// const product = inject('product')
import { useError } from '~/pinia/useError'
const appError = useError()
const prodState = inject('prodState')
const attState = inject('attState')
const attTermsState = inject('attTermsState')

const variantsActionSelect = ref('')
const regularPrices = ref(null)
const showRegularPricesInput = ref(false)
const salePrices = ref(null)
const showSalePricesInput = ref(false)
const termSelectId = ref('')
// const showAddVariantForm = ref(false)

const getCombinations = (options) => {
  let combinations = [[]]
  for (let count = 0; count < options.length; count++) {
    const tmp = []
    combinations.forEach((v1) => {
      options[count].forEach((v2) => {
        tmp.push(v1.concat([v2]))
      })
      combinations = tmp
    })
  }

  return combinations
}

const handleVariantsAction = () => {
  switch (variantsActionSelect.value) {
    // Create all possible attribute term combinations
    case 'create-all':
      let terms = []
      // Are there attribute terms
      if (!prodState.selectedItem.attributes.length) {
        return appError.setSnackbar(true, 'Please select at least one attribute')
      } else {
        // Consider only attributes with 2 terms or more
        const attributes = prodState.selectedItem.attributes.filter((a) => a.terms && a.terms.length > 1)
        // console.log('AAAAAA', attributes)
        if (attributes.length) terms = attributes.map((el) => [...el.terms])
      }
      // Add term combinations if any to variants
      if (getCombinations(terms)[0].length)
        prodState.selectedItem.variants = [...getCombinations(terms)].map((el) => {
          // el.attribute = prodState.selectedItem.attributes.filter((a) => a.terms._id == el._id)
          // console.log(el)

          return {
            attrTerms: [...el],
            enabled: true,
            shipping: {
              dimensions: {},
            },
          }
        })
      break

    case 'add-variant':
      // Are there attribute terms
      if (!prodState.selectedItem.attributes.length) {
        return appError.setSnackbar(true, 'Please select at least one attribute to add a variation')
      }

      // Are there attribute terms
      const attributes = prodState.selectedItem.attributes.filter((a) => a.terms && a.terms.length > 1)
      if (!attributes.length) {
        // showAddVariantForm.value = false
        return appError.setSnackbar(true, 'You must selecet at least 2 terms per attribute to add a variation')
      }

      prodState.selectedItem.variants.unshift({
        attrTerms: [],
        enabled: true,
        shipping: {
          dimensions: {},
        },
      })
      // showAddVariantForm.value = false
      break

    case 'delete-all':
      prodState.selectedItem.variants = []
      break

    case 'toggle-enabled':
      let i = 0
      while (i < prodState.selectedItem.variants.length) {
        console.log(i)
        prodState.selectedItem.variants[i].enabled = !prodState.selectedItem.variants[i].enabled
        i++
      }
      break

    case 'toggle-virtual':
      let j = 0
      while (j < prodState.selectedItem.variants.length) {
        prodState.selectedItem.variants[j].virtual = !prodState.selectedItem.variants[j].virtual
        j++
      }
      break

    case 'toggle-downloadable':
      let k = 0
      while (k < prodState.selectedItem.variants.length) {
        prodState.selectedItem.variants[k].downloadable = !prodState.selectedItem.variants[k].downloadable
        k++
      }
      break

    case 'set-regular-prices':
      showRegularPricesInput.value = true
      break

    case 'set-sale-prices':
      showSalePricesInput.value = true
      break
  }
  variantsActionSelect.value = ''
}

const setRegularPrices = () => {
  let i = 0
  while (i < prodState.selectedItem.variants.length) {
    prodState.selectedItem.variants[i].price = regularPrices.value
    i++
  }
  showRegularPricesInput.value = false
  variantsActionSelect.value = ''
}

const setSalePrices = () => {
  let i = 0
  while (i < prodState.selectedItem.variants.length) {
    prodState.selectedItem.variants[i].salePrice = salePrices.value
    i++
  }
  showSalePricesInput.value = false
  variantsActionSelect.value = ''
}

// const getAttribute = (attributeId) => {
//   return attState.items.filter((el) => el._id == attributeId)[0]
// }

const setDefaultTerm = (index, value) => {
  console.log(index, value)
  prodState.selectedItem.attributes[index].defaultTerm = attTermsState.items.filter((el) => el._id == value)[0]
}
</script>

<template>
  <div>
    <!-- <pre class="text-sm">{{ prodState.selectedItem }}</pre> -->

    <div class="defaults flex gap-4 items-center">
      <div class="default" v-for="(attribute, index) in prodState.selectedItem.attributes">
        Select default {{ attribute.item.name }}
        <select
          class="bg-gray-200"
          @change="setDefaultTerm(index, $event.target.value)"
          :value="prodState.selectedItem.attributes[index].defaultTerm._id"
        >
          <option v-for="term in attribute.terms" :key="term._id" :value="term._id">
            {{ term.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="actions">
      <select class="bg-gray-200" v-model="variantsActionSelect" @change="handleVariantsAction">
        <option value="">Select Action</option>
        <option value="create-all">Create variations form all attributes</option>
        <option value="add-variant">Add Variant</option>
        <option value="delete-all" :disabled="!prodState.selectedItem.variants.length">Delete all variants</option>
        <option value="" disabled>Status</option>
        <option value="toggle-enabled" :disabled="!prodState.selectedItem.variants.length">Toggle Enabled</option>
        <option value="toggle-virtual" :disabled="!prodState.selectedItem.variants.length">Toggle Virtual</option>
        <option value="toggle-downloadable" :disabled="!prodState.selectedItem.variants.length">
          Toggle Downloadable
        </option>
        <option value="" disabled>Pricing</option>
        <option value="set-regular-prices" :disabled="!prodState.selectedItem.variants.length">
          Set Regular Prices
        </option>
        <option value="set-sale-prices" :disabled="!prodState.selectedItem.variants.length">Set Sale Prices</option>
      </select>
      <form v-if="showRegularPricesInput" @submit.prevent="setRegularPrices">
        <label>Regular Price</label>
        <input type="text" class="bg-gray-300" v-model="regularPrices" />
        <button class="btn">submit</button>
      </form>
      <form v-if="showSalePricesInput" @submit.prevent="setSalePrices">
        <label>Sale Price</label>
        <input type="text" class="bg-gray-300" v-model="salePrices" />
        <button class="btn">submit</button>
      </form>
    </div>
    <div class="content space-y-20">
      <ProductsAdminVariant
        :variant="variant"
        :index="index"
        v-for="(variant, index) in prodState.selectedItem.variants"
        :key="`product-variant-${index}`"
        @mediaSelectorClicked="$emit('mediaSelectorClicked', $event)"
      />
    </div>
  </div>
</template>

<style lang=""></style>
