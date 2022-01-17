<script setup>
const props = defineProps({
  folder: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <NuxtLink id="folder-nav-link" :to="{ name: `admin-media-folder`, params: { folder: folder.slug } }">
    <IconsFolderFill />
    <p>{{ folder.name }}</p>
  </NuxtLink>
</template>

<style lang="scss" scoped>
a {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #263238;

  cursor: pointer;
  border: 1px solid grey;
  padding: 0.5rem 3rem;
  border-radius: 3px;

  svg {
    width: 1.5rem;
    // height: 2rem;
  }

  p {
    color: #303030;
  }

  &.selected {
    background-color: #e3f2fd;
    // color: #fff;
  }
}
</style>
