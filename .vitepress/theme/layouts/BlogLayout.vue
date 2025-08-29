<template>
  <div class="blog-layout">
    <div class="container">
      <EnhancedArticlesList :title="articleTitle" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useData } from 'vitepress';
import { useInitData } from '../hooks/useInitData';
import EnhancedArticlesList from '../components/EnhancedArticlesList.vue';

// 初始化数据
useInitData();

const { frontmatter } = useData();
const articleTitle = frontmatter.value?.article?.title || '最新文章';
</script>

<style scoped>
.blog-layout {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
