<script setup>
	// const http = useHttp()
	const router = useRouter()
	const route = useRoute()
	const {
		createDoc: createFolder,
		updateDoc: updateFolder,
		deleteDoc: deleteFolder,
		errorMsg: folderErrorMsg,
	} = useHttp('folders')

	const { getDocs: getAllMedia, updateDoc: updateMedia, errorMsg: mediaErrorMsg } = useHttp('media')

	const props = defineProps({
		folders: {
			type: Array,
			required: true,
		},
		folderQuery: Object,
		showFolderContextMenu: Boolean,
	})

	const emit = defineEmits([
		'folderQueryParamsChanged',
		'folderCreatedUpdated',
		'folderDeleted',
		'folderRightClick',
		'toggleFolderContextMenuVisibility',
	])

	// const showFolderActionsPopup = ref(false)
	const folderPopupTop = ref(0)
	const folderPopupLeft = ref(0)
	let folderToUpdate = reactive({
		name: '',
		_id: null,
		slug: '',
	})
	const folderNewUpdateAction = ref('createFolder')
	const snackBar = reactive({ type: 'error' })
	const showFolderFormModal = ref(false)
	const errorMsg = ref(null)

	watchEffect(async () => {
		const errMsg = folderErrorMsg.value
			? folderErrorMsg.value
			: mediaErrorMsg.value
			? mediaErrorMsg.value
			: errorMsg.value
			? errorMsg.value
			: null
		if (errMsg) {
			snackBar.message = errMsg
			snackBar.type = 'error'
			snackBar.show = true
		}
	})

	const handleFolderRightClick = (event) => {
		const folderId = event.currentTarget.getAttribute('data-folderId')
		const selectedFolder = props.folders.filter((item) => item._id === folderId)[0]
		folderToUpdate.name = selectedFolder.name
		folderToUpdate.slug = selectedFolder.slug
		folderToUpdate._id = selectedFolder._id
		emit('toggleFolderContextMenuVisibility', true)
		folderPopupLeft.value = event.pageX > window.screen.width - 300 ? window.screen.width - 300 : event.pageX
		folderPopupTop.value = event.pageY
	}

	const handleFolderCreateUpdate = async (folder) => {
		let response
		if (folderNewUpdateAction.value === 'createFolder') {
			response = await createFolder(folder)
			if (!folderErrorMsg.value) {
				emit('folderCreatedUpdated', response)
			}
		} else if (folderNewUpdateAction.value === 'renameFolder') {
			response = await updateFolder(folder._id, { name: folder.name })
			if (!folderErrorMsg.value) {
				const newFolder = response
				const newSlug = response.slug
				response = await getAllMedia(`?folder=${folder.slug}`)
				if (!mediaErrorMsg.value) {
					const files = response
					for await (const file of files) {
						await updateMedia(file._id, { folder: newSlug })
					}
					emit('folderCreatedUpdated', newFolder)
				}
			}
		}

		resetFolderToUpdate()
		showFolderFormModal.value = false
	}

	const handleDeleteFolder = async () => {
		if (!confirm('Are you sure?')) return
		const mediaQueryStr = `?folder=${folderToUpdate.slug}`
		let response = await getAllMedia(mediaQueryStr)
		console.log('respnse', response.length)
		if (!mediaErrorMsg.value) {
			if (response.length) {
				errorMsg.value = 'You are not allowed to delete non-empty folders'
			} else {
				response = await deleteFolder(folderToUpdate._id)
				if (!folderErrorMsg.value) {
					emit('folderDeleted', folderToUpdate)
					resetFolderToUpdate()
				}
			}
		}
	}

	const handleRenameFolder = () => {
		folderNewUpdateAction.value = 'renameFolder'
		showFolderFormModal.value = true
	}

	const resetFolderToUpdate = () => {
		folderToUpdate.name = ''
		folderToUpdate.slug = ''
		folderToUpdate._id = null
	}
</script>

<template>
	<div class="folders">
		<MediaFolderActions
			:folderQuery="folderQuery"
			@addNewFolder="showFolderFormModal = true"
			@folderQueryParamsChanged="$emit('folderQueryParamsChanged', $event)"
		/>

		<MediaFolderActionsPopup
			v-show="showFolderContextMenu"
			:folderToUpdate="folderToUpdate"
			:left="folderPopupLeft"
			:top="folderPopupTop"
			@cancel="$emit('toggleFolderContextMenuVisibility', false)"
			@renameFolder="handleRenameFolder"
			@deleteFolder="handleDeleteFolder"
		/>

		<Modal v-show="showFolderFormModal" @cancel="showFolderFormModal = false">
			<template v-slot:header>
				<h1>{{ folderNewUpdateAction === 'createFolder' ? 'Create' : 'Update' }} Folder</h1>
			</template>
			<MediaFolderForm
				:folderToUpdate="folderToUpdate"
				:action="folderNewUpdateAction"
				@cancel="showFolderFormModal = false"
				@FolderCreateUpdate="handleFolderCreateUpdate"
			/>
			<template v-slot:footer>
				<ErrorMsg :errorMsg="errorMsg" v-if="errorMsg" />
			</template>
		</Modal>

		<MediaFolderList :folders="folders" @folderRightClick="handleFolderRightClick" />

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
	.folders {
		// border: 1px solid teal;
		padding: 1rem 4rem;
	}
</style>
