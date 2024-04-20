<template>
  <form action="" class="form" @submit.prevent="">
    <h2 class="form__caption">
      Start by uploading a file
    </h2>
    <p class="form__sub">
      Any assets used in projects will live here.
      <br>
      Start creating by uploading your files.
    </p>
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
import { ref } from 'vue';

const isUploading = ref(false);
// const files = ref([]);

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

</script>

<style scoped>
.form {
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 50px 24px;
  width: 400px;
  margin: 0 auto;
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