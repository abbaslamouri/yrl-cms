<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'handleSubmit'])

const inputRef = ref('')

const handleInput = (event) => {
  if (!event.target.value) {
    emit('update:modelValue', event.target.value)
    emit('handleSubmit')
  } else {
    emit('update:modelValue', event.target.value)
  }
}
</script>

<template>
  <form class="search base-input shadow-md" @submit.prevent="$emit('handleSubmit')">
    <button type="submit" class="btn">
      <IconsSearchFill />
    </button>
    <input
      type="text"
      :value="modelValue"
      placeholder="Search"
      aria-label="Search"
      @input="handleInput"
      ref="inputRef"
      @click.prevent="inputRef.closest('form').classList.add('selected')"
      @blur="inputRef.closest('form').classList.remove('selected')"
    />
  </form>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.search {
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: 1fr;
  gap: 0;
  border: 1px solid $slate-400;
  border-radius: 5px;
  font-size: 1.3rem;
  height: 4rem;
  background-color: white;
  color: #fff;
  min-width:25rem;

  &.selected {
    outline: 3px solid $sky-200;
  }

  input {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    border: none;
    width: 100%;
    height: 100%;
    color: $slate-600;
  }

  .btn {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    border: none;
    padding: 0 1rem;

    svg {
      fill: $slate-500;
      width: 2rem;
      height: 2rem;
    }
  }

  
}
</style>
