<template>
  <div class="item">
    <div class="item__icon">
      <component :is="currentIcon"></component>
    </div>

    <div class="item__info-block">
      <h2 class="item__name">{{ name }}</h2>
      <button class="item__link-sub" @click="copyUrl">
        <icon-copy />

        {{ isCopied ? 'copied!' : 'copy link' }}
      </button>
    </div>

    <span class="item__size">{{ size }}</span>
    <span class="item__date">{{ date }}</span>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';

import { copyToClipboard } from '@/assets/utils';

import IconCopy from '@/components/UI/icons/IconCopy.vue';
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

const COPIED_TIMEOUT = 1 * 1000;

const isCopied = ref(false);

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

const copyUrl = () => {
  copyToClipboard(props.url);

  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, COPIED_TIMEOUT);
}

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

.item__link-sub {
  font-family: inherit;
  font-size: 16px;
  line-height: 120%;
  color: inherit;
  padding: 5px 0;

  position: relative;
  width: fit-content;
  background: transparent;
  border: none;

  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  transition: all ease-in 0.3s;
}

.item__link-sub::before {
  content: '';
  display: block;
  position: absolute;
  bottom: 3px;
  width: 0;
  height: 1px;
  border-bottom: 1px dashed var(--theme-color);
  transition: all cubic-bezier(0.85, 0.05, 1, 1) 0.3s;

}

.item__link-sub:hover {
  color: var(--theme-color);
}

.item__link-sub:hover::before {
  width: 100%;
}

.item__size {
  padding: 0 24px;
  min-width: 176px;
}

.item__date {
  padding: 0 24px;
  min-width: 176px;
}

@media (max-width: 768px) {
  .item {
    font-size: 14px;
    padding: 12px 20px;
  }

  .item__name {
    font-size: 16px;
  }

  .item__link-sub {
    font-size: 14px;
  }

  .item__size {
    padding: 0;
    min-width: unset;
  }

  .item__date {
    text-align: right;
    padding: 0;
    min-width: unset;
  }

  .item__icon {
    margin: 0;
    max-width: 40px;
  }

  /* GRID */
  .item {
    display: grid;
    grid-template-columns: 40px 1fr 1fr;
    grid-template-rows: repeat(2, auto);
    grid-column-gap: 20px;
    grid-row-gap: 0px;
  }

  .item__icon {
    grid-area: 1 / 1 / 3 / 2;
  }

  .item__info-block {
    grid-area: 1 / 2 / 2 / 4;
  }

  .item__size {
    grid-area: 2 / 2 / 3 / 3;
  }

  .item__date {
    grid-area: 2 / 3 / 3 / 4;
  }
}
</style>