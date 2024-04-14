// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { listAll, getMetadata, getDownloadURL } from '@firebase/storage'
import { storage, firebaseStorageRef } from '@/firebase.js';

import { formatDate, convertSizeFromBytes } from '@/assets/utils';

export const useFilesStore = defineStore('filesStore', {
  state: () => ({
    files: [],
    isFilesLoading: false
  }),
  actions: {
    addFile(file) {
      this.files.push(file)
    },
    deleteFile(fileId) {
      const targetIndex = this.files.findIndex(file => file.id === fileId);
      if (targetIndex < 0) return;
      this.files.splice(targetIndex, 1);
    },

    async loadFileList () {
      this.isFilesLoading = true;

      try {
        const storageRef = firebaseStorageRef(storage, ''); // Пустая строка для получения списка файлов в корне хранилища
        const result = await listAll(storageRef);
        const uploadedFiles = result.items;
    
        this.transformFilesData(uploadedFiles).then(() => {
          this.isFilesLoading = false;
          // Здесь можно обновлять список файлов скажем так и убирать лоадер
        });
    
    
      } catch (error) {
        console.error('Ошибка получения списка файлов:', error);
        this.isFilesLoading = false;
      }
    },

    async transformFilesData (fileItems) {
      const fileDataPromises = fileItems.map(async (item, index) => {
        const metadata = await getMetadata(item);
        const url = await getDownloadURL(item);
        item.url = url;
        item.metadata = metadata;
    
        this.files[index] = {
          name: item.name,
          url: url,
          type: metadata.type,
          contentType: metadata.contentType,
          size: convertSizeFromBytes(metadata.size),
          date: formatDate(metadata.timeCreated),
          id: `${new Date(metadata.timeCreated).getTime()}`,
          updatedDate: metadata.updated
        }
        return item;
      });
    
      return Promise.all(fileDataPromises);
    },

  }
})
