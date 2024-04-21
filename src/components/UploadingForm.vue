<template>
  <form class="form" :class="{ 'form--highlight': isDragover}" 
    @submit.prevent=""
    @dragover.prevent="highlightForm"
    @dragleave.prevent="deleteHighlightForm"
    @drop.prevent="uploadFiles"
  >
    <icon-upload-big class="form__icon"/>
    <h2 class="form__caption">
      Start by uploading a file
    </h2>
    <p class="form__sub">
      Any assets used in projects will live here.
      <br>
      Start creating by uploading your files.
    </p>
    <base-button class="button" :class="{ 'button--uploading': isUploading }" mode="filled">
      <icon-upload/>
      {{ isUploading ? 'Uploading...' : 'Upload' }}
      <label class="label" for="fileInput">
        <input @change="uploadFiles" class="input visually-hidden" type="file" name="file" id="fileInput"
          multiple="multiple">
      </label>
    </base-button>
  </form>

</template>

<script setup>
// import { storage, firebaseStorageRef, uploadBytes } from '@/firebase.js';

import { ref } from 'vue';

import IconUpload from '@/components/UI/icons/IconUpload.vue';
import IconUploadBig from '@/components/UI/icons/IconUploadBig.vue';

import { useFilesStore } from '@/stores/files';

const isUploading = ref(false);
const isDragover = ref(false);
const filesStore = useFilesStore();
// const files = ref([]);

const highlightForm = () => {
  isDragover.value = true;
}
const deleteHighlightForm = () => {
  isDragover.value = false;
}

const uploadFiles = async (evt) => {
  isUploading.value = true;
  deleteHighlightForm();
  
  const currentFiles = evt.dataTransfer ? evt.dataTransfer.files : evt.target.files;
  filesStore.uploadFiles(currentFiles, () => {
    isUploading.value = false;
  });
};

</script>

<style scoped>
.form {
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 50px 24px;
  width: 400px;
  margin: 0 auto;

  border-radius: 20px;
  border: 4px dashed transparent;

  transition: all ease-in 0.3s;
}

.form--highlight {
  border-color: var(--theme-color);
  opacity: 0.8;
  box-shadow: 0px 0px 15px 2px var(--theme-color);
}

.form__icon {
  margin: 0 auto 16px;
}

.form__caption {
  font-size: 16px;
  line-height: 120%;
  font-weight: 500;
  text-align: center;
  margin: 0 0 10px;
}

.form__sub {
  font-size: 14px;
  line-height: 120%;
  color: var(--sub-text-color);
  margin: 0 0 20px;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  margin: 0 auto;
  width: 100%;
}

.button--uploading::before {
  content: '';
  display: block;
  /* position: absolute;
  left: 20px; */
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 4px solid #fff;
  border-bottom-color: red;
  animation: rotation 1s ease-out infinite;
}

.button--uploading svg {
  display: none;
}

.label {
  text-align: center;

  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: block;
  /* width: fit-content; */
  margin: 0 auto;
  cursor: pointer;
}

.input {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}
</style>