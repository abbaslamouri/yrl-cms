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
  // align-items: stretch;
  gap: 0;
  border: 1px solid $slate-400;
  border-radius: 5px;
  // overflow: hidden;
  font-size: 1.3rem;
  height: 4rem;
  background-color: white;

  // gap: 2rem;
  // padding: 1rem 1rem;
  // background-color: $slate-200;

  color: #fff;

  &.selected {
    outline: 3px solid $sky-200;
  }

  input {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    // border: 1px solid $slate-400;
    border: none;
    width: 100%;
    height: 100%;
    // border-radius: 0 0 0 rem;
    // padding: 0.5rem;

    // padding: 0.6rem 2rem;
    // border-radius: 2rem 0 0 2rem;
    color: $slate-600;
  }

  .btn {
    grid-column: 1 / 2;
    grid-row: 1 / 2;

    // border:1px solid red;
    border: none;
    // border-radius: 0;
    padding: 0 1rem;
    // display: flex;
    // align-items: center;
    // background-color: $slate-400;

    svg {
      fill: $slate-500;
      width: 2rem;
      height: 2rem;
    }

    // border: none;
    // background-color: transparent;
    // padding: 0;
    // color: #fff;
    // svg {
    //   width: 1.7rem;
    //   cursor: pointer;
    // }

    // bg-gray-400 w-10 h-7 flex justify-center items-center text-white
  }

  // width: fit-content;
  // margin: 2rem 0;

  //  border border-gray-600 rounded-full overflow-hidden pl-4

  //   input {
  //     // border: 1px #bdbdbd solid;
  //     // padding: 0.6rem 2rem;
  //     // border-radius: 2rem 0 0 2rem;
  //     // color: #666;
  //   }

  //   .btn {
  //     // border: none;
  //     // background-color: transparent;
  //     // padding: 0;
  //     // color: #fff;
  //     // svg {
  //     //   width: 1.7rem;
  //     //   cursor: pointer;
  //     // }
  //   }
}
</style>
