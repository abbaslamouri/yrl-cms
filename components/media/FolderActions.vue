<script setup>
import { useError } from '~/pinia/useError';

const appError = useError();
const folderState = inject('folderState');
const folderActions = inject('folderActions');
const mediaState = inject('mediaState');
const mediaActions = inject('mediaActions');

const showForm = ref(false);

const toggleSort = async () => {
  folderState.sort.order = folderState.sort.order == '-' ? `` : `-`;
  folderState.query.sort = `${folderState.sort.order}${folderState.sort.field}`;
  await folderActions.fetchAll();
};

const setSelectedFolder = (event) => {
  folderState.selectedItem = event;
  showForm.value = true;
};

const handleSave = () => {
  folderActions.saveItem();
  showForm.value = false;
};

const handleDelete = async () => {
  if (!confirm('Are you sure?')) return;
  if (mediaState.items.length) {
    const errorMsg = 'You cannot delete non-empty folders';
    appError.setSnackbar(true, errorMsg);
  } else {
    await folderActions.deleteItem();
    folderState.selectedItem = {};
    delete mediaState.query.folder;
    await mediaActions.fetchAll();
  }
};
</script>

<template>
  <div class="folder-actions">
    <div class="new-folder">
      <button class="btn add-new-folder" @click="setSelectedFolder({ name: '' })">
        <IconsFolderPlus />
        <span> New Folder </span>
      </button>
      <transition name="folder-form">
        <form class="form" v-if="showForm" @submit.prevent="handleSave">
          <FormsBaseInput type="text" label="Folder" v-model="folderState.selectedItem.name" />
          <div class="actions">
            <button class="submit btn btn-primary" type="submit">OK</button>
            <button class="submit btn btn-secondary" @click.prevent="showForm = false">Cancel</button>
          </div>
        </form>
      </transition>
    </div>
    <div class="sort-actions">
      <div class="sort" @click="toggleSort">
        <span>Sort Order</span>
        <button class="btn">
          <IconsSouth v-if="folderState.sort.order == '-'" />
          <IconsNorth v-else />
        </button>
      </div>
      <div class="actions" v-if="folderState.selectedItem._id">
        <button class="btn edit" @click="setSelectedFolder(folderState.selectedItem)">
          <IconsEditFill />
        </button>
        <button class="btn delete" @click="handleDelete">
          <IconsDeleteFill />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.folder-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: 1rem 2rem;
  // border-bottom: 1px #ccc solid;
  // font-size: 1.3rem;

  .new-folder {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    align-items: center;

    .add-new-folder {
      // flex: 1 auto;
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

    .form {
      display: flex;
      align-items: center;

      gap: 1rem;

      .actions {
        display: flex;
        gap: 0.5rem;
      }
    }

    //   .btn {
    //     &.add-new-folder {
    //       background-color: transparent;
    //       color: #4285f4;
    //       display: flex;
    //       align-items: center;
    //       gap: 1rem;
    //       border: 1px solid teal;
    //       border-radius: 3px;
    //       padding: 0.4rem 2rem;
    //       font-size: 1.2rem;
    //       margin-right: 2rem;
    //     }

    //     svg {
    //       width: 2rem;
    //     }
  }
  .sort-actions {
    display: flex;
    align-items: center;
    gap: 4rem;
    font-size: 1.4rem;

    .sort {
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

    .actions {
      display: flex;
      gap: 1rem;

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

    // class="sort-order flex items-center gap-1 cursor-pointer"

    // flex items-center gap-10
  }

  //   form {
  //     display: flex;
  //     align-items: center;
  //     gap: 1.5rem;

  //     input {
  //       background-color: #e3f2fd;
  //       border-bottom: 1px solid grey;
  //     }
  //     .actions {
  //       display: flex;
  //       align-items: center;
  //       gap: 0.5rem;
  //     }
  //   }
}

// .actions {
//   display: flex;
//   align-items: center;
//   gap: 3rem;

//   .edit-delete {
//     display: flex;
//     align-items: center;
//     gap: 1rem;

//     span {
//       cursor: pointer;

//       &.edit {
//         color: green;
//       }

//       &.delete {
//         svg {
//           fill: red;
//         }
//       }
//     }
//   }

//   .sort-order {
//     display: flex;
//     align-items: center;
//     gap: 1rem;

//     button {
//       border: none;
//       cursor: pointer;
//       background-color: transparent;

//       svg {
//         width: 2rem;
//         height: 2rem;
//         fill: #4285f4;
//       }
//     }
//   }
// }
// }
</style>
