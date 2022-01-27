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

const attributeSelect = ref('')
const termSelect = ref('')
const showActions = ref(false)

const removeVariantCallback = (termId) => {
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

const removeProductAttribute = () => {
  if (!confirm('Are you sure?')) return

  // Remove all terms whose parent attarubute is to be deleted and mark all variants with empty eterms fro deletion
  let j = 0
  while (j < prodState.selectedItem.variants.length) {
    const k = prodState.selectedItem.variants[j].attrTerms.findIndex(
      (t) => t.parent == prodState.selectedItem.attributes[props.i].item._id
    )
    if (k !== -1) prodState.selectedItem.variants[j].attrTerms.splice(k, 1)
    if (!prodState.selectedItem.variants[j].attrTerms.length) prodState.selectedItem.variants[j].delete = true
    j++
  }

  // Delete all marked variations
  prodState.selectedItem.variants = prodState.selectedItem.variants.filter((el) => !el.delete)

  // Delete attribute
  prodState.selectedItem.attributes.splice(props.i, 1)
}

const addAllTerms = () => {
  // console.log('PAI', prodState.selectedItem.attributes[props.i].item._id)
  console.log('PAI', props.prodAttr.attribute)
  console.log('TERMS', attTermsState.items)
  prodState.selectedItem.attributes[props.i].terms = attTermsState.items
    .filter((el) => el.parent == props.prodAttr.attribute)
    .map((t) => {
      return t._id
    })
}

const addTerm = () => {
  console.log(termSelect.value)
  const term = attTermsState.items.find((t) => t._id == termSelect.value)
  console.log(term)
  if (term) {
    if (!props.prodAttr.terms) {
      prodState.selectedItem.attributes[props.i].terms = [term._id]
      console.log('here', prodState.selectedItem.attributes[props.i].terms)
    } else {
      const j = props.prodAttr.terms.findIndex((t) => t._id == term._id)
      console.log(j)
      if (j == -1) prodState.selectedItem.attributes[props.i].terms.push(term._id)
    }
  }
  termSelect.value = ''
}

const removeTerm = (i, termId) => {
  if (!confirm('Are you sure?')) return
  prodState.selectedItem.attributes[props.i].terms.splice(i, 1)
  removeVariantCallback(termId)
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
  for (const prop in props.prodAttr.terms) {
    console.log('TTTTT', prop)
    removeVariantCallback(props.prodAttr.terms[prop])
  }
  prodState.selectedItem.attributes[props.i].terms = []

  // const index = prodState.selectedItem.attributes.findIndex(
  //   (a) => a._id == prodState.selectedItem.attributes[props.i]._id
  // )
  // console.log(index)
  // if (index !== -1) prodState.selectedItem.attributes[props.i].terms = []
}

const setDefaultTerm = () => {
  prodState.selectedItem.attributes[props.i].defaultTerm = attTermsState.items.filter(
    (t) => t.parent == props.prodAttr.attribute
  )[0]._id
}
</script>

<template>
  <div class="admin-product-attribute">
    <!-- <div class="td"> -->
    <div class="attribute td">
      <div class="base-select">
        <!-- <FormsBaseSelect
        label="Attribute"
        :options="
          attState.items.map((a) => {
            return { key: a._id, name: a.name }
          })
        "
        :disabled="prodState.selectedItem.attributes.find((el) => el.attribute == option.key)"
      /> -->
        <select v-model="prodState.selectedItem.attributes[i].attribute" @change="setDefaultTerm" class="centered">
          <option value="">Select Option</option>
          <option
            v-for="option in attState.items.map((a) => {
              return { key: a._id, name: a.name }
            })"
            :key="option.key"
            :value="option.key"
            :disabled="prodState.selectedItem.attributes.find((el) => el.attribute == option.key)"
          >
            {{ option.name }}
          </option>
        </select>
        <!-- <label>Attribute</label> -->
      </div>
    </div>
    <div class="attribute-default-term td">
      <FormsBaseSelect
        v-model="prodState.selectedItem.attributes[i].defaultTerm"
        :options="
          attTermsState.items
            .filter((t) => t.parent == props.prodAttr.attribute)
            .map((t) => {
              return { key: t._id, name: t.name }
            })
        "
      />
    </div>
    <div class="terms td">
      <!-- <div class="options"> -->
      <div class="term-actions">
        <button class="btn" @click.prevent="addAllTerms()">Select All</button>
        <button class="btn" @click.prevent="removeAllTerms(prodState.selectedItem.attributes[i].attribute)">
          Select None
        </button>
        <div class="base-select">
          <select v-model="termSelect" @change="addTerm" class="centered">
            <option value="">Add term</option>
            <option
              v-for="term in attTermsState.items.filter((t) => t.parent == prodAttr.attribute)"
              :key="term._id"
              :value="term._id"
              :disabled="prodAttr.terms && prodAttr.terms.find((t) => t == term._id)"
            >
              {{ term.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="terms-list">
        <div class="list" v-if="prodState.selectedItem.attributes[i].terms.length">
          <div
            v-if="prodState.selectedItem.attributes[i].terms"
            class="term shadow-md"
            v-for="(termId, j) in prodState.selectedItem.attributes[i].terms"
            :key="termId"
          >
            <span>{{ attTermsState.items.find((t) => t._id == termId).name }}</span>
            <span class="remove-term" @click="removeTerm(i, termId)">
              <IconsClose @click="deleteTerm(term)" />
            </span>
          </div>
        </div>
      </div>

      <!-- </div> -->
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
  <!-- <div class="content flex gap-10"> -->
  <!-- <div class="checkboxes border">
				<div>
					<input
						class="h-6 w-6 cursor-pointer"
						type="checkbox"
						v-model="prodState.selectedItem.attributes[index].attribute.visible"
					/>
					<label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
						Visible on the product page
					</label>
				</div>
				<div v-show="prodState.selectedItem.type === 'variable'">
					<input
						class="h-6 w-6 cursor-pointer"
						type="checkbox"
						v-model="prodState.selectedItem.attributes[index].attribute.variation"
					/>
					<label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
						Used for variations
					</label>
				</div>
			</div> -->
  <!-- <div class="values">
        <div class="options border border-blue-200 p-10 flex gap-4">
          <div
            v-if="prodState.selectedItem.attributes[index].terms"
            class="option bg-gray-200 flex gap-2 rounded border border-gray-300 pl-4"
            v-for="(term, i) in prodState.selectedItem.attributes[i].terms"
            :key="term._id"
          >
            <span>{{ term.name }}</span>
            <span class="remove bg-white px-2 ml-2 cursor-pointer" @click="removeTerm(i, term._id)">x</span>
          </div>
        </div>
        <div class="actions">
          <button class="btn" @click.prevent="addAllTerms()">Select All</button>
          <button class="btn" @click.prevent="removeAllTerms(prodState.selectedItem.attributes[i]._id)">
            Select None
          </button>

          <select class="" v-model="termSelect" @change="addTerm">
            <option value="">select term</option>
            <option
              v-for="term in attTermsState.items.filter(
                (el) => el.parent == prodState.selectedItem.attributes[i].attribute._id
              )"
              :key="term._id"
              :value="term._id"
              :disabled="
                prodState.selectedItem.attributes[i].terms &&
                prodState.selectedItem.attributes[i].terms.find((el) => el._id == term._id)
              "
            >
              {{ term.name }}
            </option>
          </select>
        </div>
      </div> -->
  <!-- </div> -->
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.admin-product-attribute {
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
        border: 1px solid $slate-300;

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
