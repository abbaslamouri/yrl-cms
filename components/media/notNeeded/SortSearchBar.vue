<script setup>
import SearchFill from '~~/components/icons/SearchFill.vue'
const props = defineProps({
  modelValue: String,
})
const emit = defineEmits(['sortParamsChanged'])

const sort = reactive({
  field: 'name',
  order: '',
})


const toggleSortOrder = () => {
  sort.order = sort.order ? '' : '-'
  emit('sortParamsChanged', sort)
}

const SelectSortField = (event) => {
  sort.field = event.target.value
  emit('sortParamsChanged', sort)
}
</script>

<template>
  <div class="sort-search-bar">
    <h2>Files</h2>
    <!-- <teleport to="#nav-search-form"> -->
    <!-- <MediaSearchBar v-model="query.q" />QQ={{ query.q }} -->
    <form class="media-search-form">
      <input
        @keydown.enter.prevent="$emit('update:modelValue', $event.target.value)"
        @keydown.esc.prevent="$emit('update:modelValue', '')"
        class="form-control"
        type="text"
        :value="modelValue"
        placeholder="Search"
        aria-label="Search"
      />
      <SearchFill />
    </form>
    <!-- </teleport> -->
    <div class="sort-toggler">
      <div class="sort-by">
        <span>Sort by</span>
        <select @change="SelectSortField">
          <option value="name">Filename</option>
          <option value="size">File size</option>
        </select>
      </div>
      <div class="sort-order">
        <span>Sort Order</span>
        <button @click="toggleSortOrder" class="btn">
          <IconsArrowUp v-if="!sort.order" />
          <IconsArrowDown v-else />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sort-search-bar {
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #bdbdbd solid;

  form {
    // border: 1px grey solid;
    padding: 0 2rem 0 0;
    border-radius: 2rem;
    background-color: #bdbdbd;
    display: flex;
    align-items: center;
    gap: 1.3rem;
    color: #fff;

    input {
      border: 1px #bdbdbd solid;
      padding: 1rem 2rem;
      border-radius: 2rem 0 0 2rem;
    }

    svg {
      width: 2rem;
      height: 2rem;
      cursor: pointer;
    }
  }

  .sort-toggler {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    gap: 4rem;

    .sort-by,
    .sort-order {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    select {
      padding: 1rem 3rem;
    }

    button {
      background-color: transparent;
      border: none;
      color: #4285f4;

      // gap: 1rem;
      // align-items: center;
      // border: 1px solid teal;
      padding: 0;
      // padding: 1rem;
      // border-radius: 3px;
      // padding: 0.7rem 2rem;

      :hover {
        background-color: #e8f0fe;
      }
      // display: flex;

      svg {
        width: 4.5rem;
        height: 4.5rem;
        padding: 1rem;
        border-radius: 50%;
      }
    }
  }
}
</style>
