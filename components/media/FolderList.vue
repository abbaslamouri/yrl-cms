<script setup>
const folderState = inject('folderState');
const mediaState = inject('mediaState');
const mediaActions = inject('mediaActions');

const folders = computed(() => folderState.items);

const handleSelectFolder = async (selectedFolder) => {
  if (Object.values(selectedFolder).length) {
    mediaState.query.folder = selectedFolder._id;
  } else {
    delete mediaState.query.folder;
  }
  folderState.selectedItem = selectedFolder;
  await Promise.all([mediaActions.fetchAll(), mediaActions.fetchCount()]);
};
</script>

<template>
  <div class="folder-list" v-if="folders.length">
    <button
      class="btn folder"
      :class="{ selected: !folderState.selectedItem || !folderState.selectedItem._id }"
      @click="handleSelectFolder({})"
    >
      <IconsFolder />
      <span>All</span>
    </button>
    <button
      class="btn folder"
      v-for="folder in folders"
      :key="folder._id"
      :class="{ selected: folderState.selectedItem && folderState.selectedItem._id === folder._id }"
      @click="handleSelectFolder(folder)"
    >
      <IconsFolder />
      <span>{{ folder.name }}</span>
    </button>
  </div>
</template>
<style lang="scss" scoped>
@import '@/assets/scss/variables';

// .selected {
//   background-color: #e3f2fd;
// }
.folder-list {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-evenly;
  gap: 2rem;
  // padding: 1rem;

  .btn {
    display: flex;
    align-items: center;
    gap:.5rem;
    // width: auto;

    &.selected {
      background-color: $slate-200;
    }
    // border border-gray-400 flex justify-between items-center gap-2 px-4 py-1 rounded hover:bg-gray-900 hover:text-white text-gray-800 text-sm

    // border border-gray-400 flex justify-between items-center gap-2 px-4 py-1 rounded hover:bg-gray-900 hover:text-white text-gray-800 text-sm
  }

  //   .btn {
  //     display: flex;
  //     align-items: center;
  //     gap: 1rem;
  //     color: #263238;
  //     background-color: #fff;

  //     cursor: pointer;
  //     border: 1px solid grey;
  //     padding: 0.5rem 3rem;
  //     border-radius: 3px;

  //     svg {
  //       width: 1.5rem;
  //     }

  //     span {
  //       color: #303030;
  //     }

  //     &.selected {
  //       background-color: #e3f2fd;
  //     }
  //   }
}
</style>
