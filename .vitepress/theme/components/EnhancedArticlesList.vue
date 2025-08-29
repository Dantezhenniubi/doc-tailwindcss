<template>
  <div class="enhanced-articles">
    <div v-if="title" class="articles-header">
      <h2 v-motion-slide-visible-left>{{ title }}</h2>
    </div>

    <div class="articles-grid">
      <article
        v-for="(post, index) in displayPosts"
        :key="post.path"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            duration: 600,
            delay: index * 100,
            ease: 'easeOut',
          },
        }"
        class="article-card"
      >
        <div class="article-meta">
          <span class="article-date">{{ formatDate(post.date) }}</span>
          <span class="article-category">{{ post.category }}</span>
        </div>

        <h3 class="article-title">
          <a :href="post.path">{{ post.title }}</a>
        </h3>

        <p class="article-description">{{ post.description }}</p>

        <div class="article-footer">
          <div class="article-stats">
            <span>{{ post.words }} 字</span>
            <span>{{ post.minutes }} 分钟阅读</span>
          </div>

          <div class="article-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </article>
    </div>

    <div v-if="displayPosts.length === 0" class="empty-state">
      <p>暂无文章</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { $posts } from '../store/posts';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  limit: {
    type: Number,
    default: null,
  },
});

const posts = useStore($posts);
const displayPosts = computed(() => {
  return props.limit ? posts.value.slice(0, props.limit) : posts.value;
});

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

onMounted(() => {
  console.log('posts', posts.value);
});
</script>

<style scoped>
.enhanced-articles {
  max-width: 800px;
  margin: 0 auto;
}

.articles-header {
  margin-bottom: 2rem;
  text-align: center;
}

.articles-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.articles-grid {
  display: grid;
  gap: 2rem;
}

.article-card {
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.article-category {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.article-title {
  margin: 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.article-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.article-title a:hover {
  color: var(--vp-c-brand-1);
}

.article-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.article-stats {
  display: flex;
  gap: 1rem;
  color: var(--vp-c-text-2);
}

.article-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: var(--vp-c-gray-soft);
  color: var(--vp-c-text-2);
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
}

.empty-state {
  text-align: center;
  color: var(--vp-c-text-2);
  padding: 2rem;
}
</style>
