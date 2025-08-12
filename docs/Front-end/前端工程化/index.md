---
layout: page
# title: 前端开发小技巧
# description: 分享一些实用的前端开发小技巧和经验
---

<script setup>
import { ref, onMounted } from 'vue'
import { useMarkdownFiles } from '../../../.vitepress/utils/pageUtils.js'
import { withBase } from 'vitepress'

// 初始化文章列表
const articles = ref([])

// 在组件挂载时获取文件列表
onMounted(() => {
  // 使用工具类获取文件列表
  useMarkdownFiles(articles, '前端工程化')
  console.log(articles.value)


})
</script>

<div class="tips-container">
  <div class="tips-header tw:font-aidian">
    <h2>前端工程化</h2>
    <!-- <p>这里收集了一些实用的前端开发小技巧和经验，希望对你有所帮助！</p> -->
  </div>
  <div class="tw:font-comic-mono">使用漫画风格等宽字体abcdef</div>
  <div class="tw:font-yupearl">使用俊羽圆体abcdef</div>
  <div class="tw:font-aidian tw:text-12pt">使用爱点风雅黑长体abcdef</div>
  <div class="tw:font-kmhai tw:text-3xl">使用昆明海鸥体abcdef</div>
  
  <div class="tips-list">
    <div v-for="article in articles" :key="article.name" class="tip-item">
      <a :href="withBase(article.route)" class="tip-link">
        <div class="tip-content">
          <h3>{{ article.name }}</h3>
        </div>
      </a>
    </div>
  </div>
</div>

<style scope>
.tips-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.tips-header {
  margin-bottom: 2rem;
  text-align: center;
}

.tips-header h1 {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  background-image: linear-gradient(to right, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tips-header p {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
}

.tips-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.tip-item {
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
}

.tip-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
}

.tip-link {
  display: block;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.tip-content {
  padding: 1.5rem;
}

.tip-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .tips-list {
    grid-template-columns: 1fr;
  }
  
  .tips-header h1 {
    font-size: 2rem;
  }
}
</style>
