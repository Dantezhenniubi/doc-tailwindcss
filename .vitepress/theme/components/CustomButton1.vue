<!-- 暂留按钮样式，等待后续使用 -->
<template>
  <button type="button" role="button" class="button-name" @click.prevent="">
    <Icon icon="fluent:color-background-20-regular" width="20" height="20" />
  </button>
</template>

<script setup lang="ts">
// import { nextBg, preloadAll, currentBgClass, $isDark } from '../store/bgStore';

// import { inject, watchPostEffect, ref, onMounted } from 'vue';
// import { useData, withBase } from 'vitepress';

// const { isDark, theme } = useData();

// function changeBg() {
//   nextBg();
// }

// watchPostEffect(() => {
//   $isDark.set(isDark.value);
// });
</script>

<style scoped>
@reference "tailwindcss";

.button-name {
  @apply items-center appearance-none bg-[#fcfcfd] rounded-sm border-[0] shadow-[0_2px_4px_rgba(45,35,66,0.2),0_7px_13px_-3px_rgba(45,35,66,0.15)] inset-shadow-[0_-3px_0_#d6d6e7] box-border text-[#36395a] cursor-pointer inline-flex;
  /* box-shadow:
    rgba(45, 35, 66, 0.2) 0 2px 4px,
    rgba(45, 35, 66, 0.15) 0 7px 13px -3px,
    #d6d6e7 0 -3px 0 inset; */
  font-family: 'JetBrains Mono', monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition:
    box-shadow 0.15s,
    transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;
}

.button-name:focus {
  box-shadow:
    #d6d6e7 0 0 0 1.5px inset,
    rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
    #d6d6e7 0 -3px 0 inset;
}

.button-name:hover {
  box-shadow:
    rgba(45, 35, 66, 0.3) 0 4px 8px,
    rgba(45, 35, 66, 0.2) 0 7px 13px -3px,
    #d6d6e7 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-name:active {
  box-shadow: #d6d6e7 0 3px 7px inset;
  transform: translateY(2px);
}
</style>
