<script setup>
	defineProps({
		modelValue: {
			type: Array,
			default: [],
		},
		options: {
			type: Array,
			required: true,
		},
		label: {
			type: String,
			default: '',
		},
		hint: {
			type: String,
			default: '',
		},
	})

	const emit = defineEmits(['update:modelValue'])

	const items = ref([])
	const inputRefs = ref([])
	const uuid = useUniqueId().getId()

	const addItem = (event) => {
		const index = items.value.findIndex((item) => item == event.target.value)
		if (index === -1) items.value.push(event.target.value)
		else items.value.splice(index, 1)
		emit('update:modelValue', items)
	}
</script>

<script>
	export default {
		inheritAttrs: false,
	}
</script>

<template>
	<div class="base-select-multiple">
		<button class="select">
			<input type="text" :id="`base-select-multiple-${uuid}`" value="ewewrewrewrewr" readonly aria-readonly="false" />
			<label :for="`base-select-multiple-${uuid}`"> Select Categories </label>
			<IconsChevronDown />
		</button>
		<div class="list-box" role="listbox" tabindex="-1">
			<div
				v-for="(option, index) in options"
				class="list-item"
				:id="`list-item-${uuid}-${option.key}`"
				role="option"
				:key="option.key"
				tabindex="0"
				:aria-selected="items.includes(option.key)"
			>
				<label class="form-control" :class="{ disabled: inputRefs[index] && inputRefs[index].disabled }">
					<input :ref="(el) => (inputRefs[index] = el)" type="checkbox" :value="option.key" @click="addItem" />
					<div class="label">{{ option.name }}</div>
				</label>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '@/assets/scss/variables';

	.base-select-multiple {
		.select {
			display: grid;
			grid-template-rows: 2fr;
			grid-template-columns: 1fr 2rem;
			gap: 1rem;
			height: 4rem;
			align-items: center;
			padding: 0 1rem;
			width: 100%;
			background-color: transparent;

			label {
				grid-row: 1 / 2;
				grid-column: 1 / 2;
			}

			input {
				grid-row: 1 / 2;
				grid-column: 1 / 2;
				width: 100%;
				height: 100%;
			}

			svg {
				grid-row: 1 / 2;
				grid-column: 2 / 3;
				width: 2rem;
				height: 2rem;
			}
		}

		.list-box {
			padding: 0 1rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;

			.form-control {
				display: flex;
				align-items: center;
				gap: 0.5em;
				cursor: pointer;

				&.disabled {
					color: $slate-400;
					cursor: not-allowed;
				}

				input[type='checkbox'] {
					display: grid;
					place-content: center;
					appearance: none;
					background-color: #fff;
					margin: 0;
					font: inherit;
					color: currentColor;
					width: 1.75rem;
					height: 1.75rem;
					border: 0.15rem solid currentColor;
					border-radius: 0.15rem;
					cursor: pointer;

					&:checked::before {
						transform: scale(1);
						background-color: CanvasText;
						transform-origin: bottom left;
						clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
					}

					&::before {
						content: '';
						width: 1.25rem;
						height: 1.25rem;
						transform: scale(0);
						transition: 120ms transform ease-in-out;
						box-shadow: inset 1em 1em $slate-700;
					}

					&:disabled {
						color: $slate-300;
						cursor: not-allowed;
					}
				}
			}
		}
	}

	.base-select {
		display: flex;
		align-items: center;
		gap: 1rem;

		select {
			padding: 0.5rem 1rem;
		}
	}
</style>
