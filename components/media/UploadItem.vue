<script setup>
import iconType from '~/composables/useUtils';

import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const folderState = inject('folderState');

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['itemUploaded', 'itemUploadedError']);

const uploadItem = ref(props.item);
const uploadProgress = ref(0);
const uploadState = ref('');

let axiosSource = axios.CancelToken.source();

const upload = async () => {
  console.log('ITEM', props.item);
  let response = {};
  try {
    uploadState.value = 'uploading';
    const config = {
      onUploadProgress: (e) => {
        if (e.lengthComputable) uploadProgress.value = Math.round((e.loaded * 100) / e.total);
      },
      cancelToken: axiosSource.token,
    };
    const formData = new FormData();
    formData.append('file', uploadItem.value);
    formData.append('folder', folderState.selectedItem._id);
    if (uploadItem.value.type.includes('image')) response = await http.post(`v1/media/image`, formData, config);
    else response = await http.post(`v1/media`, formData, config);
    console.log('RES', response);
    uploadState.value = 'complete';
    emit('itemUploaded', response.data);
  } catch (err) {
    // console.log('MyError', err)
    uploadState.value = 'failed';
    emit('itemUploadedError', {
      file: uploadItem.value,
      error: `<p>${err.response.data.message || err.response.data.statusMessage}</p>`,
    });
  }
};

onMounted(async () => {
  // await upload();
});
</script>

<template>
  <!-- <div class="card cursor-pointer w-32 h-32 flex flex-col items-center border border-gray-300 rounded shadow-lg">
    <div v-if="file.mimetype && file.mimetype.includes('image')" class="w-full h-full">
      <img class="file-thumb w-full h-full object-fill" :src="`${file.path}`" />
    </div>
    <div v-else class="border h-full grid grid-rows-4">
      <component :is="iconType(file.mimetype)" class="w-full h-12 row-span-3 pt-4" />
      <p class="filename text-xs text-center w-32 px-2 truncate overflow-hidden row-span-1 py-0">
        {{ file.filename }}
      </p>
    </div>
  </div> -->

  <div
    class="card upload-item cursor-pointer w-32 h-32 flex flex-col items-center border border-gray-300 rounded shadow-lg"
  >
    <IconsProgressRing :progress="uploadProgress" />
    <component :is="iconType(uploadItem.type)" class="w-full h-12 row-span-3 pt-4" />
    <p class="filename text-xs text-center w-32 px-2 truncate overflow-hidden row-span-1 py-0">{{ uploadItem.name }}</p>
  </div>
</template>

<style lang="scss" scoped>
// .card {
//   width: 16rem;
//   cursor: pointer;
//   border: 1px solid grey;
//   padding: 0;
//   border-radius: 5px;

//   .body {
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     height: 12rem;

//     img {
//       width: 100%;
//       height: 100%;
//       object-fit: cover;
//     }
//   }

//   &.selected {
//     background-color: #0277bd;
//     color: #fff;
//   }

//   .footer {
//     border-top: 1px solid grey;
//     display: grid;
//     grid-template-columns: 2rem 1fr;
//     grid-template-rows: 1fr;
//     gap: 1rem;
//     align-items: center;
//     padding: 1rem;
//     font-size: 1.2rem;

//     svg {
//       grid-row: 1 /2;
//       grid-column: 1 /2;
//     }

//     .filename {
//       grid-row: 1 /2;
//       grid-column: 2 /3;
//       overflow: hidden;
//       text-overflow: ellipsis;
//       white-space: nowrap;
//     }
//   }
// }
</style>
