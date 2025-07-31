<template>
  <div class="test-component">
    <h2>这是一个测试组件a</h2>
    <div class="tw:font-comic-mono">使用漫画风格等宽字体abcdef</div>
    <div class="tw:font-kmhai tw:text-3xl">使用昆明海鸥体abcdef</div>
    <p>当前计数：{{ count }}</p>
    <button @click="count++">增加</button>
    <button @click="count--">减少</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<style scoped>
.test-component {
  padding: 20px;
  border: 1px solid #f30404;
  border-radius: 8px;
  margin: 20px 0;
}

button {
  margin-right: 10px;
  padding: 5px 10px;
}
</style>
