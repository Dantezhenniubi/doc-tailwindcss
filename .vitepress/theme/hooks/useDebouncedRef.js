// 适用于响应式的防抖函数

// composables/useDebouncedRef.js
/* 在组件中使用：
<script setup>
import { useDebouncedRef } from '@/composables/useDebouncedRef'

const { originalValue: searchQuery, debouncedValue } = useDebouncedRef('', 500)

watch(debouncedValue, (query) => {
  if (query) performSearch(query)
})
</script>

<template>
  <SearchInput v-model="searchQuery" />
</template>
*/
import { ref, watch, onUnmounted } from 'vue';
import { debounce } from 'lodash-es';
export function useDebouncedRef(value, delay = 300) {
  const debouncedValue = ref(value);
  const originalValue = ref(value);

  // 创建防抖函数
  const debouncedUpdate = debounce((val) => {
    debouncedValue.value = val;
  }, delay);

  // 监听原始值变化
  watch(originalValue, (newVal) => {
    debouncedUpdate(newVal);
  });

  // 立即执行防抖函数（用于 Enter 场景）
  const flush = () => {
    debouncedUpdate.flush?.(); // lodash 的 flush 会立即调用并清空队列
    // 如果手写 debounce，需自己实现 flush
  };

  // 组件卸载时取消定时器（防内存泄漏）
  onUnmounted(() => {
    debouncedUpdate.cancel?.();
  });

  return {
    originalValue, // 实时值（用于 v-model）
    debouncedValue, // 防抖后的值（用于搜索/API）
    flush, // 手动触发防抖函数
  };
}
