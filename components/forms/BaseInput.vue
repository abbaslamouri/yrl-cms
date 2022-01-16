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

const attrs = useAttrs();
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
  <!-- <div class="base-input relative border border-gray-200 roundedpx-1 pt-4 pb-1.5"> -->
  <div class="relative">
    <input
      class="peer w-full shadow-md border border-gray-200 pt-3 pb-2 px-3 focus:outline-none focus:ring-offset-2 focus:ring-2 rounded-md placeholder-transparent"
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
    <!-- {{ $attrs }} -->

    <label
      class="absolute -top-0 left-3 text-xs text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-placeholder-shown:text-sm peer-focus:-top-0 transition-all peer-focus:text-xs"
      :for="`base-input-${uuid}`"
      v-if="label"
    >
      {{ label }}
    </label>
  </div>
</template>

<style scoped lang="scss"></style>
