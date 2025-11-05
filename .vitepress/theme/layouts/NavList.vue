<template>
  <div class="article-list-container">
    <!-- 烟花触发器，隐藏不占位 -->
    <firework ref="fire" />
    <section class="px-4 py-6 max-w-7xl mx-auto">
      <!-- 搜索 -->
      <NavListSearch
        v-model="searchQuery"
        placeholder="搜索网站 / 描述"
        class="mb-4 font-[AiDian]"
        @search="handleSearch"
      />

      <!-- 大分类 Segmented  官方插槽参数 = { item } -->
      <div class="select-none font-[AiDian] max-w-80 sm:max-w-full" @click="onSegmentClick">
        <el-segmented v-model="bigCat" :options="bigOptions" block @change="onBigChange">
          <template #default="{ item }">
            <span class="inline-flex items-center gap-1">
              <Icon v-if="item.icon" :icon="item.icon" class="w-4 h-4" />
              {{ item.label }}
            </span>
          </template>
        </el-segmented>
      </div>

      <div class="flex gap-4 mt-4">
        <!-- 左侧小分类 tabs：全部时隐藏 -->
        <el-tabs
          v-if="bigCat !== '全部'"
          v-model="smallCat"
          tab-position="left"
          @tab-click="onSmallClick"
        >
          <el-tab-pane v-for="sub in subList" :key="sub.name" :label="sub.name" :name="sub.name" />
        </el-tabs>
        <!-- 卡片网格 -->
        <div class="flex-1">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <NavCard v-for="site in displaySites" :key="site.url" :site="site" />
          </div>

          <!-- 分页器 -->
          <div v-if="filteredSites.length > pageSize" class="mt-6 flex justify-center">
            <NavListPage
              ref="pageRef"
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :total="filteredSites.length"
              layout="total, jumper, prev, pager, next, sizes"
              :page-sizes="[8, 12, 16, 20]"
              background
              @size-change="currentPage = 1"
            >
            </NavListPage>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, h, useTemplateRef } from 'vue';
import NavCard from './NavListCard.vue';
import NavListSearch from './NavListSearch.vue';
import NavListPage from './NavListPage.vue';
import firework from '../components/confetti.vue';
import { categoryMap } from './siteData';
import { useDebouncedRef } from '../hooks/useDebouncedRef';

/* ======  数据  ====== */
// 搜索传入的关键字
const { originalValue: searchQuery, debouncedValue, flush } = useDebouncedRef('', 500);
const bigCat = ref('全部'); // 当前大分类
const smallCat = ref('Vue 生态'); // 当前小分类
// 分页相关
const currentPage = ref(1);
const pageSize = ref(12); // 每页显示 12 个卡片（可调）

/* ======  计算  ====== */
/* 大分类选项 */
const bigOptions = [
  { label: '全部', value: '全部' },
  ...Object.keys(categoryMap)
    .filter((k) => k !== '全部')
    .map((k) => ({ label: k, value: k })),
];

/* 当前大分类下的小分类列表 */
const subList = computed(() => categoryMap[bigCat.value] || []);

// 处理搜索
function handleSearch() {
  flush(); // 立即更新 debouncedValue 为最新值
  // 此时 debouncedValue 已同步，displaySites 会自动更新
}

const filteredSites = computed(() => {
  const kw = debouncedValue.value.toLowerCase().trim();

  let sites = [];
  if (bigCat.value === '全部') {
    sites = categoryMap.全部?.[0]?.sites || [];
  } else {
    const currentSub = subList.value.find((s) => s.name === smallCat.value);
    sites = currentSub?.sites || [];
  }
  // 搜索过滤
  return sites.filter(
    (s) => s.name.toLowerCase().includes(kw) || (s.desc && s.desc.toLowerCase().includes(kw))
  );
});

// 分页后的显示列表
const displaySites = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredSites.value.slice(start, end);
});

// 页码变化时重置到第一页
watch([bigCat, smallCat, debouncedValue], () => {
  currentPage.value = 1;
});

/* 切换大分类时将小分类选中第一个 */
function onBigChange() {
  smallCat.value = subList.value[0]?.name || ''; // 默认选第一个小分类
}

/* -------- 烟花 -------- */
const fire = ref();
let lastValue = bigCat.value;
/* 烟花特效（点击 segmented 或大 tab 都放） */
function onSmallClick() {
  fire.value.startFirework(event);
} // 原生事件
function onSegmentClick(e) {
  // 等 DOM 更新后再判断值是否变化
  nextTick(() => {
    if (bigCat.value !== lastValue) {
      fire.value.startFirework(e);
      lastValue = bigCat.value;
    }
  });
}
</script>

<style scoped>
@reference "tailwindcss";

/* --------------------el-segmented样式---------------------------- */
/* 标签页容器样式 */
.article-list-container :deep(.el-segmented) {
  @apply text-gray-800 bg-gray-50 h-10 rounded-xl text-sm lg:text-lg 2xl:text-xl;
}
.dark .article-list-container :deep(.el-segmented) {
  @apply text-gray-50 bg-gray-800;
}

/* 被选中的标签页样式(内容部分) */
.article-list-container :deep(.el-segmented__item.is-selected) {
  @apply scale-125 text-gray-50 font-bold;
}
.dark .article-list-container :deep(.el-segmented__item.is-selected) {
  @apply text-emerald-300/50;
}

/* 普通标签页容器样式 */
.article-list-container :deep(.el-segmented__item) {
  @apply rounded-xl;
}

/* 滑块 */
.article-list-container :deep(.el-segmented__item-selected) {
  @apply bg-blue-400/80 rounded-xl shadow-[0_2px_4px_rgba(45,35,66,0.2),0_7px_13px_-3px_rgba(45,35,66,0.15)] inset-shadow-[0_-3px_0_#d6d6e7];
}
.dark .article-list-container :deep(.el-segmented__item-selected) {
  @apply bg-gray-600;
}

/* 鼠标移入标签样式 */
.article-list-container :deep(.el-segmented__item:hover:not(.is-selected)) {
  @apply hover:-translate-y-1 border-1 border-emerald-200 text-gray-800 shadow-[0_2px_4px_rgba(45,35,66,0.2),0_7px_13px_-3px_rgba(45,35,66,0.15)] inset-shadow-[0_-3px_0_#d6d6e7];
}
.dark .article-list-container :deep(.el-segmented__item:hover:not(.is-selected)) {
  @apply bg-gray-800 text-gray-50;
}

/* --------------------el-tabs样式---------------------------- */

/* 非选中小标签样式 */
.article-list-container :deep(.el-tabs__item:not(.is-active)) {
  @apply text-inherit;
}
/* 非选中悬浮小标签样式 */
.article-list-container :deep(.el-tabs__item:hover:not(.is-active)) {
  @apply bg-gray-500/50 rounded-l-xl animate-pulse;
}

/* 选中小标签样式 */
.article-list-container :deep(.el-tabs__item.is-active) {
  @apply text-gray-50 bg-blue-400/80 rounded-l-xl;
}
.dark .article-list-container :deep(.el-tabs__item.is-active) {
  @apply text-emerald-300/50 bg-gray-900/50 border-1 border-double;
}

/* 小标签整体容器 */
.article-list-container :deep(.el-tabs) {
  @apply shadow-lg rounded-l-xl p-2 text-gray-800 bg-gray-50;
}
.dark .article-list-container :deep(.el-tabs) {
  @apply text-gray-50 bg-gray-800;
}

/* 未选中标签导航条 */
.article-list-container :deep(.el-tabs__nav-wrap::after) {
  @apply bg-gray-400/80;
}
.dark .article-list-container :deep(.el-tabs__nav-wrap::after) {
  @apply bg-gray-600;
}

/* 选中标签导航条 */
.article-list-container :deep(.el-tabs__active-bar) {
  @apply bg-blue-400/90;
}
.dark .article-list-container :deep(.el-tabs__active-bar) {
  @apply bg-emerald-300;
}
</style>
