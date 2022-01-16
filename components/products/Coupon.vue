<script setup>
import slugify from 'slugify'

const state = inject('state')
const actions = inject('actions')

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

// Fetch all terms with item as parent id
const terms = computed(() => attTermsState.items.filter((el) => el.parent == props.item._id))

const showNewTermForm = ref(false) // Tp toggle new term form
const inputRef = ref('') // New term form input
const termInput = ref('') // used to handle trem inout focus

const handleInputRefBtnClick = async (index) => {
  console.log('REF', inputRef.value)
  showNewTermForm.value = true
  setTimeout(() => {
    inputRef.value.focus()
  }, 10)
}

const handleAddNewTerm = async (parent) => {
  console.log('IPV', parent)
  attTermsState.selectedItem = {
    name: termInput.value,
    slug: slugify(termInput.value, { lower: true }),
    parent: parent._id,
  }
  await attTermsActions.saveItem()
  termInput.value = ''
  showNewTermForm.value = false
}

const handleRemoveTerm = async (term) => {
  if (!confirm('Are you sure?')) return
  attTermsState.selectedItem = term
  attTermsActions.deleteItem()
}

const handleDelete = async (item) => {
  if (!confirm('Are you sure? This attrubute and associated terms will be deleted')) return
  console.log(item)
  state.selectedItem = item
  await actions.deleteItem()
  attTermsState.selectedItems = attTermsState.items.filter((el) => el.parent == item._id)
  await attTermsActions.deleteItems()
}
</script>

<template>
  <div class="attribute">
    <div class="name">{{ item.name }}</div>
          <div>{{ item.type }}</div>
          <div>{{ item.amount }}</div>
          <div>{{ item.products }}</div>
          <div>{{ item.expiry }}</div>

    <div class="actions">
      <NuxtLink class="link" :to="{ name: 'admin-products-coupons-slug', params: { slug: item.slug } }">
        <button class="btn edit"><IconsEditFill /></button>
      </NuxtLink>
      <button class="btn delete" @click="handleDelete(item)"><IconsDeleteFill /></button>
    </div>
  </div>
</template>

<style lang="scss">
.attribute {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  margin-top: 2rem;

  .terms {
    display: flex;
    align-items: center;
    gap: 2rem;

    .terms-list {
      display: flex;
      gap: 1rem;

      .term {
        background-color: #ddd;
        padding: 0.5rem;
        border-radius: 0.5rem;
        font-size: 80%;
        display: flex;
        gap: 1rem;

        .close {
          background-color: #bbb;
          color: #fff;
          cursor: pointer;
        }
      }
    }

    .add-term {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #b3e5fc;
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      cursor: pointer;
    }

    .actions {
      display: flex;
      align-items: center;

      .btn {
        padding: 1rem;
        border: none;
        background-color: transparent;

        &.delete {
          svg {
            fill: #d32f2f;
          }
        }

        &.edit {
          color: #43a047;
        }
      }
    }
  }
}
</style>
