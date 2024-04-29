<template>
  <!-- <uploading-form /> -->
  <div v-if="filesStore.isFilesLoading" class="loader">
    <h2 class="loader__caption">Loading files...</h2>
    <div class="loader__symbol"></div>
  </div>
  <div v-else class="list">
    <div class="list__header">
      <h1 class="list__header-caption">
        Files Uploaded
      </h1>

      <base-button class="button" :class="{ 'button--uploading': isUploading }" mode="filled">
        <icon-upload />
        {{ isUploading ? 'Uploading...' : 'Upload' }}
        <label class="label" for="fileInputList">
          <input @change="uploadFiles" class="input visually-hidden" type="file" name="file" id="fileInputList"
            multiple="multiple">
        </label>
      </base-button>
    </div>

    <div class="list-caption-wrapper">
      <span class="list-caption list-caption--wide">
        File name
      </span>
      <span class="list-caption">
        File size
      </span>
      <span class="list-caption">
        Date uploaded
      </span>
    </div>
    <ul class="list__file file__list">
      <li v-for="file in files" :key="file.id" class="file__item">
        <file-item :id="file.id" :name="file.name" :type="file.type" :contentType="file.contentType" :size="file.size"
          :url="file.url" :date="file.date" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useFilesStore } from '@/stores/files.js';

import IconUpload from '@/components/UI/icons/IconUpload.vue';
// import UploadingForm from './UploadingForm.vue';
import FileItem from './FileItem.vue';

const isUploading = ref(false);
const filesStore = useFilesStore();
const files = ref(filesStore.files);

const uploadFiles = async (evt) => {
  isUploading.value = true;

  const currentFiles = evt.dataTransfer ? evt.dataTransfer.files : evt.target.files;
  filesStore.uploadNewFiles(currentFiles, () => {
    isUploading.value = false;

    [...currentFiles].forEach(file => {
      const fileName = file.name;
      filesStore.loadFile(fileName);
    });
  });
};

onBeforeMount(() => {
  filesStore.loadFileList();
});
</script>

<style scoped>
.loader {
  width: 100%;
  min-height: 300px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* background-color: #f1f1f1;
  border-radius: 20px; */
}

.loader__caption {
  font-size: 20px;
  line-height: 120%;
  margin-bottom: 20px;
}

.loader__symbol {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid var(--border-color);
  border-bottom-color: var(--theme-color);
  animation: rotation 1s ease-out infinite;
}

.list {
  font-size: 16px;
  line-height: 120%;
  color: var(--sub-text-color);
}

.list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px;
  color: var(--text-color);
}

.list__header-caption {
  font-size: 20px;
  line-height: 120%;
  font-weight: 700;
  margin: 0;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  margin: 0;
  width: fit-content;
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

.list-caption-wrapper {
  display: flex;
  align-items: center;
  padding: 16px 24px;
}

.list-caption {
  min-width: 176px;
  padding: 0 24px;
}

.list-caption--wide {
  flex-grow: 1;
  padding: 0;
}

.file__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.file__item:nth-child(2n) {
  background-color: var(--item-bg-color-alt);
}

.file__item {
  border-top: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .list__header {
    padding: 12px 20px;
  }

  .list__header-caption {
    font-size: 18px;
  }

  .list-caption-wrapper {
    display: none;
  }
}
</style>