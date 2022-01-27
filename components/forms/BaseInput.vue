<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  currency: {
    type: Boolean,
    default: false,
  },
  // focus: {
  //   type: Boolean,
  //   default: false,
  // },
})
defineEmits(['update:modelValue'])

// const attrs = useAttrs();
const inputRef = ref('')
const errorMsg = ref('')
const uuid = useUniqueId().getId()

const placeholderColor = props.label ? 'transparent' : 'inherit'

onMounted(() => {
  // if (!props.modelValue) inputRef.value.focus();
})

// watch(
//   () => props.focus,
//   (current, prev) => {
//     console.log(current);
//     if (current) inputRef.value.focus();
//   }
// );
</script>

<script>
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div class="base-input">
    <div class="currency" v-if="currency">$</div>
    <input
      ref="inputRef"
      :placeholder="placeholder"
      :value="modelValue"
      v-bind="$attrs"
      :id="`base-input-${uuid}`"
      @input="$emit('update:modelValue', $event.target.value)"
      :aria-describedby="errorMsg ? `base-input-error-${uuid}` : null"
      :aria-invalid="errorMsg ? true : null"
      :aria-readonly="typeof $attrs.readonly != undefined ? true : null"
      :aria-required="typeof $attrs.required != undefined ? true : null"
    />
    <label :for="`base-input-${uuid}`" v-if="label">
      <span>
        {{ label }}
      </span>
      <span v-if="inputRef.required">(required)</span>
    </label>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.base-input {
  position: relative;
  --size: 0.5em;
  border-radius: 0.25rem;
  // height: 6rem;
  border: 1px solid $slate-200;
  box-shadow: 0 4px 3px rgb(0 0 0 / 0.07), 0 2px 2px rgb(0 0 0 / 0.06);
  background-color: white;
  // border: 1px solid teal;
  // .custom-select {
  // position: relative;
  // cursor: pointer;

  cursor: text;
  .currency {
    position: absolute;
    top: 1.5rem;
    left: 0.75rem;
  }

  input {
    border: 1px solid $slate-300;
    // padding: 0 0 0 2rem;
    padding: 2rem 1rem 1rem 2rem;
    width: 100%;
    height: 100%;
    // border: 1px solid red;
    background-color: transparent;
    // transform: translateY(1rem);
    // border: 1px solid teal;

    &:focus {
      // outline: 3px solid $sky-300;

      &:placeholder-shown + label {
        transform: translateY(-0.5rem);
        font-size: 80%;
      }

      & + label {
        transform: translateY(-0.5rem);
        font-size: 80%;
      }
    }

    &::placeholder {
      color: v-bind(placeholderColor);
    }

    &:placeholder-shown + label {
      transform: translateY(0.75rem); //lllllllll
    }
  }

  label {
    position: absolute;
    top: 0.75rem;
    left: 2rem;
    // border: 1px solid red;
    font-size: 80%;
    // font-weight: 600;
    color: lighten($color: $color-primary, $amount: 50);
    // position: absolute;
    // top: 0.1rem;
    // left: 0;
    transition: all 0.3s ease;
    // display: block;
    // margin-left: 1.7rem;
    transform: translateY(-0.5rem);
    cursor: text;

    // font-size: 80%;

    // absolute -top-0 left-3 text-xs text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-placeholder-shown:text-sm peer-focus:-top-0 transition-all peer-focus:text-xs
  }
}
</style>
