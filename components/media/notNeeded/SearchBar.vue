<script setup>
const props = defineProps({
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <form class="media-search-form">
    <div class="form-group flex-center-center">
      <input
        @keydown.enter.prevent="$emit('update:modelValue', $event.target.value)"
        @keydown.esc.prevent="$emit('update:modelValue', '')"
        class="form-control"
        type="text"
        :value="modelValue"
        placeholder="Search"
        aria-label="Search"
      />
      <IconsSearchFill />
    </div>
  </form>
</template>

<style lang="scss">
.media-search-form {
  .form-group {
    input {
      border: 1px #ccc solid;
      padding: 1rem 2rem;
    }

    svg {
      background: #ccc;
      width: 2rem;
      height: 4rem;
      height: 100%;
    }
  }
}
</style>
