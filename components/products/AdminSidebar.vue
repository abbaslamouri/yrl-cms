<script setup>
defineProps({
  productDataTabs: {
    type: Array,
    required: true,
  },
})

defineEmits(['tabSelected'])

const prodState = inject('prodState')
</script>

<template>
  <ul class="sidebar flex flex-col border border-red-400 w-1/3">
    <li class="p-3 border-b cursor-pointer" @click="$emit('tabSelected', 'general')">General</li>
    <li class="p-3 border-b cursor-pointer" @click="$emit('tabSelected', 'attributes')">Attributes</li>
    <li
      class="p-3 border-b cursor-pointer"
      @click="$emit('tabSelected', 'variants')"
      v-show="prodState.selectedItem.type != 'simple' && prodState.selectedItem.attributes.length"
    >
      Variants
    </li>
    <!-- <li
      v-show="
        tab.key !== 'variants' ||
        (tab.key === 'variants' &&
          (prodState.selectedItem.type != 'simple' ||
            (tab.key == 'attributes' && prodState.selectedItem.attributes.length)))
      "
      class="p-3 border-b cursor-pointer"
      v-for="tab in productDataTabs"
      :key="tab.key"
      @click="$emit('tabSelected', tab.key)"
    >
      {{ tab.title }}
    </li> -->
  </ul>
</template>

<style lang=""></style>
