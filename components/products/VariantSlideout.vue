<script setup>
	const props = defineProps({
		showSlideout: {
			type: Boolean,
			default: false,
		},
	})

	defineEmits(['closeAttributesVariantsSlideout'])

	const attState = inject('attState')
</script>

<template>
	<div class="slideout">
		<div class="overlay" v-show="showSlideout"></div>
		<transition name="slide">
			<div class="dialog shadow-md" v-show="showSlideout">
				<div class="header shadow-md">
					<h3 class="title">Edit Variants</h3>
					<button class="btn close"><IconsClose @click="$emit('closeSlideout')" /></button>
				</div>
				<div class="main">
					<ProductsAdminEmptyVariantMsg v-if="!attState.items.length" />
					<div v-else>
						<ProductsAdminProductAttributesPanel />
						<ProductsAdminProductVariantsPanel />
					</div>
				</div>
				<div class="footer shadow-md">
					<p>Here's some contact info</p>
				</div>
			</div>
		</transition>
	</div>
</template>

<style lang="scss" scoped></style>
