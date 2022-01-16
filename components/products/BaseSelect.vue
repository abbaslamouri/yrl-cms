<script setup>
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
})
defineEmits(['update:modelValue'])
const attrs = useAttrs()
</script>

<script>
// import TrashVue from '../icons/Trash.vue'

export default {
  inheritAttrs: false,
}
</script>

<template>
  <div class="w-full flex gap-10 items-center border border-gray-200">
    <label class="tracking-wide text-gray-700 font-bold mb-2" for="product-type"> {{ label }}</label>
    <div class="relative">
      <select
        class="
          appearance-none
          w-full
          bg-gray-200
          border border-gray-200
          text-gray-700
          py-3
          px-4
          pr-8
          rounded
          leading-tight
          focus:outline-none focus:bg-white focus:border-gray-500
        "
        id="product-type"
        :value="modelValue"
        v-bind="$attrs"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option v-for="option in options" :key="option.key" :value="option.key" :selected="modelValue === option.key">
          {{ option.value }}
        </option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  </div>
  <!-- <span class="base-select">
    <label v-if="label">
      {{ label }}
    </label>
    <select :value="modelValue" v-bind="$attrs" @change="$emit('update:modelValue', $event.target.value)">
      <option value="">Select Option</option>
      <option v-for="option in options" :key="option.key" :value="option.key" :selected="modelValue === option.key">
        {{ option.value }}
      </option>
    </select>
  </span> -->
</template>

<style scoped lang="scss"></style>
