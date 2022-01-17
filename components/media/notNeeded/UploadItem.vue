<script setup>
	import axios from 'axios'

	const mediaStore = inject('mediaStore')
	const utilStore = inject('utilStore')

	const http = axios.create({
		baseURL: 'http://localhost:3000/api',
	})
	const { state } = mediaStore
	const { iconType } = utilStore
	const props = defineProps({
		item: {
			type: Object,
			required: true,
		},
		cancelAll: Boolean,
	})
	let axiosSource = axios.CancelToken.source()
	const uploadItem = reactive({
		file: props.item.file,
		progress: 0,
		state: 'waiting',
		error: '',
		response: null,
	})
	// const hovered = ref(false)

	const isUploading = computed(() => uploadItem.state === 'waiting' || uploadItem.state === 'uploading')
	// const isCanceled = computed(() => uploadItem.state === 'canceled')
	const isComplete = computed(() => uploadItem.state === 'complete')

	onMounted(async () => {
		await upload()
	})

	const upload = async () => {
		try {
			const config = {
				onUploadProgress: (e) => {
					if (e.lengthComputable) {
						uploadItem.progress = Math.round((e.loaded * 100) / e.total)
						const index = state.filesToUpload.findIndex((f) => f.file === uploadItem.file)
						if (index !== -1) state.filesToUpload[index] = uploadItem
					}
				},
				cancelToken: axiosSource.token,
			}
			uploadItem.state = 'uploading'

			const formData = new FormData()
			formData.append('file', uploadItem.file)
			formData.append('folder', state.selectedFolder._id)
			let response
			if (uploadItem.file.type.includes('image')) {
				response = await http.post(`v1/media/image`, formData, config)
			} else {
				response = await http.post(`v1/media/`, formData, config)
			}
			console.log(response)
			uploadItem.response = response.data.doc
			uploadItem.state = 'complete'
			state.files.push(response.data.doc)
			const index = state.filesToUpload.findIndex((f) => f.file === uploadItem.file)
			if (index !== -1) state.filesToUpload.splice(index, 1)
		} catch (err) {
			if (axios.isCancel(err)) {
				console.log('CANCELED')
				uploadItem.state = 'canceled'
			} else {
				console.log('MyErrorxxx', err)
				uploadItem.state = 'failed'
				uploadItem.error = err.response.data.message || err.response.data.statusMessage
				uploadItem.progress = 0
				console.log('MyERROR', err.response)
			}
		}
	}

	// watch(uploadItem, (item) => {
	//   if (item.response && item.progress === 100 && item.state === 'complete') {
	//     // emit('fileUploaded', item)
	//   }
	// })

	// watch(
	// 	() => props.cancelAll,
	// 	(val) => {
	// 		console.log('val', val)
	// 		if (val && (uploadItem.state === 'waiting' || uploadItem.state === 'uploading')) axiosSource.cancel()
	// 		// const index = state.filesToUpload.findIndex((f) => f.file === uploadItem.file)
	// 		// if (index !== -1) state.filesToUpload[index] = uploadItem
	// 	}
	// )

	// const handleRetry = () => {
	// 	console.log('RET')
	// 	uploadItem.state = 'waiting'
	// 	axiosSource = axios.CancelToken.source()
	// 	upload()
	// }
</script>

<template>
	<li class="list-group-item">
		<div class="upload-item">
			<div class="filename">
				<component :is="iconType(uploadItem.file.type)" />
				<span class="filename">{{ uploadItem.file.name }}</span>
				<!-- <span class="failed" v-show="uploadItem.state === 'canceled'">Canceled"</span> -->
			</div>
			<div class="error" v-show="uploadItem.error">{{ uploadItem.error }}</div>
		</div>
		<div class="upload-controls">
			<!-- <template> -->
			<button class="btn progress" v-if="isUploading">
				<MediaProgressRing :progress="uploadItem.progress" />
			</button>
			<!-- <button class="btn waiting" v-if="isCanceled"><IconsExclamation /></button> -->
			<button class="btn complete" v-if="isComplete"><IconsCheck /></button>
			<!-- </template> -->
			<!-- <template v-else>
				<button class="btn cancel" @click="axiosSource.cancel()" v-if="isUploading">
					<IconsClose />
				</button>
				<button class="btn retry" @click="handleRetry" v-else-if="isCanceled">
					<IconsArrowClockwise />
				</button>
				<button class="btn complete" v-if="isComplete">
					<IconsCheck />
				</button>
			</template> -->
		</div>
	</li>
</template>

<style lang="scss" scoped></style>
