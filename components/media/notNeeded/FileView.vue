<script setup>
	const props = defineProps({
		file: {
			type: Object,
		},
	})

	const originalnameRef = ref('')
	const pathRef = ref('')
	const urlRef = ref('')
	const snackBar = reactive({
		type: 'error',
		message: '',
		show: false,
	})

	const copyName = () => {
		originalnameRef.value.focus()
		document.execCommand('copy')
		showSnackBar('Filename')
	}
	const copyPath = () => {
		pathRef.value.focus()
		document.execCommand('copy')
		showSnackBar('Path')
	}

	const copyUrl = () => {
		urlRef.value.focus()
		document.execCommand('copy')
		showSnackBar('URL')
	}

	const showSnackBar = (field) => {
		snackBar.type = 'success'
		snackBar.message = `${field} copied to clipboard`
		snackBar.show = true
	}
</script>

<template>
	<div>
		{{ file }}
		<div class="form-group">
			<label>Filename</label>
			<input type="text" :value="file.originalname" @focus="$event.target.select()" ref="originalnameRef" readonly />
			<button @click="copyName"><IconsCopy /></button>
		</div>
		<div class="form-group">
			<label>Pth</label>
			<input type="text" :value="file.path" @focus="$event.target.select()" ref="pathRef" readonly />
			<button @click="copyPath"><IconsCopy /></button>
		</div>
		<div class="form-group">
			<label>URL</label>
			<input type="text" :value="file.url" @focus="$event.target.select()" ref="urlRef" readonly />
			<button @click="copyUrl"><IconsCopy /></button>
		</div>
		<!-- // Snack bar -->
		<SnackBar
			:type="snackBar.type"
			:message="snackBar.message"
			:show="snackBar.show"
			@hideSnackBar="snackBar.show = false"
		/>
	</div>
</template>

<style lang="scss" scoped>
	.form-group {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.actions {
		.btn {
			background-color: transparent;
			padding: 1rem 2rem;
			cursor: pointer;

			&.primary {
				background-color: #1976d2;
				color: #eeeeee;
				margin: 1rem;
			}
			&.outline {
				color: #303030;
				border: 1px #bdbdbd solid;
			}
		}
	}
</style>
