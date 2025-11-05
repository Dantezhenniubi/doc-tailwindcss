<template>
  <div class="sidebar-container space-y-6">
    <!-- 作者信息卡片 -->
    <n-card class="author-card" content-style="padding: 24px;">
      <div class="text-center">
        <n-avatar
          :src="author.avatar"
          :size="80"
          round
          class="mx-auto mb-4 border-4 border-blue-100 dark:border-gray-700"
        />
        <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          {{ author.name }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">
          {{ author.description }}
        </p>

        <div class="flex justify-center space-x-3 mb-4">
          <n-button
            v-for="link in author.socialLinks"
            :key="link.name"
            circle
            secondary
            type="primary"
            @click="openLink(link.url)"
          >
            <template #icon>
              <n-icon :component="getSocialIcon(link.icon)" />
            </template>
          </n-button>
        </div>

        <n-grid :cols="2" :x-gap="12">
          <n-gi>
            <div class="text-center p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
              <div class="text-lg font-bold text-blue-600 dark:text-blue-400">
                {{ author.posts }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">文章</div>
            </div>
          </n-gi>
          <n-gi>
            <div class="text-center p-3 bg-green-50 dark:bg-gray-700 rounded-lg">
              <div class="text-lg font-bold text-green-600 dark:text-green-400">
                {{ author.projects }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">项目</div>
            </div>
          </n-gi>
        </n-grid>
      </div>
    </n-card>

    <!-- 分类统计 -->
    <n-card title="文章分类" content-style="padding: 20px;">
      <n-space vertical>
        <div
          v-for="category in categories"
          :key="category.name"
          class="flex justify-between items-center py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded px-2 transition-colors"
        >
          <span class="text-gray-700 dark:text-gray-300">{{ category.name }}</span>
          <n-tag :type="getCategoryTagType(category.name)" size="small">
            {{ category.count }}
          </n-tag>
        </div>
      </n-space>
    </n-card>

    <!-- 标签云 -->
    <n-card title="热门标签" content-style="padding: 20px;">
      <div class="flex flex-wrap gap-2">
        <n-tag
          v-for="tag in tags"
          :key="tag.name"
          :type="getTagType(tag.name)"
          size="small"
          round
          class="cursor-pointer hover:scale-105 transition-transform"
          @click="filterByTag(tag.name)"
        >
          <template #default>
            <span class="ml-1">{{ tag.count }}</span>
          </template>
        </n-tag>
      </div>
    </n-card>

    <!-- 最新项目 -->
    <n-card title="最新项目" content-style="padding: 20px;">
      <n-list>
        <n-list-item v-for="project in latestProjects" :key="project.id">
          <div class="flex items-start">
            <n-icon-wrapper :size="32" :border-radius="8" class="mr-3 flex-shrink-0">
              <n-icon :size="20" :component="getProjectIcon(project.category)" />
            </n-icon-wrapper>
            <div class="flex-1 min-w-0">
              <h4 class="font-medium text-gray-800 dark:text-gray-200 truncate">
                {{ project.title }}
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 truncate">
                {{ project.description }}
              </p>
              <div class="flex space-x-2 mt-2">
                <n-button size="tiny" type="primary" ghost @click="openLink(project.demoUrl)">
                  演示
                </n-button>
                <n-button size="tiny" type="default" ghost @click="openLink(project.repoUrl)">
                  源码
                </n-button>
              </div>
            </div>
          </div>
        </n-list-item>
      </n-list>
    </n-card>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from '@nanostores/vue';
import { $posts } from '../store/posts';
import {
  NCard,
  NAvatar,
  NButton,
  NIcon,
  NGrid,
  NGi,
  NSpace,
  NTag,
  NList,
  NListItem,
  NIconWrapper,
} from 'naive-ui';

// 获取文章数据
const posts = useStore($posts);

// 作者信息
const author = {
  name: '张三',
  avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
  description: '全栈开发者，热爱开源和技术创新',
  posts: 24,
  projects: 12,
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: 'github',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: 'twitter',
    },
  ],
};

// 分类统计
const categories = computed(() => {
  const categoryMap = {};
  posts.value.forEach((post) => {
    const category = post.category || '未分类';
    categoryMap[category] = (categoryMap[category] || 0) + 1;
  });

  return Object.entries(categoryMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
});

// 标签云
const tags = computed(() => {
  const tagMap = {};
  posts.value.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        tagMap[tag] = (tagMap[tag] || 0) + 1;
      });
    }
  });

  return Object.entries(tagMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
});

// 最新项目
const latestProjects = [
  {
    id: 1,
    title: '项目一',
    category: 'Web开发',
    description: '这是一个使用Vue.js构建的现代化Web应用，具有响应式设计和优秀的用户体验。',
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com/example/project1',
  },
  {
    id: 2,
    title: '项目二',
    category: '移动应用',
    description: '基于React Native开发的跨平台移动应用，支持iOS和Android平台。',
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com/example/project2',
  },
  {
    id: 3,
    title: '项目三',
    category: '后端服务',
    description: '使用Node.js和Express构建的RESTful API服务，提供高性能的数据处理能力。',
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com/example/project3',
  },
];

// 打开链接
const openLink = (url) => {
  window.open(url, '_blank');
};

// 获取社交图标
const getSocialIcon = (iconName) => {
  // 简化处理，实际项目中应该导入具体图标
  return iconName;
};

// 获取分类标签类型
const getCategoryTagType = (category) => {
  const typeMap = {
    前端: 'primary',
    后端: 'success',
    数据库: 'warning',
    工具: 'info',
    生活: 'error',
    默认: 'default',
  };

  return typeMap[category] || typeMap['默认'];
};

// 获取标签类型
const getTagType = (tag) => {
  const types = ['primary', 'success', 'warning', 'error', 'info'];
  const index = tag.charCodeAt(0) % types.length;
  return types[index];
};

// 获取项目图标
const getProjectIcon = (category) => {
  const iconMap = {
    Web开发: 'GlobeOutline',
    移动应用: 'PhonePortraitOutline',
    后端服务: 'ServerOutline',
    默认: 'BriefcaseOutline',
  };

  return iconMap[category] || iconMap['默认'];
};

// 按标签筛选
const filterByTag = (tag) => {
  // 实现筛选逻辑
  console.log('Filter by tag:', tag);
};
</script>

<style scoped>
.sidebar-container {
  padding: 24px 12px;
}

.author-card {
  border-radius: 12px;
}

:deep(.n-card-header__main) {
  font-size: 18px;
  font-weight: 600;
}
</style>
