<template>
  <button class="button" :class="{ 'button--filled': mode === 'filled' }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: '',
    }
  }
}
</script>

<style scoped>
.button {
  font-family: inherit;
  font-size: 16px;
  line-height: 100%;
  font-weight: 400;
  color: var(--theme-color);

  padding: 16px;
  display: inline-block;
  border: 1px solid var(--theme-color);
  border-radius: 8px;
  background-color: #fff;
  min-width: 200px;

  cursor: pointer;
}

.button--filled {
  background-color: var(--theme-color);
  border-color: var(--theme-color);
  color: #fff;
}
</style>