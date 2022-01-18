<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
});
defineEmits(['update:modelValue']);

// const attrs = useAttrs();
const errorMsg = ref('');
const uuid = useUniqueId().getId();
const inputRef = ref('');
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<template>
  <div class="baseInput">
    <input
      ref="inputRef"
      :placeholder="label"
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
      {{ label }}
    </label>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.baseInput {
  position: relative;
  color: $slate-600;
  font-size: 1.4rem;
  // margin-bottom: 2rem;
  // min-width: 100%;

  input {
    border: 1px solid $slate-300;
    padding: 1.5rem 0.75rem 1rem 0.75rem;
    min-width: 100%;

    // z-index: 9;

    &:focus {
      outline: 3px solid $sky-300;

      &:placeholder-shown + label {
        transform: translateY(0);
        font-size: 90%;
      }

      & + label {
        transform: translateY(0);
      }
    }

    &::placeholder {
      color: transparent;
    }

    &:placeholder-shown + label {
      transform: translateY(1.5rem);
    }
  }

  label {
    position: absolute;
    top: 0.1rem;
    left: 0;
    transition: all 0.3s;
    display: block;
    margin-left: 0.9rem;
    // transform: translateY(-4.2rem);
    // font-size: 80%;

    // absolute -top-0 left-3 text-xs text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-placeholder-shown:text-sm peer-focus:-top-0 transition-all peer-focus:text-xs
  }
}
</style>
