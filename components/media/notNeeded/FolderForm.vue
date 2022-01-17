<script setup>
const props = defineProps({
  folderToUpdate: {
    type: Object,
  },
  action: {
    type: String,
  },
})
const emit = defineEmits(['cancel', 'FolderCreateUpdate'])

const newFolder = computed(() => {
  return { name: props.folderToUpdate.name, _id: props.folderToUpdate._id, slug: props.folderToUpdate.slug }
})
</script>
<template>
  <form class="folder-form" @submit.prevent="$emit('FolderCreateUpdate', newFolder)">
    <div class="inputs">
      <div class="form-group">
        <input type="text" v-model="newFolder.name" placeholder="Name" />
        <label>Folder Name</label>
      </div>
    </div>
    <div class="actions">
      <button class="btn" @click.prevent="$emit('cancel')">Cancel</button>
      <button class="btn primary" type="submit">OK</button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.folder-form {
  border: 2px solid #fff;
  background: #fff;
  padding: 0.5rem;
  border: teal solid 1px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;

  .inputs {
    display: flex;
    gap: 2rem;
  }

  .actions {
    display: flex;
    gap: 1rem;
  }
}
</style>
