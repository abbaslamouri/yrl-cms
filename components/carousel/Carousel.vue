<script setup>
const props = defineProps({
  slides: {
    type: Array,
    required: true,
  },
  controls: {
    type: Boolean,
    default: false,
  },
  indicators: {
    type: Boolean,
    default: false,
  },
  interval: {
    type: [String, Number],
    default: 1,
  },
})

const currentSlide = ref(0)
const slideInterval = ref(null)
const direction = ref(null)

const setCurrentSlide = (index) => {
  currentSlide.value = index
}

const next = (step = 1) => {
  const index = currentSlide.value < props.slides.length - 1 ? currentSlide.value + step : 0
  setCurrentSlide(index)
  direction.value = 'right'
  // startCarouselInterval()
}

const prevSlide = (step = -1) => {
  const index = currentSlide.value > 0 ? currentSlide.value + step : props.slides.length - 1
  setCurrentSlide(index)
  direction.value = 'left'
  startCarouselInterval()
}

const nextSlide = (step = 1) => {
  console.log(currentSlide.value)

  next(step)
  startCarouselInterval()
}

const switchSlide = (index) => {
  const step = index - currentSlide.value
  if (step > 0) nextSlide(step)
  else prevSlide(step)
}

const startCarouselInterval = () => {
  stopCarouselInterval()
  slideInterval.value = setInterval(() => {
    next()
  }, props.interval * 1000)
}

const stopCarouselInterval = () => {
  clearInterval(slideInterval.value)
}

onMounted(() => {
  startCarouselInterval()
})

onUnmounted(() => {
  stopCarouselInterval()
})
</script>

<template>
  <div class="carousel">
    {{ currentSlide }}

    <div class="carousel__inner">
      <CarouselItem
        :slides="slides"
        v-for="(slide, index) in slides"
        :key="`slide-${index}`"
        :slide="slide"
        :currentSlide="currentSlide"
        :index="index"
        :direction="direction"
        @mouseEnter="stopCarouselInterval"
        @mouseLeave="startCarouselInterval"
      />
      <div class="carousel__controls" v-if="controls">
        <button @click="prevSlide" class="control left">Prev</button>
        <button @click="nextSlide" class="control right">Next</button>
      </div>
      <div class="carousel__indicators" v-if="indicators">
        <button
          class="indicator"
          :class="{ active: currentSlide === index }"
          v-for="(item, index) in slides.length"
          :key="`indicator-${item}`"
          @click="switchSlide(index)"
        ></button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.carousel {
  display: flex;
  justify-content: center;
  min-height: 40rem;
  // width: 100%;

  &__inner {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  &__controls {
    .control {
      border: none;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      height: 50px;
      width: 70px;
      top: 50%;
      transform: translateY(-50%);
      color: $slate-50;
      cursor: pointer;
      transition: 0.5s;
    }
    .control:hover {
      background: rgba(0, 0, 0, 0.8);
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }

  &__indicators {
    position: absolute;
    bottom: 1.5em;
    z-index: 2;
    transform: translateX(-50%);
    left: 50%;

    .indicator {
      border: none;
      padding: 0;
      width: 15px;
      height: 15px;
      background: #fff;
      border-radius: 50%;
      opacity: 0.5;
      margin: 0.2em;
      cursor: pointer;

      &.active {
        opacity: 1;
      }
    }
  }
}
</style>
