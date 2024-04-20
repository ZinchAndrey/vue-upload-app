<template>
  <div class="item">
    <div class="item__icon">
      <component :is="currentIcon"></component>
    </div>

    <div class="item__info-block">
      <h2 class="item__name">{{ name }}</h2>
      <span class="item__size-sub">{{ size }}</span>
    </div>

    <span class="item__size">{{ size }}</span>
    <span class="item__date">{{ date }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

import IconDocument from '@/components/UI/icons/IconDocument.vue';
import IconFigma from '@/components/UI/icons/IconFigma.vue';
import IconImage from '@/components/UI/icons/IconImage.vue';
import IconVideo from '@/components/UI/icons/IconVideo.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const getFileTypeIcon = (contentType) => {
  let icon = IconDocument;

  if (contentType.includes('figma')) {
    icon = IconFigma;
  } else if (contentType.includes('image')) {
    icon = IconImage;
  } else if (contentType.includes('video')) {
    icon = IconVideo;
  }

  return icon;
}

const currentIcon = getFileTypeIcon(props.contentType);
console.log(currentIcon);
</script>

<style scoped>
.item {
  font-size: 18px;
  line-height: 120%;
  color: var(--sub-text-color);

  display: flex;
  align-items: center;

  padding: 16px 24px;
  background: inherit;

}

.item__icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;

  background-color: var(--icon-bg-color);

  display: flex;
  align-items: center;
  justify-content: center;
}

.item__info-block {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.item__name {
  color: var(--text-color);
  font-weight: 600;
  font-size: 18px;
  line-height: 120%;
  margin: 0;
}

.item__size {
  padding: 0 24px;
  min-width: 176px;
}

.item__date {
  padding: 0 24px;
  min-width: 176px;
}
</style>