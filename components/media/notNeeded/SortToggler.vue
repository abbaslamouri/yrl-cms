<script setup>
	

	const emit = defineEmits(['sortParamsChanged'])
	const sort = reactive({
		field: 'name',
		order: '',
	})

	const toggleSortOrder = () => {
		sort.order = sort.order ? '' : '-'
		emitSortParams()
	}

	const SelectSortField = (event) => {
		sort.field = event.target.value
		emitSortParams()
	}

	const emitSortParams = () => {
		emit('sortParamsChanged', sort)
	}
</script>

<template>
	<div>
		<select @change="SelectSortField">
			<option value="name">Filename</option>
			<option value="size">File size</option>
		</select>
		<button @click="toggleSortOrder" class="btn">
			<IconsArrowUpFill v-if="!sort.order" />
			<IconsArrowDownFill v-else />
		</button>
	</div>
</template>
