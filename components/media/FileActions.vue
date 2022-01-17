<script setup>
defineEmits(['fileUploadBtnClicked']);

const mediaState = inject('mediaState');
const mediaActions = inject('mediaActions');

const handleDeleteMedia = async () => {
  if (!confirm('Are you sure?')) return;
  await mediaActions.deleteItems();
  await Promise.all([mediaActions.fetchAll(), mediaActions.fetchCount()]);
};

const handleSearch = async () => {
  await Promise.all([mediaActions.fetchAll(), mediaActions.fetchCount()]);
};
</script>

<template>
  <div class="file-actions">
    <button class="btn add-new-file" @click="$emit('fileUploadBtnClicked')">
      <IconsUpload />
      <span>Upload Files</span>
    </button>
    <div class="search-sort">
      <Search v-model="mediaState.query.keyword" @handleSubmit="handleSearch" />
      <MediaSort />
    </div>
    <div class="actions">
      <MediaMoveToFolder />
      <button class="btn delete" v-if="mediaState.selectedItems.length" @click="handleDeleteMedia">
        <IconsDeleteFill />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.file-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;
  padding: 2rem 0;
  border-bottom: 1px #ccc solid;

  // flex justify-between items-center text-sm

  .add-new-file {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid $sky-400;
    color: $sky-600;

    svg {
      fill: $sky-600;
    }
    // add-new-folder flex items-center gap-1 border border-blue-400 px-3 py-1 rounded text-blue-600
  }

  .search-sort {
    display: flex;
    align-items: center;
    gap: 3rem;
    // flex justify-between items-center gap-4
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 2rem;

    .delete {
      svg {
        fill: $red-800;
      }
    }

    .edit {
      svg {
        fill: $green-800;
      }
    }
  }
  //   .btn {
  //     // background-color: transparent;
  //     // color: #4285f4;
  //     // display: flex;
  //     // gap: 1rem;
  //     // align-items: center;
  //     // height: fit-content;
  //     // border: 1px solid teal;
  //     // border-radius: 3px;
  //     // padding: 0.7rem 2rem;
  //     // cursor: pointer;
  //   }

  //   .search {
  //     // display: flex;
  //     // justify-content: space-between;
  //     // align-items: center;
  //     // gap: 2rem;

  //     form {
  //       padding: 0 1.5rem 0 0;
  //       border-radius: 2rem;
  //       background-color: #bdbdbd;
  //       display: flex;
  //       align-items: center;
  //       gap: 1.3rem;
  //       color: #fff;

  //       input {
  //         border: 1px #bdbdbd solid;
  //         padding: 0.6rem 2rem;
  //         border-radius: 2rem 0 0 2rem;
  //       }

  //       .btn {
  //         border: none;
  //         padding: 0;
  //         color: #fff;
  //         svg {
  //           width: 1.7rem;
  //           // height: 2rem;
  //           cursor: pointer;
  //         }
  //       }
  //     }
  //   }

  //   .action-buttons {
  //     display: flex;
  //     align-items: center;
  //     gap: 2rem;

  //     .move {
  //       display: flex;
  //       align-items: center;
  //       gap: 1rem;
  //       font-size: 1.3rem;

  //       select {
  //         padding: 0.7rem 1rem;
  //       }
  //     }

  //     .btn {
  //       padding: 0;
  //       border: none;

  //       &.delete {
  //         svg {
  //           fill: #d32f2f;
  //         }
  //       }

  //       &.edit {
  //         color: #43a047;
  //       }

  //       svg {
  //         width: 2rem;
  //         // height: 2rem;
  //       }
  //     }
  //   }
}
</style>
