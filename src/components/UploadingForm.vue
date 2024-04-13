<template>
  <form action="" class="form" @submit.prevent="">
    <h2 class="form__caption">
      Start by uploading a file
    </h2>
    <base-button class="button" mode="filled">
      Upload
      <label class="label" for="fileInput">
        <input @change="uploadFiles" class="input visually-hidden" type="file" name="file" id="fileInput"
          multiple="multiple">
      </label>
    </base-button>
  </form>

</template>

<script setup>
import { storage, firebaseStorageRef, uploadBytes } from '@/firebase.js';

// import { send } from 'vite';
import { ref } from 'vue';

const files = ref([]);

const uploadFiles = async (evt) => {
  console.log(evt.target.files);
  console.log(storage);
  // Вообще не факт, что это понадобится
  // Нужно фетчом файлы отправить.

  const currentFiles = evt.target.files;

  const file = evt.target.files[0];
  const storageRef = firebaseStorageRef(storage, file.name);
  // const fileRef = storageRef.child(file.name);

  try {
    // await fileRef.put(file);
    await uploadBytes(storageRef, file);
    console.log('Файл успешно загружен в Firebase Storage');
    // вызывать загрузку списка файлов уже новых 
  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
  }


  let i = 0;
  for (const currentFile of currentFiles) {
    const currentTime = new Date().getTime();

    files[i] = {
      name: currentFile.name,
      type: currentFile.type,
      size: currentFile.size,
      date: currentTime,
      id: currentTime,
    }
    i++;
  }

  // const data = await sentFiles(files);

  // console.log(data);

  console.log(files);
};

// const sentFiles = async (files) => {
//   const formData = new FormData();
//   formData.append('file', files[0]);

//   const response = await fetch(URL, {
//     method: 'POST',
//     body: formData
//   });

//   if (!response.ok) {
//     console.log('error');
//   }

//   const data = await response.json();
//   return data;


// }
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
  display: block;
  position: relative;
  margin: 0 auto;
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