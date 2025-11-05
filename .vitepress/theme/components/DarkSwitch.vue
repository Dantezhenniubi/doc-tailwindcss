<template>
  <div>
    <label class="switch" :title="switchTitle">
      <input type="checkbox" :checked="isDark" @change="toggleAppearance" />
      <span class="slider"></span>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { inject, watchPostEffect, ref } from 'vue';
import { useData } from 'vitepress';
import { nextBg, $isDark } from '../store/bgStore';

const { isDark, theme } = useData();

const toggleAppearance = inject('toggle-appearance', () => {
  isDark.value = !isDark.value;
  $isDark.set(isDark.value); // 同步原子
  // nextBg(); // 打开后，切换主题时背景图片索引增加会切换
});

const switchTitle = ref('');

watchPostEffect(() => {
  switchTitle.value = isDark.value
    ? theme.value.lightModeSwitchTitle || 'Switch to light theme'
    : theme.value.darkModeSwitchTitle || 'Switch to dark theme';
});
</script>

<style scoped>
@reference "tailwindcss";
/* 组件容器样式 The switch - the box around the slider */
.switch {
  font-size: 1rem;
  position: relative;
  display: inline-block;
  width: 4em;
  height: 2em;
  margin: 0;
}

/* 隐藏原生复选框 Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* 滑块轨道样式 The slider */
.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #eee;
  transition: 0.4s;
  border-radius: 0.5em;
  box-shadow: 0 0.2em #dfd9d9;
}

/* 滑块按钮样式 */
.slider:before {
  position: absolute;
  content: '';
  height: 1.5em;
  width: 1.4em;
  border-radius: 0.3em;
  left: 0.3em;
  bottom: 0.7em;
  background-color: #6c63ff;
  transition: 0.4s;
  box-shadow: 0 0.4em #bcb4b4;
}

/* 交互效果 */
.slider:hover::before {
  @apply animate-pulse;
  box-shadow: 0 0.2em #bcb4b4;
  bottom: 0.5em;
}

input:checked + .slider:before {
  transform: translateX(2em);
  background: #97d8c4;
}

/* 暗色模式适配 Dark mode specific styles */
.dark .slider {
  background-color: #6a6a6a;
  box-shadow: 0 0.2em #444;
}

.dark .slider:before {
  background-color: #ff7b54;
  box-shadow: 0 0.4em #222;
}

.dark input:checked + .slider:before {
  background: #97d8c4;
}
</style>
