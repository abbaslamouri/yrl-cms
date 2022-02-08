<script setup>
// import { useError } from '~/pinia/useError'

const route = useRoute()
// const appError = useError()
const { state: folderState, actions: folderActions } = useFactory('folders')
const { state: mediaState, actions: mediaActions } = useFactory('media')

provide('folderState', folderState)
provide('folderActions', folderActions)
provide('mediaState', mediaState)
provide('mediaActions', mediaActions)

defineEmits(['mediaSelected', 'mediaSelectCancel'])

const showDropZone = ref(false)
const itemsToUpload = ref([])

//Pagination
const page = ref(1)
const perPage = ref(10)
const pages = computed(() =>
  mediaState.totalItemCount % perPage.value
    ? parseInt(mediaState.totalItemCount / perPage.value) + 1
    : parseInt(mediaState.totalItemCount / perPage.value)
)

// Set folder query
folderState.query.fields = 'name,slug'
folderState.sort.field = 'name'
folderState.sort.order = ''

// Set media query
mediaState.query.fields = 'name, filename, folder, path, mimetype'
mediaState.query.page = 1
mediaState.query.limit = perPage.value
mediaState.query.populate = 'folder'
mediaState.sort.field = 'name'
mediaState.sort.order = ''
mediaState.query.sort = `${mediaState.sort.order}${mediaState.sort.field}`

// Fetch all folders, media and media count
await Promise.all([folderActions.fetchAll(), mediaActions.fetchAll(), mediaActions.fetchCount()])

const handleFileUploadBtnClicked = () => {
  if (!folderState.selectedItem._id) appError.setSnackbar(true, 'Please selecet a folder', 'Error', 0)
  else showDropZone.value = !showDropZone.value
}

const handleUplodItemsSelected = async (ulploadItems) => {
  showDropZone.value = false
  for (const prop in ulploadItems) {
    mediaState.items.unshift({
      uploadState: 'uploading',
      uploadProgress: 0,
      file: ulploadItems[prop],
    })
  }
}

const setPage = (currentPage) => {
  page.value = currentPage
  mediaState.query.page = currentPage
  mediaActions.fetchAll()
}
</script>

<template>
  <div class="media-uploader">
    <div class="folders shadow-md">
      <h3 class="title">Folders</h3>
      <div class="content">
        <MediaFolderActions />
        <MediaFolderList v-if="folderState.items.length" />
      </div>
    </div>
    <div class="files shadow-md">
      <h3 class="title">Files</h3>
      <div class="content">
        <MediaFileActions @fileUploadBtnClicked="handleFileUploadBtnClicked" />
        <transition name="dropZone">
          <MediaDropZone
            v-show="showDropZone"
            @fileUploadBtnClicked="handleFileUploadBtnClicked"
            @uploadItemsSelected="handleUplodItemsSelected"
          />
        </transition>
        <MediaFileList :itemsToUpload="itemsToUpload" />
        <Pagination :page="page" :pages="pages" @pageSet="setPage" v-if="pages > 1" />
      </div>
    </div>
    <div class="media-select-actions">
      <button
        class="btn btn-primary"
        @click="$emit('mediaSelected', mediaState.selectedItems)"
        v-if="route.name !== 'admin-media'"
      >
        Selct
      </button>
      <button
        v-if="route.name !== 'admin-media'"
        class="btn btn-secondary cancel"
        @click="$emit('mediaSelectCancel', mediaState.selectedItems)"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.media-uploader {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 1rem;

  .folders {
    display: flex;
    flex-direction: column;
    background-color: white;

    .title {
      text-align: center;
      background-color: $slate-300;
      padding: 1rem;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 1rem;
    }
  }

  .files {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;

    .title {
      text-align: center;
      background-color: $slate-300;
      padding: 1rem;
    }

    .content {
      padding: 1rem;
    }
  }

  .media-select-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 0 4rem;

    .btn {
      font-size: 1.4rem;
      padding: 1rem 2rem;
    }
  }
}
</style>
