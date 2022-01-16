<script setup>
const props = defineProps({
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
  leadingIcon: {
    type: String,
    default: '',
  },
  trailingIcon: {
    type: String,
    default: '',
  },
  alternateTrailingIcon: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);
const attrs = useAttrs();
</script>

<script>
// import TrashVue from '../icons/Trash.vue'

export default {
  inheritAttrs: false,
};
</script>

<template>
  <div class="base-select flex items-center gap-4 ">
    <label
      class="text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-gray-400"
      v-if="label"
    >
      {{ label }}
    </label>
    <select
      class="border border-gray-400 rounded border-b-2 bg-transparent border-b-gray-300 h-10 text-gray-600 focus:outline-none placeholder-transparent focus:invalid:border-b-2 focus:invalid:border-red-600 focus:valid:border-b-2 focus:valid:border-green-600 shadow-sm"
      :value="modelValue"
      v-bind="$attrs"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="">Select Option</option>
      <option v-for="option in options" :key="option.key" :value="option.key" :selected="modelValue === option.key">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss"></style>
