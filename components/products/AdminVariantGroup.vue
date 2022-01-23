<script setup>
const prodState = inject('prodState');

defineProps({
  variantGroup: {
    type: Object,
  },
  i: {
    type: Number,
  },
});

const newVariantGroupOption = ref('');
const showGroupActions = ref(false);
const showOptionInput = ref(false);

const addVariantGroupOption = () => {
  prodState.selectedItem.variantGroups[0].options.unshift({
    name: newVariantGroupOption.value,
  });
  newVariantGroupOption.value = '';
};
</script>

<template>
  <li class="admin-variant-group">
    <div class="group-name item">
      <FormsBaseInput
        label="Group Name (Example: Color, Size ...)"
        v-model="prodState.selectedItem.variantGroups[i].name"
      />
    </div>
    <div class="group-options item" :class="`item-${i}`">
      <ul>
        <li v-for="(option, j) in prodState.selectedItem.variantGroups[i].options" :key="option">
          <span>{{ option.name }}</span>
          <IconsClose />
        </li>
        <li class="input-item">
          <input
            class="option-input"
            type="text"
            v-model="newVariantGroupOption"
            placeholder="Add New Group Option (Example: Green, Blue, Green ...)"
            :disabled="prodState.selectedItem.variantGroups[0].name == ''"
            @keyup.enter="addVariantGroupOption"
          />
        </li>
      </ul>
    </div>
    <div class="group-actions item">
      <button class="btn" @click="showGroupActions = !showGroupActions"><IconsMoreHoriz /></button>
      <div class="menu shadow-md" v-show="showGroupActions">
        <a href="#" class="link"><div class="advanced">Advanced</div></a>
        <a href="#" class="link"><div class="cancel">cancel</div></a>
      </div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.admin-variant-group {
  .item {
    &:nth-of-type(1) {
      grid-column: 1 / 5;
    }
    &:nth-of-type(2) {
      grid-column: 5 / 11;
    }
    &:nth-of-type(3) {
      grid-column: 12/ 13;
    }
  }
  // .group-name {
  // border: 1px solid red;
  // }

  .group-options {
    // border: 1px solid red;
    cursor: text;

    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      border: 1px solid $slate-400;
      padding: 0.7rem 2rem;

      li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border: 1px solid $slate-300;
        background-color: white;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-size: 1.2rem;
        font-weight: 500;

        &.input-item {
          display: block;
          width: 100%;
          input {
            width: 100%;
          }
        }

        svg {
          width: 1.2rem;
          height: 1.2rem;
          background-color: $slate-500;
          fill: $slate-50;
          padding: 0.1rem;
          border-radius: 50%;
        }
      }
    }
  }

  .group-actions {
    position: relative;
    align-self: center;
    justify-self: center;

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
}
</style>
