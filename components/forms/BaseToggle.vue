<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  toogleHeight: {
    type: Number,
    default: 30,
  },
});
defineEmits(['update:modelValue']);
const attrs = useAttrs();
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<template>
  <!-- <div class="base-toggle flex items-center gap-4"> -->
  <label class="toggle">
    <span> {{ label }}</span>
    <input
      class=""
      type="checkbox"
      :checked="modelValue"
      v-bind="$attrs"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="slider round"></span>
  </label>
  <!-- </div> -->
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.toggle {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;

  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider:before {
      left: 50%;
    }
  }

  .slider {
    position: relative;
    display: block;
    cursor: pointer;
    background-color: $slate-600;
    transition: 0.3s;
    width: 60px;
    height: v-bind('`${toogleHeight}px`');

    &:before {
      content: '';
      position: absolute;
      width: 40%;
      height: 80%;
      background-color: $slate-50;
      transition: 0.3s;
      top: 50%;
      left: 10%;
      transform: translateY(-50%);
    }

    &.round {
      border-radius: 15px;

      &::before {
        border-radius: 50%;
      }
    }
  }
}
</style>
