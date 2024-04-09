// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFilesStore = defineStore('filesStore', {
  state: () => ({
    files: [
      {
        id: '01',
        name: 'File-01',
        type: 'png',
        size: '230 KB',
        url: '...',
        date: '01 Mar 2024'
      },
      {
        id: '02',
        name: 'File-02',
        type: 'fig',
        size: '240 KB',
        url: '...',
        date: '04 Mar 2024'
      },
      {
        id: '01',
        name: 'File-01',
        type: 'png',
        size: '230 KB',
        url: '...',
        date: '01 Mar 2024'
      },
      {
        id: '02',
        name: 'File-02',
        type: 'fig',
        size: '240 KB',
        url: '...',
        date: '04 Mar 2024'
      }
    ]
  }),
  actions: {
    addFile(file) {
      this.files.push(file)
    },
    deleteFile(fileId) {
      const targetIndex = this.files.findIndex(file => file.id === fileId);
      if (targetIndex < 0) return;
      this.files.splice(targetIndex, 1);
    }
  }
})
