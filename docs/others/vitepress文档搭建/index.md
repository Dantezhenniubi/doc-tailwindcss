---
layout: page
---

<!-- 测试按钮（悬停时有动画） -->
<div class="test-button tw:mb-4">Tailwind 工作正常！悬停查看效果</div>

<!-- 使用主题变量 -->
<div class="tw:p-4 tw:mb-4 tw:bg-[var(--primary-color)]/10 tw:border-l-4 tw:border-[var(--primary-color)]">
  ✔ 主题变量 --primary-color 工作正常
</div>

<!-- 脉冲动画效果 -->
<div class="test-pulse tw:mb-4">动画效果正常</div>

<!-- Tailwind 原生类测试 -->
<div class="tw:flex tw:gap-4 tw:flex-wrap">
  <div class="tw:p-4 tw:bg-green-500 tw:text-white tw:rounded">绿色背景</div>
  <div class="tw:p-4 tw:bg-yellow-500 tw:text-white tw:rounded">黄色背景</div>
  <div class="tw:p-4 tw:bg-red-500 tw:text-white tw:rounded">红色背景</div>
</div>

<!-- 响应式设计测试 -->
<div class="tw:bg-blue-500 tw:text-white tw:p-4 tw:md:bg-green-500">
  小屏幕蓝色 ↔ 大屏幕绿色（大于768px）
</div>

<TailwindCard @click="handleButtonClick">
<template #button>
点击我
</template>
</TailwindCard>

<script setup>
import { ref } from 'vue'

const count = ref(0)

const handleButtonClick = (e) => {
  console.log('按钮点击事件触发', e)
  // 弹窗
  window.alert('点击次数: ' + count.value)
  count.value++
}
</script>
