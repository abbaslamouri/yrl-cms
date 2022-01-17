<script setup>
import DeleteFill from '~~/components/icons/DeleteFill.vue'
const props = defineProps({
  top: {
    type: Number,
  },
  left: {
    type: Number,
  },
})

defineEmits(['cancel', 'renameFile', 'deleteFile', 'viewFile'])

const cssVars = computed(() => {
  return {
    '--top': props.top - 20 + 'px',
    '--left': props.left + 'px',
  }
})
const menuTop = computed(() => props.top - 20 + 'px')
const menuLeft = computed(() => props.left - 20 + 'px')
</script>

<template>
  <div class="folder-actions-popup" @click.self="$emit('cancel')">
    <ul>
      <a href="#" @click="$emit('viewFile')">
        <IconsEye />
        <p>View File</p>
      </a>
      <a href="#" @click="$emit('renameFile')">
        <iconsPencil />
        <p>Rename File</p>
      </a>
      <a href="#" @click="$emit('deleteFile')">
        <DeleteFill />
        <p>Delete File</p>
      </a>
    </ul>
  </div>
</template>

<style lang="scss">
.folder-actions-popup {
  min-width: 20rem;
  background-color: #eceff1;
  position: fixed;
  top: v-bind(menuTop);
  left: v-bind(menuLeft);
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);

  ul {
    display: flex;
    flex-direction: column;

    a {
      display: flex;
      align-items: center;
      gap: 1rem;
      border-bottom: 1px grey solid;
      padding: 1rem 2rem;

      &:hover {
        background-color: #4285f4;
        color: #ffffff;
      }
    }
  }
}
</style>
