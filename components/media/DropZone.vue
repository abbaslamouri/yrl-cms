<script setup>
const emit = defineEmits(['uploadItemsSelected', 'fileUploadBtnClicked']);

const fileRef = ref(null);
const dragged = ref(false);
const itemsToUpload = ref([]);

const handleItemsDropped = (event) => {
  dragged.value = false;
  itemsToUpload.value = Array.from(event.dataTransfer.files).map((item) => item);
  emit('uploadItemsSelected', itemsToUpload.value);
};

const handleItemsSelected = (event) => {
  console.log(event.target.files);
  itemsToUpload.value = Array.from(event.target.files).map((item) => item);
  emit('uploadItemsSelected', itemsToUpload.value);
};
</script>
<template>
  <div
    class="dropzone"
    :class="{ 'dragged-over': dragged }"
    @dragover.prevent="dragged = true"
    @dragleave.prevent="dragged = false"
    @drop.prevent="handleItemsDropped"
  >
    <!-- <div class="message-wrapper"> -->
    <!-- <div class="message"> -->
    <!-- <IconsBackupFill /> -->
    <IconsBackupFill />
    <p>Drop files here</p>
    <a class="heading" href="#" @click="fileRef.click()">Or click here to choose your files</a>
    <form enctype="multipart/form-data">
      <input
        type="file"
        accept="image/*, application/pdf"
        :multiple="true"
        ref="fileRef"
        @change="handleItemsSelected"
        style="display: none"
      />
    </form>
    <button class="btn" @click="$emit('fileUploadBtnClicked')">
      <span>Cancel</span>
    </button>
    <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/variables';

.dropzone {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 20rem;
  border: 1px solid $slate-300;
  border-radius: 5px;

  .heading {
    color: $sky-900;
    font-weight:600;
    font-size:1.8rem;
    

  }

  //   min-height: 20vh;
  //   border: 2px solid #fff;
  //   background: #fff;
  //   padding: 0.5rem;
  //   border: teal solid 1px;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;

  // h-48 p-2 border rounded flex flex-col justify-center items-center gap-2 bg-gray-100 text-sm

  // add-new-folder flex items-center gap-1 border border-blue-400 px-3 py-1 rounded text-blue-600

  //   &.dragged-over {
  //     background: #e8f0fe;
  //     border: 2px solid #4285f4;
  //   }

  //   .message {
  //     flex: 1;
  //     padding: 4rem;
  //     display: flex;
  //     gap: 1rem;
  //     flex-direction: column;
  //     align-items: center;
  //     vertical-align: middle;
  //     background: rgba(0, 0, 0, 0.04);
  //     user-select: none;
  //     color: #999;

  //     svg {
  //       width: 4rem;
  //       height: 4rem;
  //     }

  //     a {
  //       color: #4285f4;
  //       font-size: 1.8rem;
  //     }
  //   }
}
</style>
