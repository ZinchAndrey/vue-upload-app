import { defineStore } from 'pinia'
import { listAll, getMetadata, getDownloadURL } from '@firebase/storage'
import { storage, firebaseStorageRef, uploadBytes } from '@/firebase.js'

import { formatDate, convertSizeFromBytes } from '@/assets/utils'

export const useFilesStore = defineStore('filesStore', {
  state: () => ({
    files: [],
    isFilesLoading: false,
    isUploading: false
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
    async uploadNewFiles(files, callbackOnSuccess) {
      const tasksToUpload = []

      for (let i = 0; i < files.length; i++) {
        const currentFile = files[i]
        const storageRef = firebaseStorageRef(storage, currentFile.name)
        const taskToUpload = uploadBytes(storageRef, currentFile)
        tasksToUpload.push(taskToUpload)
      }

      try {
        await Promise.all(tasksToUpload) // Ждем завершения всех задач загрузки
        console.log('Все файлы успешно загружены в Firebase Storage')
      } catch (error) {
        console.error('Ошибка загрузки файлов:', error)
      } finally {
        callbackOnSuccess && callbackOnSuccess()
        this.isUploading = false
      }
    },


    async loadFileList() {
      this.isFilesLoading = true

      try {
        const storageRef = firebaseStorageRef(storage, '') // Пустая строка для получения списка файлов в корне хранилища
        const result = await listAll(storageRef)
        const uploadedFiles = result.items

        this.transformFilesData(uploadedFiles).then(() => {
          this.isFilesLoading = false
          // Здесь можно обновлять список файлов скажем так и убирать лоадер
        })
      } catch (error) {
        console.error('Ошибка получения списка файлов:', error)
        this.isFilesLoading = false
      }
    },

    async loadFile(filePath) {
      this.isFilesLoading = true;

      try {
        const storageRef = firebaseStorageRef(storage, filePath) // Пустая строка для получения списка файлов в корне хранилища
        this.transformFilesData([storageRef]).then(() => {
          this.isFilesLoading = false;
        });
        this.isFilesLoading = false
      } catch (error) {
        console.error('Ошибка получения списка файлов:', error)
        this.isFilesLoading = false
      }
    },

    async transformFilesData(fileItems) {
      const fileDataPromises = fileItems.map(async (item, index) => {
        const metadata = await getMetadata(item)
        const url = await getDownloadURL(item)
        item.url = url
        item.metadata = metadata

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
        return item
      })

      return Promise.all(fileDataPromises)
    },


  }
})
