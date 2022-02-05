<script setup>
const state = inject('mediaState')
const actions = inject('mediaActions')

const sortByOptions = [
  { key: 'name', name: 'Filename' },
  { key: 'size', name: 'File size' },
  { key: 'dateCreated', name: 'Date Created' },
]

const toggleSort = async () => {
  state.sort.order = state.sort.order == '-' ? `` : `-`
  state.query.sort = `${state.sort.order}${state.sort.field}`
  await actions.fetchAll()
}
</script>

<template>
  <div class="sort">
    <div class="sort-field">
      <FormsBaseSelect :options="sortByOptions" v-model="state.sort.field" label="Sort by" />
    </div>
    <div class="sort-order" @click="toggleSort">
      <span>Sort Order</span>
      <button class="btn">
        <IconsSouth v-if="state.sort.order == '-'" />
        <IconsNorth v-else />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.sort {
  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: 1.2rem;

  .sort-field{
    min-width:15rem;
  }

  .sort-order {
    display: flex;
    align-items: center;

    button {
      border: none;
      background-color: transparent;

      svg {
        fill: $sky-600;
        width: 2rem;
        height: 2rem;
      }
    }
  }
}
</style>
