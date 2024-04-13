<template>
  <div class="item">
    <div class="item__icon"></div>

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

defineProps({
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