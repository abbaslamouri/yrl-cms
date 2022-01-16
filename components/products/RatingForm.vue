<script setup>
const props = defineProps({
  // ratingObj: {
  // 	type: Object,
  // },
  rating: {
    type: Number,
  },
  // numReviews: {
  // 	type: Number,
  // 	required: true,
  // },
  svgFill: {
    type: String,
    default: '#ff9800',
  },
})

defineEmits(['productRatingSet'])

const currentRating = ref(props.rating)

watch(
  () => props.rating,
  (newVal) => {
    currentRating.value = newVal.rating
  },
  { deep: true }
)
</script>

<template>
  <div class="rating-stars">
    <div class="star" @click="$emit('productRatingSet', currentRating)" @mouseenter="currentRating = 1">
      <IconsStarFull v-if="currentRating >= 1" />
      <IconsStarHalf v-else-if="currentRating > 0.5" />
      <IconsStarEmpty v-else />
    </div>
    <div class="star" @click="$emit('productRatingSet', currentRating)" @mouseenter="currentRating = 2">
      <IconsStarFull v-if="currentRating >= 2" />
      <IconsStarHalf v-else-if="currentRating > 1.5" />
      <IconsStarEmpty v-else />
    </div>
    <div class="star" @click="$emit('productRatingSet', currentRating)" @mouseenter="currentRating = 3">
      <IconsStarFull v-if="currentRating >= 3" />
      <IconsStarHalf v-else-if="currentRating > 2.5" />
      <IconsStarEmpty v-else />
    </div>
    <div class="star" @click="$emit('productRatingSet', currentRating)" @mouseenter="currentRating = 4">
      <IconsStarFull v-if="currentRating >= 4" />
      <IconsStarHalf v-else-if="currentRating > 3.5" />
      <IconsStarEmpty v-else />
    </div>
    <div class="star" @click="$emit('productRatingSet', currentRating)" @mouseenter="currentRating = 5">
      <IconsStarFull v-if="currentRating >= 5" />
      <IconsStarHalf v-else-if="currentRating > 4.5" />
      <IconsStarEmpty v-else />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rating-stars {
  display: flex;
  gap: .5rem;
  align-items: center;
  justify-content: center;
  display: flex;
  align-items: center;

  // &.updatable {
  // 	.star {
  // 		cursor: pointer;
  // 		font-size: 3rem !important;
  // 		// border: 1px solid red;
  // 	}
  // }

  .star {
    cursor: pointer;
    // border: 1px solid red;
    // font-size: 1.3rem;
    svg {
      fill: v-bind(svgFill);
      // width: 1.7rem;
    }
  }

  // .text {
  // 	margin-left: 1rem;
  // }
}
</style>
