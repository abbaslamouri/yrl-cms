<script setup>
	// const http = useHttp()
	const router = useRouter()
	const { updateDoc: updateMedia, deleteDoc: deleteMedia, errorMsg: mediaErrorMsg } = useHttp('media')

	const props = defineProps({
		files: Array,
		folders: Array,
		mediaQuery: Object,
		showMediaContextMenu: Boolean,
	})
	const emit = defineEmits([
		'fileUploaded',
		'errorOccured',
		'fileDeleted',
		'fileUpdated',
		'mediaQueryParamsChanged',
		'fileMovedToFolder',
		'toggleMediaContextMenuVisibility',
	])

	const selectedFiles = ref([])
	const showMediaFormModal = ref(false)
	const showMediaViewModal = ref(false)
	const errorMsg = ref('')
	const snackBar = reactive({})
	const showDropZone = ref(false)
	const droppedFiles = ref([])
	const filePopupTop = ref(0)
	const filePopupLeft = ref(0)
	const showFileActionsPopup = ref(false)
	const contectMenu = ref(false)

	provide('selectedFiles', selectedFiles)

	watchEffect(async () => {
		const errMsg = mediaErrorMsg.value ? mediaErrorMsg.value : errorMsg.value ? errorMsg.value : null
		if (errMsg) {
			snackBar.message = errMsg
			snackBar.type = 'error'
			snackBar.show = true
		}
	})

	const handleFileUploaded = (newFile) => {
		showDropZone.value = false
		const index = droppedFiles.value.findIndex((item) => item.name === newFile.originalname)
		droppedFiles.value.splice(index, 1)
		console.log(droppedFiles.value)
		emit('fileUploaded', newFile)
	}

	const handleFileRightClick = (eventObj) => {
		console.log(eventObj)
		filePopupLeft.value =
			eventObj.event.pageX > window.screen.width - 300 ? window.screen.width - 300 : eventObj.event.pageX
		filePopupTop.value = eventObj.event.pageY
		// showFileActionsPopup.value = true
		emit('toggleMediaContextMenuVisibility', true)

		selectedFiles.value = Array.from(eventObj.selectedFiles)
	}

	const handleUpdateFile = async (updatedFile) => {
		const payload = {
			originalname: updatedFile.originalname,
			folder: updatedFile.folder,
		}
		const response = await updateMedia(updatedFile._id, payload)
		console.log('RESPONSE', response)
		if (!mediaErrorMsg.value) {
			showMediaFormModal.value = false
			selectedFiles.value.splice(0)
			const newFile = props.files.find((item) => item._id === updatedFile._id)
			newFile.originalname = updatedFile.originalname
			newFile.folder = updatedFile.folder
			emit('fileUpdated', newFile)
		}
	}

	const handleDeleteMedia = async () => {
		if (!confirm('Are you sure?')) return
		for await (const file of selectedFiles.value) {
			const response = await deleteMedia(file._id)
			if (!mediaErrorMsg.value) {
				console.log('RESPONSE', response)
				emit('fileDeleted', file._id)
			}
		}
		selectedFiles.value.splice(0)
	}

	//Closes the file right click menu and opens the file rename modal
	const handleRenameFile = () => {
		if (!selectedFiles.value.length) {
			snackBar.message = 'Please selecte a file'
			snackBar.show = true
		} else if (selectedFiles.value.length > 1) {
			snackBar.message = 'You can only rename one file at a time'
			snackBar.show = true
		} else {
			showFileActionsPopup.value = false
			showMediaFormModal.value = true
		}
	}

	//Closes the file right click menu and opens the file rename modal
	const handleViewFile = () => {
		if (!selectedFiles.value.length) {
			snackBar.message = 'Please selecte a file'
			snackBar.show = true
		} else if (selectedFiles.value.length > 1) {
			snackBar.message = 'You can only rename one file at a time'
			snackBar.show = true
		} else {
			showFileActionsPopup.value = false
			showMediaViewModal.value = true
		}
	}

	const handleMoveImagesToFolder = async (event) => {
		const newFolderSlug = event.target.value
		for await (const file of selectedFiles.value) {
			await updateMedia(file._id, { folder: newFolderSlug })
			if (!mediaErrorMsg.value) {
				emit('fileMovedToFolder', file)
			}
		}
		selectedFiles.value.splice(0)
		router.push({ name: 'admin-media-folder', params: { folder: newFolderSlug } })
	}

	const handleCancel = () => {
		selectedFiles.value.splice(0)

		showMediaFormModal.value = false
	}
</script>

<template>
	<div class="files">
		<MediaFileActions
			:folders="folders"
			:mediaQuery="mediaQuery"
			@toggleDropZoneVisibility="showDropZone = !showDropZone"
			@mediaQueryParamsChanged="$emit('mediaQueryParamsChanged', $event)"
			@deleteMedia="handleDeleteMedia"
			@moveImagesToFolder="handleMoveImagesToFolder"
		/>

		<!-- // Files to upload drop zone -->
		<MediaDropZone v-show="showDropZone" @filesDropped="droppedFiles = Array.from($event)" />

		<!-- // File uploader -->
		<MediaUploaderModal
			:droppedFiles="droppedFiles"
			@fileUploaded="handleFileUploaded"
			@errorOccured="errorMsg = $event.message || $event.statusMessage"
		/>

		<!-- Shows right click menu -->
		<MediaFileActionsPopup
			v-show="showMediaContextMenu"
			:left="filePopupLeft"
			:top="filePopupTop"
			@cancel="$emit('toggleMediaContextMenuVisibility', false)"
			@viewFile="handleViewFile"
			@renameFile="handleRenameFile"
			@deleteFile="handleDeleteMedia"
		/>

		<Modal v-show="showMediaFormModal" @cancel="handleCancel">
			<template v-slot:header>
				<h1>Update File</h1>
			</template>
			<MediaFileForm
				:file="selectedFiles[0]"
				@cancel="handleCancel"
				@updateFile="handleUpdateFile"
				v-if="selectedFiles.length"
			/>
			<template v-slot:footer>
				<!-- <ErrorMsg :errorMsg="errorMsg" v-if="errorMsg" /> -->
			</template>
		</Modal>

		<Modal v-show="showMediaViewModal" @cancel="showMediaViewModal = false">
			<template v-slot:header>
				<h1>Update File</h1>
			</template>
			<MediaFileView :file="selectedFiles[0]" @cancel="showMediaViewModal = false" v-if="selectedFiles.length" />
			<template v-slot:footer>
				<!-- <ErrorMsg :errorMsg="errorMsg" v-if="errorMsg" /> -->
			</template>
		</Modal>

		<!-- // File list -->
		<MediaFileList
			:files="files"
			@filesSelected="selectedFiles = Array.from($event)"
			@fileRightClick="handleFileRightClick"
		/>

		<!-- // Snack bar -->
		<SnackBar
			:title="snackBar.title"
			:message="snackBar.message"
			:show="snackBar.show"
			:duration="snackBar.duration"
			:type="snackBar.type"
			:position="snackBar.position"
			@hideSnackBar="snackBar.show = false"
		/>
	</div>
</template>
<style lang="scss" scoped>
	.files {
		border: 1px solid #ddd;
		// padding: 1rem;
		margin: 2rem;
		border-radius: 5px;
	}
</style>
