<template>
  <div class="list">
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
        <file-item :id="file.id" :name="file.name" :type="file.type" :size="file.size" :url="file.url"
          :date="file.date" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFilesStore } from '@/stores/files.js';

import FileItem from './FileItem.vue';

const filesStore = useFilesStore();
const files = ref(filesStore.files);

</script>

<style>
.list {
  font-size: 16px;
  line-height: 120%;
  color: var(--sub-text-color);
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
</style>