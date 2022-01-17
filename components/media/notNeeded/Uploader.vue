<script setup>
const mediaStore = inject('mediaStore')
const { state } = mediaStore

// const emit = defineEmits(['fileUploaded', 'errorOccured'])

// const filesToUpload = ref([])
// const showUploadModal = ref(true)
// const cancelAll = ref(false)

// const updateProgress = (file) => {
//   const index = filesToUpload.value.findIndex((item) => item.file.name === file.file.name)
//   if (filesToUpload.value[index].state === 'uploading' || filesToUpload.value[index].state === 'waiting') {
//   	filesToUpload.value[index].progress = file.progress
//   	filesToUpload.value[index].state = file.state
//   }
// }

const uploadStats = (items) => {
  const uploadingItems = computed(() => items.filter((item) => item.state === 'waiting' || item.state === 'uploading'))
  const uploadingItemsCount = uploadingItems.value.length
  const processingItems = computed(() => items.filter((item) => item.state !== 'canceled' && item.state !== 'failed'))
  const processingItemsCount = processingItems.value.length
  const failedItems = computed(() => items.filter((item) => item.state === 'canceled' || item.state === 'failed'))
  const failedItemsCount = failedItems.value.length
  const completeItems = computed(() => items.filter((item) => item.state === 'complete'))
  const completeItemsCount = completeItems.value.length
  const processingItemsProgress = processingItems.value.reduce((total, item) => total + item.progress, 0)
  return { uploadingItemsCount, failedItemsCount, completeItemsCount, processingItemsCount, processingItemsProgress }
}

const overallProgress = computed(() => {
  const { processingItemsCount, processingItemsProgress } = uploadStats(state.filesToUpload)
  if (processingItemsCount < 1) return 0
  return Math.round(processingItemsProgress / processingItemsCount)
})

const uploadingStatus = computed(() => {
  const { uploadingItemsCount, failedItemsCount, completeItemsCount } = uploadStats(state.filesToUpload)
  if (uploadingItemsCount > 0) {
    return `Uploading ${uploadingItemsCount} items`
  } else if (completeItemsCount > 0) {
    return `${completeItemsCount} upload${completeItemsCount > 1 ? 's' : ''} completed`
  } else if (failedItemsCount > 0) {
    return `${failedItemsCount} uploads failed`
  }
})

// watch(
// () => state.filesToUpload,
// (files) => {
// const items = files.map((item) => {
// 	return {
// 		file: item,
// 		progress: 0,
// 		state: 'waiting',
// 		response: null,
// 	}
// })
// filesToUpload.value.unshift(...items)
// }
// )

// const abortUpload = () => {
// 	const { uploadingItemsCount } = uploadStats(state.filesToUpload)
// 	if (uploadingItemsCount) {
// 		if (confirm('Cancel all uploads?')) {
// 			cancelAllUploads()
// 			state.filesToUpload.splice(0)
// 		}
// 	} else {
// 		state.filesToUpload.splice(0)
// 	}
// }

// const cancelAllUploads = () => {
// 	cancelAll.value = true
// 	console.log(cancelAll.value)
// 	state.filesToUpload.map((item) => {
// 		if (item.state === 'waiting' || item.state === 'uploading') {
// 			item.state = 'canceled'
// 			item.progress = 0
// 		}
// 		return item
// 	})
// }

// const handleFileUploaded = (item) => {
//   const index = filesToUpload.value.findIndex((el) => el.file === item.file)
//   filesToUpload.value.splice(index, 1)
//   // filesToUpload.value[index].progress = item.progress
//   // filesToUpload.value[index].state = item.state
//   emit('fileUploaded', item.response)
// }
</script>

<template>
  <div class="uploader" v-if="state.filesToUpload.length">
    {{ state.filesToUpload }}
    <div class="header">
      <span class> {{ uploadingStatus }} </span>
      <div class="total-progress">
        <span class="progress"> {{ overallProgress }}% complete</span>
        <!-- <a href="#" @click="cancelAllUploads" v-if="overallProgress < 100">CANCEL</a> -->
      </div>
      <!-- <div class="controls"> -->
      <!-- <button class="btn toggle" @click="showUploadModal = !showUploadModal"> -->
      <!-- <IconsChevronDown v-if="showUploadModal" /> -->
      <!-- <IconsChevronUp v-else /> -->
      <!-- </button> -->
      <!-- <button class="btn"> -->
      <!-- <IconsClose @click="abortUpload" /> -->
      <!-- </button> -->
      <!-- </div> -->
    </div>
    <div class="items">
      <!-- <div class="total-progress">
				<span class="progress"> {{ overallProgress }}% complete</span>
				<a href="#" @click="cancelAllUploads" v-if="overallProgress < 100">CANCEL</a>
			</div> -->
      <ul class="list-group">
        <!-- <MediaUploadItem v-for="item in state.filesToUpload" :key="item.file.name" :item="item" /> -->
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
