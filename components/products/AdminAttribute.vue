<script setup>
import slugify from 'slugify';
import { useError } from '~/pinia/useError';

const attState = inject('attState');
const attActions = inject('attActions');
const attTermsState = inject('attTermsState');
const attTermsActions = inject('attTermsActions');

const props = defineProps({
  attribute: {
    type: Object,
    required: true,
  },
  i: {
    type: Number,
  },
});

const appError = useError();

// const showNewTermForm = ref(false); // Tp toggle new term form
const showActions = ref(false);
const newTerm = ref('');
const attInputFocus = ref(false);
const termInputRef = ref(null);

// const handletermInputRefBtnClick = async (index) => {
//   console.log('REF', termInputRef.value);
//   showNewTermForm.value = true;
//   setTimeout(() => {
//     termInputRef.value.focus();
//   }, 10);
// };

const deleteAttribute = async () => {
  if (!confirm('Are you sure? This attribute and all associated terms will be deleted')) return;
  attState.selectedItem = props.attribute;
  await attActions.deleteItem();
  attTermsState.selectedItems = attTermsState.items.filter((el) => el.parent == props.attribute._id);
  await attTermsActions.deleteItems();
};

const addAttributeTerm = async () => {
  if (!props.attribute.name) {
    appError.setSnackbar(true, 'Please add attribute name and save before adding terms ', 'Error');
    return;
    // attInputFocus.value = true;
  }
  attTermsState.selectedItem = {
    name: newTerm.value,
    slug: slugify(newTerm.value, { lower: true }),
    parent: props.attribute._id,
  };
  await attTermsActions.saveItem();
  newTerm.value = '';
};

const deleteTerm = async (term) => {
  if (!confirm('Are you sure?')) return;
  attTermsState.selectedItem = term;
  attTermsActions.deleteItem();
};

const checkIfAttribute = () => {
  if (!props.attribute.name || !props.attribute.name.trim()) {
    newTerm.value = '';
    return appError.setSnackbar(true, 'Please add attribute name and save before adding terms ', 'Error');
    // attInputFocus.value = true;
  }
  if (!props.attribute._id) {
    newTerm.value = '';
    return appError.setSnackbar(true, 'Please save attribute before adding terms ', 'Error');
    // attInputFocus.value = true;
  }
};

// const toggleInputFieldVisibility = () => {
// console.log(termInputRef.value);
// emit('toggleInputFieldVisibility', props.i);
// termInputRef.value.classList.remove('hidden');
// termInputRef.value.focus();
// };
</script>

<template>
  <div class="attribute">
    <div class="name td">
      <FormsBaseInput
        required
        placeholder="Add New Attribute Name (Example: Color, Size ...)"
        v-model="attState.items[i].name"
      />
    </div>
    <div
      class="terms td shadow-md"
      @click="
        termInputRef.classList.remove('hidden');
        termInputRef.focus();
      "
    >
      <div
        class="list"
        v-for="(term, j) in attTermsState.items.filter((el) => el.parent == props.attribute._id)"
        :key="term"
      >
        <span>{{ term.name }}</span>
        <IconsClose @click="deleteTerm(term)" />
      </div>
      <div class="form-group" @click="checkIfAttribute">
        <input
          class="hidden"
          ref="termInputRef"
          type="text"
          v-model="newTerm"
          placeholder="Add New Attribute Term (Example:
        Green, Blue, Green ...)"
          :disabled="attState.items[i].name == ''"
          @keyup.enter.prevent="addAttributeTerm"
          @blur="termInputRef.classList.add('hidden')"
        />
      </div>
    </div>
    <div class="actions td">
      <button class="btn" @click.prevent="showActions = !showActions"><IconsMoreHoriz /></button>
      <div class="menu shadow-md" v-show="showActions">
        <a href="#" class="link"><div class="advanced">Advanced</div></a>
        <a href="#" class="link" @click.prevent="deleteAttribute" v-if="attribute._id">
          <div class="cancel">Delete</div>
        </a>
        <a href="#" class="link" @click.prevent="attState.items.splice(i, 1)" v-else>
          <div class="cancel">Cancel</div>
        </a>
      </div>
    </div>
    <!-- <div class="name">{{ attribute.name }}</div>
    <div class="terms">
      <div class="terms-list">
        <div class="term" v-for="term in terms" :key="term.slug">
          <span>{{ term.name }}</span>
          <span class="close" @click="deleteTerm(term)">X</span>
        </div>
      </div>
      <div v-if="showNewTermForm" class="add-term" @click="showNewTermForm = false">-</div>
      <div v-else class="add-term" @click="handletermInputRefBtnClick">+</div>
      <form v-show="showNewTermForm" @submit.prevent="handleAddNewTerm(item)">
        <input type="text" v-model="termInput" ref="termInputRef" />
        <button class="btn">Save</button>
      </form>
    </div>
    <div class="actions">
      <NuxtLink class="link" :to="{ name: 'admin-products-attributes-slug', params: { slug: item.slug } }">
        <button class="btn edit"><IconsEditFill /></button>
      </NuxtLink>
      <button class="btn delete" @click="handleDelete(item)"><IconsDeleteFill /></button>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.attribute {
  font-size: 1.2rem;

  // .name {
  //   input {
  //     padding: 15rem !important;
  //     color: red !important;
  //   }

  //   // border: 1px solid red;
  // }

  .terms {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    border: 1px solid $slate-200;
    padding: 0.7rem 2rem;
    cursor: text;

    .list {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border: 1px solid $slate-300;
      background-color: white;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      font-weight: 500;
    }

    .form-group {
      width: 100%;
      flex: 1;

      input {
        width: 100%;
        font-size: 1.2rem;
        width: 100%;

        &:disabled {
          // background-color: #ddd;
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }

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

  .actions {
    // border: 1px solid red;

    position: relative;
    justify-self: flex-end;

    .btn {
      // border: none;
      padding: 0.5rem;
      border-radius: 5px;
    }

    .menu {
      position: absolute;
      top: -40%;
      right: 100%;
      border: 1px solid $slate-300;
      padding: 1rem 2rem;
      background-color: white;
      z-index: 9;
      font-size: 1.4rem;

      .cancel {
        color: $red-500;
      }
    }
  }

  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  // background-color: #f5f5f5;
  // margin-top: 2rem;

  // .terms {
  //   display: flex;
  //   align-items: center;
  //   gap: 2rem;

  //   .terms-list {
  //     display: flex;
  //     gap: 1rem;

  //     .term {
  //       background-color: #ddd;
  //       padding: 0.5rem;
  //       border-radius: 0.5rem;
  //       font-size: 80%;
  //       display: flex;
  //       gap: 1rem;

  //       .close {
  //         background-color: #bbb;
  //         color: #fff;
  //         cursor: pointer;
  //       }
  //     }
  //   }

  //   .add-term {
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //     background-color: #b3e5fc;
  //     width: 4rem;
  //     height: 4rem;
  //     border-radius: 50%;
  //     cursor: pointer;
  //   }

  //   .actions {
  //     display: flex;
  //     align-items: center;

  //     .btn {
  //       padding: 1rem;
  //       border: none;
  //       background-color: transparent;

  //       &.delete {
  //         svg {
  //           fill: #d32f2f;
  //         }
  //       }

  //       &.edit {
  //         color: #43a047;
  //       }
  //     }
  //   }
  // }
}
</style>
