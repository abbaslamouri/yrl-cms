<script setup>
const props = defineProps({
  file: Object,
})

const emit = defineEmits(['cancel', 'updateFile'])
const newFile = reactive({
  _id: props.file._id,
  originalname: props.file.originalname,
  folder: props.file.folder,
})
</script>

<template>
  <form @submit.prevent="$emit('updateFile', newFile)">
    <div class="form-group">
      <label>Filename</label>
      <input type="text" v-model="newFile.originalname" placeholder="Filename" />
    </div>
    <div class="actions">
      <button class="btn outline" @click.prevent="$emit('cancel')">Cancel</button>
      <button class="btn primary" type="submit">OK</button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin: 2rem;

  .form-group {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    input,
    select {
      padding: 1rem 2rem;
      background-color: #eeeeee;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
    }
  }

  .actions {
    .btn {
      background-color: transparent;
      padding: 1rem 2rem;
      cursor: pointer;

      &.primary {
        background-color: #1976d2;
        color: #eeeeee;
        margin: 1rem;
      }
      &.outline {
        color: #303030;
        border: 1px #bdbdbd solid;
      }
    }
  }
}
</style>
