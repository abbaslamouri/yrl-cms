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
})
defineEmits(['update:modelValue'])
</script>

<template lang="">
  <div class="mb-6">
    <label class="block text-gray-500 font-bold" for="product-name"> {{ label }} </label>
    <input
      class="
        bg-gray-200
        block
        appearance-none
        border-2 border-gray-200
        rounded
        w-full
        py-2
        px-4
        text-gray-700
        leading-tight
        focus:bg-white focus:shadow-outline
      "
      id="product-name"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style lang=""></style>
