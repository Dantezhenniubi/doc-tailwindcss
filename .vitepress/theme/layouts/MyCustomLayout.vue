<template>
  <div class="my-custom-layout">
    <header class="custom-header">
      <h1>我的自定义布局</h1>
      <!-- 您可以在这里添加导航栏或其他头部元素 -->
    </header>

    <main class="custom-content flex box-content items-center justify-center">
      <Content />
      <PixelCard
        class="z-0 items-center relative"
        variant="default"
        :gap="5"
        :speed="35"
        colors="#f8fafc,#f1f5f9,gray"
        :no-focus="false"
        class-name=""
      >
        <p class="z-50 absolute p-5 flex items-center justify-center">aaahhhh</p>
      </PixelCard>
    </main>

    <footer class="custom-footer">
      <!-- 您的页脚内容 -->
      <p>© 2023 我的网站</p>
    </footer>
  </div>
</template>

<script setup>
import { useData } from 'vitepress';

// 获取VitePress提供的数据
const { page, frontmatter } = useData();
</script>

<style scoped>
.my-custom-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.custom-header {
  padding: 2rem;
  background-color: #f0f0f0;
  text-align: center;
}

.custom-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.custom-footer {
  padding: 1rem;
  background-color: #f0f0f0;
  text-align: center;
}
</style>
