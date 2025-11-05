<template>
  <el-footer
    class="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-t border-gray-200 dark:border-gray-700"
  >
    <div class="h-full max-w-7xl mx-auto px-6 flex items-center justify-between text-sm">
      <!-- 左侧：版权 + 运行时长 -->
      <div v-motion-slide-visible-left class="text-gray-600 dark:text-gray-400">
        © {{ startYear }}
        <template v-if="showSpan">- {{ currentYear }}</template>
        {{ siteName }}
        <span class="ml-2 hidden sm:inline">
          · 已运行 <strong class="text-blue-600 dark:text-blue-400">{{ runDays }}</strong> 天
        </span>
      </div>

      <!-- 右侧：链接 -->
      <div v-motion-slide-visible-right class="flex items-center space-x-4">
        <!-- GitHub -->
        <a
          :href="github"
          target="_blank"
          rel="noopener"
          class="flex! items-center! space-x-1! text-gray-700! dark:text-gray-300! hover:text-blue-600! dark:hover:text-blue-400! transition"
        >
          <Icon icon="line-md:github-loop" width="20" height="20" class="mb-1 mr-0!" />
          <span>源码</span>
        </a>

        <!-- 隐私政策 / 使用条款 -->
        <el-button link @click="go('/privacy')">隐私政策</el-button>
        <el-button link @click="go('/terms')">使用条款</el-button>

        <!-- 备案 -->
        <a
          v-if="icp"
          :href="`https://beian.miit.gov.cn/#/Integrated/index`"
          target="_blank"
          rel="noopener"
          class="text-gray-500 dark:text-gray-400 hover:underline"
        >
          {{ icp }}
        </a>
      </div>
    </div>
  </el-footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vitepress';
// import { Github } from '@element-plus/icons-vue';

/* ====== 可配置项 ====== */
const startYear = 2025; // 项目起始年
const siteName = 'DanteZNB的技术博客';
const github = 'https://github.com/Dantezhenniubi/doc-tailwindcss';
const icp = ''; // 若无备案，留空即可
/* ======================= */

const currentYear = new Date().getFullYear(); //  当前年份
const showSpan = currentYear !== startYear; // 如果当前年与起始年不同，才显示“- 当前年”
// 计算运行时长
const runDays = computed(() => {
  const start = new Date(startYear, 0, 1);
  const diff = Date.now() - start.getTime();
  return Math.floor(diff / 86400000); // floor() 函数用于把一个数转为整数。
});

const router = useRouter();
const go = (path: string) => router.go(path);
</script>
