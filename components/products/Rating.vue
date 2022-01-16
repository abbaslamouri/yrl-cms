<script setup>
	const props = defineProps({
		rating: {
			type: Number,
		},
		numReviews: {
			type: Number,
			required: true,
		},
		svgFill: {
			type: String,
			default: '#ff9800',
		},
	})

	const currentRating = computed(() => props.rating)
</script>

<template>
	<div class="rating-stars">
		<div class="star">
			<IconsStarFull v-if="currentRating >= 1" />
			<IconsStarHalf v-else-if="currentRating > 0.5" />
			<IconsStarEmpty v-else />
		</div>
		<div class="star">
			<IconsStarFull v-if="currentRating >= 2" />
			<IconsStarHalf v-else-if="currentRating > 1.5" />
			<IconsStarEmpty v-else />
		</div>
		<div class="star">
			<IconsStarFull v-if="currentRating >= 3" />
			<IconsStarHalf v-else-if="currentRating > 2.5" />
			<IconsStarEmpty v-else />
		</div>
		<div class="star">
			<IconsStarFull v-if="currentRating >= 4" />
			<IconsStarHalf v-else-if="currentRating > 3.5" />
			<IconsStarEmpty v-else />
		</div>
		<div class="star">
			<IconsStarFull v-if="currentRating >= 5" />
			<IconsStarHalf v-else-if="currentRating > 4.5" />
			<IconsStarEmpty v-else />
		</div>
		<div class="text">from {{ numReviews }} reviews</div>
	</div>
</template>

<style lang="scss" scoped>
	.rating-stars {
		display: flex;
		gap: .5rem;
		align-items: center;
		justify-content: center;

		// &.updatable {
		// 	.star {
		// 		cursor: pointer;
		// 		font-size: 3rem !important;
		// 		// border: 1px solid red;
		// 	}
		// }

		.star {
			// cursor: pointer;
			// border: 1px solid red;
			font-size: 1.3rem;
			svg {
				fill: v-bind(svgFill);
				width: 1.7rem;
			}
		}

		.text {
			margin-left: 1rem;
		}
	}
</style>
