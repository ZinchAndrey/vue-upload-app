<template>
  <form action="" class="form" @submit.prevent="">
    <h2 class="form__caption">
      Start by uploading a file
    </h2>
    <base-button class="button" :class="{ 'button--uploading': isUploading }" mode="filled">
      {{ isUploading ? 'Uploading...' : 'Upload' }}
      <label class="label" for="fileInput">
        <input @change="uploadFiles" class="input visually-hidden" type="file" name="file" id="fileInput"
          multiple="multiple">
      </label>
    </base-button>
  </form>

</template>

<script setup>
import { storage, firebaseStorageRef, uploadBytes } from '@/firebase.js';
import { listAll, getMetadata, getDownloadURL } from '@firebase/storage'
import { ref } from 'vue';

const isUploading = ref(false);
const files = ref([]);

const uploadFiles = async (evt) => {
  console.log(evt.target.files);
  isUploading.value = true;

  const currentFiles = evt.target.files;
  const tasksToUpload = [];

  for (let i = 0; i < currentFiles.length; i++) {
    const currentFile = currentFiles[i];
    const storageRef = firebaseStorageRef(storage, currentFile.name);
    const taskToUpload = uploadBytes(storageRef, currentFile);
    tasksToUpload.push(taskToUpload);
  }

  try {
    await Promise.all(tasksToUpload);// Ждем завершения всех задач загрузки
    console.log('Все файлы успешно загружены в Firebase Storage');
  } catch (error) {
    console.error('Ошибка загрузки файлов:', error);
  } finally {
    isUploading.value = false;
  }
};

const getFilesData = async (fileItems) => {
  const fileDataPromises = fileItems.map(async (item, index) => {
    const metadata = await getMetadata(item);
    const url = await getDownloadURL(item);
    item.url = url;
    item.metadata = metadata;

    files.value[index] = {
      name: item.name,
      url: url,
      type: metadata.type,
      contentType: metadata.contentType,
      size: metadata.size,
      date: metadata.timeCreated,
      updatedDate:metadata.updated
    }
    return item;
  });

  return Promise.all(fileDataPromises);
}

const fetchFileList = async () => {
  try {
    const storageRef = firebaseStorageRef(storage, ''); // Пустая строка для получения списка файлов в корне хранилища
    const result = await listAll(storageRef);
    const uploadedFiles = result.items;

    // const filesData = await getFilesData(uploadedFiles);
    // console.log(filesData);
    
    getFilesData(uploadedFiles).then(() => {
      // Здесь можно обновлять список файлов скажем так и убирать лоадер
      console.log(files.value);
    });


  } catch (error) {
    console.error('Ошибка получения списка файлов:', error);
  }
};

fetchFileList();

</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}

.form__caption {
  font-size: 24px;
  line-height: 120%;
  font-weight: 500;
  text-align: center;

  margin: 0 0 20px;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  margin: 0 auto;
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