<script setup>
// const prodState = inject('prodState')

defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },
})
defineEmits(['update:modelValue'])

const errorMsg = ref('')
const uuid = useUniqueId().getId()
const selectRef = ref('inputRef')
// const attrs = useAttrs();
</script>

<script>
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div class="base-select">
    <label v-if="label">{{ label }}</label>
    <!-- <div class="custom-select"> -->
    <select
      ref="selectRef"
      :value="modelValue"
      v-bind="$attrs"
      :id="`base-select-${uuid}`"
      :aria-describedby="errorMsg ? `base-input-error-${uuid}` : null"
      :aria-invalid="errorMsg ? true : null"
      :aria-readonly="typeof $attrs.readonly != undefined ? true : null"
      :aria-required="typeof $attrs.required != undefined ? true : null"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" disabled>Select Option</option>
      <option v-for="option in options" :key="option.key" :value="option.key" :selected="modelValue === option.key">
        {{ option.name }}
      </option>
    </select>
    <!-- </div> -->
  </div>
</template>

<style scoped lang="scss">
// .base-select {
//   display: flex;
//   align-items: center;
//   gap: 1rem;

//   select {
//     padding: 0.5rem 1rem;
//   }

//   // class="border border-gray-400 rounded border-b-2 bg-transparent border-b-gray-300 h-10 text-gray-600 focus:outline-none placeholder-transparent focus:invalid:border-b-2 focus:invalid:border-red-600 focus:valid:border-b-2 focus:valid:border-green-600 shadow-sm"
// }
</style>
