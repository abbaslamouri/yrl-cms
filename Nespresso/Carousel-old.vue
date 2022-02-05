<script setup>
// import CarouselItem from "./CarouselItem.vue";
// import CarouselControls from "./CarouselControls.vue";
// import CarouselIndicators from "./CarouselIndicators.vue";

const props= defineProps({
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
      type: Number,
      default: 5000,
    },
    width: {
      type: Number,
      default: 900,
    },
    height: {
      type: Number,
      default: 400,
    },
  
})
  
  computed: {
    dimention() {
      return {
        width: this.width + "px",
        height: this.height + "px",
      };
    },
  },
  data: () => ({
    currentSlide: 0,
    slideInterval: null,
    direction: "right",
  }),
  mounted() {
    this.startSlideTimer();
  },
  beforeUnmount() {
    this.stopSlideTimer();
  },
  methods: {
    switchSlide(index) {
      const step = index - this.currentSlide;
      if (step > 0) {
        this.next(step);
      } else {
        this.prev(step);
      }
    },
    stopSlideTimer() {
      clearInterval(this.slideInterval);
    },
    startSlideTimer() {
      this.stopSlideTimer();
      this.slideInterval = setInterval(() => {
        this._next();
      }, this.interval);
    },
    setCurrentSlide(index) {
      this.currentSlide = index;
    },
    prev(step = -1) {
      const index =
        this.currentSlide > 0
          ? this.currentSlide + step
          : this.slides.length - 1;
      this.setCurrentSlide(index);
      this.direction = "left";
      this.startSlideTimer();
    },
    _next(step = 1) {
      const index =
        this.currentSlide < this.slides.length - 1
          ? this.currentSlide + step
          : 0;
      this.setCurrentSlide(index);
      this.direction = "right";
    },
    next(step = 1) {
      this._next(step);
      this.startSlideTimer();
    },
  },
};
</script>
<template>
  <div class="carousel">
    <div class="carousel-inner" :style="dimention">
      <carousel-indicators
        v-if="indicators"
        :count="slides.length"
        :active="currentSlide"
        @switch="switchSlide($event)"
      ></carousel-indicators>
      <carousel-item
        v-for="(slide, index) in slides"
        :slide="slide"
        :key="`slide-${index}`"
        :current-slide="currentSlide"
        :index="index"
        :direction="direction"
        @mouseenter="stopSlideTimer"
        @mouseout="startSlideTimer"
      ></carousel-item>
      <carousel-controls
        v-if="controls"
        @prev="prev"
        @next="next"
      ></carousel-controls>
    </div>
  </div>
</template>



<style scoped>
.carousel {
  display: flex;
  justify-content: center;
}
.carousel-inner {
  position: relative;
  overflow: hidden;
}
</style>
