<script setup>
const state = inject('mediaState');
const actions = inject('mediaActions');

const sortByOptions = [
  { key: 'name', name: 'Filename' },
  { key: 'size', name: 'File size' },
  { key: 'dateCreated', name: 'Date Created' },
];

const toggleSort = async () => {
  state.sort.order = state.sort.order == '-' ? `` : `-`;
  state.query.sort = `${state.sort.order}${state.sort.field}`;
  await actions.fetchAll();
};
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

    // flex items-center gap-1 cursor-pointer
  }
  //  text-sm flex gap-8

  //   .sort-by,
  //   .sort-order {
  //     display: flex;
  //     align-items: center;
  //     gap: 1rem;
  //     font-size: 1.3rem;
  //   }

  //   select {
  //     padding: 0.7rem 1rem;
  //   }

  //   .btn {
  //     background-color: transparent;
  //     border: none;
  //     color: #4285f4;
  //     padding: 0;

  //     :hover {
  //       background-color: #e8f0fe;
  //     }

  //     svg {
  //       width: 4.5rem;
  //       height: 4.5rem;
  //       padding: 1rem;
  //       border-radius: 50%;
  //     }
  //   }
}
</style>
