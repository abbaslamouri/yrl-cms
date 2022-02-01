<script setup>
const prodState = inject('prodState')
const attState = inject('attState')
const attTermsState = inject('attTermsState')

const props = defineProps({
  prodAttr: {
    type: Object,
    required: true,
  },
  i: {
    type: Number,
    required: true,
  },
})

const attributeSelect = ref(props.prodAttr.attribute._id ? props.prodAttr.attribute._id : '')
const defaultTermSelect = ref(props.prodAttr.defaultTerm._id ? props.prodAttr.defaultTerm._id : '')
const termSelect = ref('')
const showActions = ref(false)

const removeVariantByTermId = (termId) => {
  let j = 0
  while (j < prodState.selectedItem.variants.length) {
    const k = prodState.selectedItem.variants[j].attrTerms.findIndex((t) => t._id == termId)
    const countBefore = prodState.selectedItem.variants[j].attrTerms.length
    console.log('Before', countBefore)
    if (k !== -1) prodState.selectedItem.variants[j].attrTerms.splice(k, 1)
    const countAfter = prodState.selectedItem.variants[j].attrTerms.length
    console.log('After', countAfter)
    if (countBefore != countAfter) prodState.selectedItem.variants[j].discard = true

    j++
  }
  prodState.selectedItem.variants = prodState.selectedItem.variants.filter((el) => !el.discard)

  if (!prodState.selectedItem.variants.length) prodState.selectedItem.variants = []
}

const removeDuplicateVariants = () => {
  prodState.selectedItem.variants = Array.from(
    prodState.selectedItem.variants
      .reduce((map, obj) => {
        let id = ''
        for (const prop in obj.attrTerms) {
          id = `${id}_${obj.attrTerms[prop]._id}`
        }
        console.log(id)
        return map.set(id, obj)
      }, new Map())
      .values()
  )
}

const setProductAttribute = () => {
  for (const prop in prodState.selectedItem.attributes[props.i].terms) {
    removeVariantByTermId(prodState.selectedItem.attributes[props.i].terms[prop]._id)
  }
  prodState.selectedItem.attributes[props.i].terms = []
  prodState.selectedItem.attributes[props.i].attribute = attState.items.find((a) => a._id == attributeSelect.value)
  prodState.selectedItem.attributes[props.i].defaultTerm = attTermsState.items.find(
    (t) => t.parent == attributeSelect.value
  )
  defaultTermSelect.value = prodState.selectedItem.attributes[props.i].defaultTerm._id
}

const setDefaultTerm = () => {
  prodState.selectedItem.attributes[props.i].defaultTerm = defaultTermSelect
}

const removeProductAttribute = () => {
  if (!confirm('Are you sure?')) return

  // Remove all terms whose parent attarubute is to be deleted and mark all variants with empty eterms fro deletion
  let j = 0
  while (j < prodState.selectedItem.variants.length) {
    const k = prodState.selectedItem.variants[j].attrTerms.findIndex(
      (t) => t.parent == prodState.selectedItem.attributes[props.i].attribute._id
    )
    if (k !== -1) prodState.selectedItem.variants[j].attrTerms.splice(k, 1)
    if (!prodState.selectedItem.variants[j].attrTerms.length) prodState.selectedItem.variants[j].delete = true
    j++
  }

  // Delete all marked variations
  prodState.selectedItem.variants = prodState.selectedItem.variants.filter((el) => !el.delete)

  // Delete attribute
  prodState.selectedItem.attributes.splice(props.i, 1)

  removeDuplicateVariants()
  // console.log(xx)
  // [...new Set(prodState.selectedItem.variants.map((el) => el))]
}

setDefaultTerm

const addAllTerms = () => {
  // console.log('PAI', prodState.selectedItem.attributes[props.i].item._id)
  console.log('PAI', props.prodAttr.attribute)
  console.log('TERMS', attTermsState.items)
  prodState.selectedItem.attributes[props.i].terms = attTermsState.items.filter(
    (el) => el.parent == props.prodAttr.attribute._id
  )
}

const addTerm = () => {
  const term = attTermsState.items.find((t) => t._id == termSelect.value)
  if (term) {
    if (!props.prodAttr.terms) {
      prodState.selectedItem.attributes[props.i].terms = [term]
    } else {
      const j = props.prodAttr.terms.findIndex((t) => t._id == term._id)
      if (j == -1) prodState.selectedItem.attributes[props.i].terms.push(term)
    }
  }
  termSelect.value = ''
}

const removeTerm = (j, termId) => {
  if (!confirm('Are you sure?')) return
  prodState.selectedItem.attributes[props.i].terms.splice(j, 1)
  removeVariantByTermId(termId)
  // let j = 0
  // prodState.selectedItem.attributes[props.i].terms.splice(i, 1)
  // while (j < prodState.selectedItem.variants.length) {
  //   const k = prodState.selectedItem.variants[j].attrTerms.findIndex((t) => t._id == termId)
  //   if (k !== -1) prodState.selectedItem.variants[j].discard = true
  //   j++
  // }
  // prodState.selectedItem.variants = prodState.selectedItem.variants.filter((el) => !el.discard)

  // if (prodState.selectedItem.variants.length < 2) prodState.selectedItem.variants = []

  // if (!prodState.selectedItem.attributes[props.i].terms.length)
  // delete prodState.selectedItem.attributes[props.i].terms

  // if (prodState.selectedItem.attributes[props.i].terms.length < 2) {
  //   while (j < prodState.selectedItem.variants.length) {
  //     const k = prodState.selectedItem.variants[j].attrTerms.findIndex(
  //       (t) => t._id == prodState.selectedItem.attributes[props.i].terms[0]._id
  //     )
  //     if (k !== -1) {
  //       // prodState.selectedItem.variants[j].attrTerms.splice(k, 1)
  //       // if (prodState.selectedItem.variants[j].attrTerms.length < 2)
  //       prodState.selectedItem.variants[j].attrTerms.splice(k, 1)
  //     }
  //     j++
  //   }
  // }
  // prodState.selectedItem.variants = prodState.selectedItem.variants.filter((el) => !el.delete)
  // prodState.selectedItem.attributes[props.i].terms.splice(0, 1)
  // if (prodState.selectedItem.attributes[props.i].terms.length < 2) {
  //   prodState.selectedItem.variants.filter((v) => {
  //     return v.attrTerms.filter((a) => a.parent != prodState.selectedItem.attributes[props.i].item._id)
  //   })
  // }
  // j = 0
  // while (j < prodState.selectedItem.variants.length) {
  //   const k = prodState.selectedItem.variants[j].attrTerms.findIndex((t) => t._id == termId)
  //   if (k !== -1) {
  //     prodState.selectedItem.variants[j].attrTerms.splice(k, 1)
  //     if (prodState.selectedItem.variants[j].attrTerms.length < 2) prodState.selectedItem.variants[j].delete = true
  //   }
  //   j++
  // }
}

const removeAllTerms = () => {
  // Remove all terms from ttribute
  if (!confirm('Are you sure?')) return
  for (const prop in prodState.selectedItem.attributes[props.i].terms) {
    removeVariantByTermId(prodState.selectedItem.attributes[props.i].terms[prop]._id)
  }
  prodState.selectedItem.attributes[props.i].terms = []

  // const index = prodState.selectedItem.attributes.findIndex(
  //   (a) => a._id == prodState.selectedItem.attributes[props.i]._id
  // )
  // console.log(index)
  // if (index !== -1) prodState.selectedItem.attributes[props.i].terms = []
}

// watch(
//   () => prodState.selectedItem.attributes[props.i],
//   (current, old) => {
//     console.log('C', current)
//     console.log('O', old)
//   },
//   { deep: true }
// )
</script>

<template>
  <div class="admin-product-attribute shadow-md">
    <!-- <pre style="font-size: 1rem">{{ prodState.selectedItem }}</pre> -->
    <!-- <div class="td"> -->
    <div class="attribute td">
      <div class="base-select">
        <select v-model="attributeSelect" @change="setProductAttribute" class="centered">
          <option value="">Select Attribute</option>
          <option
            v-for="option in attState.items.map((a) => {
              return { key: a._id, name: a.name }
            })"
            :key="option.key"
            :value="option.key"
            :disabled="prodState.selectedItem.attributes.find((el) => el.attribute._id == option.key)"
          >
            {{ option.name }}
          </option>
        </select>
        <!-- <label>Attribute</label> -->
      </div>
    </div>
    <div class="attribute-default-term td">
      <div v-if="prodAttr.attribute">
        <FormsBaseSelect
          nullOption="Select DEfault Term"
          v-model="defaultTermSelect"
          @update:modelValue="setDefaultTerm"
          :options="
            attTermsState.items
              .filter((t) => t.parent == prodAttr.attribute._id)
              .map((t) => {
                return { key: t._id, name: t.name }
              })
          "
        />
      </div>
    </div>
    <div class="terms td">
      <div v-if="prodAttr.attribute" class="terms-wrapper">
        <div class="term-actions">
          <button class="btn" @click.prevent="addAllTerms()">Select All</button>
          <button class="btn" @click.prevent="removeAllTerms(prodState.selectedItem.attributes[i].attribute)">
            Select None
          </button>
          <div class="base-select">
            <select v-model="termSelect" @change="addTerm" class="centered">
              <option value="">Add term</option>
              <option
                v-for="term in attTermsState.items.filter(t => t.parent==prodAttr.attribute._id)"
                :key="term._id"
                :value="term._id"
                :disabled="
                  prodState.selectedItem.attributes[i].terms &&
                  prodState.selectedItem.attributes[i].terms.find((t) => t._id == term._id)
                "
              >
                {{ term.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="terms-list">
          <div class="list" v-if="prodAttr.terms.length">
            <div
              v-if="prodAttr.terms.length"
              class="term shadow-md"
              v-for="(term, j) in prodAttr.terms"
              :key="term._id"
            >
              <span>{{ term.name }}</span>
              <span class="remove-term" @click="removeTerm(j, term._id)">
                <IconsClose />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="actions td">
      <button class="btn" @click.prevent="showActions = !showActions"><IconsMoreHoriz /></button>
      <div class="menu shadow-md" v-show="showActions">
        <a href="#" class="link"><div class="advanced">Advanced</div></a>
        <a href="#" class="link" @click.prevent="removeProductAttribute">
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

.admin-product-attribute {
  border: 1px solid $slate-200;
  border-radius: 3px;
  padding: 1rem;
  .attribute {
    // .base-select {
    //   select {
    //     padding: 1rem 2rem;
    //   }
    // }
  }

  // border: 1px solid red;

  .attribute-default-term {
    // .base-select {
    //   select {
    //     padding: 1rem 2rem !important;
    //   }
    // }
    // border: 1px solid red;
  }

  .terms {
    .terms-wrapper {
      position: relative;
      border: 1px solid $slate-300;

      display: flex;
      // align-items: stretch;
      gap: 1rem;
      font-size: 1.2rem;
      padding: 1rem;
      .term-actions {
        // border: 1px solid teal;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        min-width: 12rem;

        .btn {
          font-size: 1rem;
          padding: 0.3rem;
          background-color: $slate-400;
          color: white;
          width: 9rem;
        }

        select {
          font-size: 1.2rem;
        }
      }

      .terms-list {
        // display: flex;
        // align-items: center;
        padding: 0.7rem 2rem;
        width: 100%;
        min-height: 100%;
        border: 1px solid $slate-300;

        .list {
          // flex: 1;
          // border: 1px solid $slate-300;

          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;
          // height: 100%;
          width: 100%;
        }

        .term {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid $slate-300;
          background-color: white;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          font-weight: 500;

          svg {
            width: 1.2rem;
            height: 1.2rem;
            background-color: $slate-500;
            fill: $slate-50;
            padding: 0.1rem;
            border-radius: 50%;
            cursor: pointer;
          }
        }
      }
    }
  }

  // .attribute-actions {
  //   // border: 1px solid red;
  //   position: relative;
  //   justify-self: flex-end;

  //   .btn {
  //     // border: none;
  //     padding: 0.5rem;
  //     border-radius: 5px;
  //   }

  //   .menu {
  //     position: absolute;
  //     top: -40%;
  //     right: 100%;
  //     border: 1px solid $slate-300;
  //     padding: 1rem 2rem;
  //     background-color: white;
  //     z-index: 9;
  //     font-size: 1.4rem;

  //     .cancel {
  //       color: $red-500;
  //     }
  //   }
  // }
}
</style>
