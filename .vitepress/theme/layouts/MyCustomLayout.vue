<template>
  <!-- 纹理背景图 PNG（最底层） -->
  <div :class="`min-h-screen relative overflow-hidden bg-center ${bgClass}`">
    <!-- 渐变遮罩：只裁背景，不裁内容 -->
    <div class="absolute inset-0 bg-mask-container pointer-events-none" aria-hidden="true">
      <img v-if="$isDark.value == false" :src="withBase('/LightBG/waves.svg')" alt="" />
    </div>
    <!-- 内容层：完全正常 -->
    <el-container class="relative z-10">
      <BGChange class="fixed bottom-6 left-6 p-2 z-1" @click="nextBg(isDark)" />
      <!-- 顶部栏：用 Element Plus 的 el-header -->
      <el-header
        class="flex flex-col items-center justify-center h-96! px-6! p-[60px_0]! mt-[53px] relative"
      >
        <TextType
          :text="['现在的时间是', currentTime, 'Happy coding!']"
          :typing-speed="75"
          :pause-duration="1500"
          :show-cursor="true"
          cursor-character="|"
          class="text-[var(--color-text-primary)] dark:text-[var(--color-text-dark-primary)] select-none"
        />
        <!-- ✅ 左侧内容 -->
        <el-row class="items-center m-4 w-full select-none">
          <el-col :span="24" class="text-center">
            <el-row class="flex flex-row items-center mb-4 justify-center">
              <el-col :span="24" :lg="12">
                <span
                  class="text-5xl lg:text-7xl xl:text-9xl font-bold font-[KMHai] text-[var(--color-text-primary)] dark:text-[var(--color-text-dark-primary)] text-nowrap"
                >
                  零时迷子
                </span>
              </el-col>
            </el-row>

            <el-row
              :key="quoteKey"
              v-motion-slide-top
              class="items-center mb-4 justify-center font-[SFPlus]"
            >
              <span
                class="text-xl/10 font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-dark-primary)]"
              >
                {{ currentQuote.content }}<br />
                — <span class="text-sm">{{ currentQuote.author }}</span>
              </span>
            </el-row>
          </el-col>
        </el-row>

        <!-- ✅ 右侧圆形文字：绝对定位，不受左侧影响 -->
        <!-- <div
          class="absolute top-1/2 right-10 lg:right-10 xl:right-24 2xl:right-44 -translate-y-1/2 select-none hidden lg:block"
        >
          <CircularText
            text="Dante * ZNB * IS FREE * "
            :spin-duration="20"
            on-hover="speedUp"
            :img-src="withBase('/处理1.png')"
            img-size="size-64"
            ring-size="size-96"
            class-name="text-5xl!"
          />
        </div> -->
      </el-header>

      <!-- 主体：el-container + el-aside + el-main -->
      <el-container class="max-w-7xl mx-auto min-h-screen">
        <el-main class="min-w-0 lg:min-w-5xl p-4 md:p-6">
          <!-- 文章列表 -->
          <NavList />
        </el-main>

        <!-- 侧边栏 -->
        <!-- <el-aside width="320px" class="hidden lg:block p-4">
          <Sidebar />
        </el-aside> -->
      </el-container>

      <!-- 底部 -->
      <ELFooterBar />
    </el-container>
  </div>
</template>

<script setup>
import NavList from './NavList.vue';
import Sidebar from './Sidebar.vue';
import ELFooterBar from '../layouts/EL-FooterBar.vue';
import BGChange from '../layouts/BGChange.vue';
import { quote } from '../layouts/Quote.ts';

import { useStore } from '@nanostores/vue';
import { nextBg, preloadAll, currentBgClass, $isDark } from '../store/bgStore';

import { inject, watchPostEffect, ref, onMounted } from 'vue';
import { useData, withBase } from 'vitepress';

const { isDark, theme } = useData();

const bgClass = useStore(currentBgClass);

// 创建已显示名言的索引数组
const displayedQuotes = ref([]);
// 获取随机名言
const getRandomQuote = () => {
  // 如果所有名言都已显示过，重置显示记录
  if (displayedQuotes.value.length >= quote.length) {
    displayedQuotes.value = [];
  }

  // 过滤出未显示过的名言索引
  const availableIndices = quote
    .map((_, index) => index)
    .filter((index) => !displayedQuotes.value.includes(index));

  // 从可用索引中随机选择一个
  const randomIndex =
    availableIndices.length > 0
      ? availableIndices[Math.floor(Math.random() * availableIndices.length)]
      : Math.floor(Math.random() * quote.length); // 备用方案

  // 记录已显示的名言索引
  displayedQuotes.value.push(randomIndex);

  return quote[randomIndex];
};

// 创建响应式引用存储当前名言
const currentQuote = ref(getRandomQuote());

// 创建响应式引用用于key值，每次更新都会改变
const quoteKey = ref(0);

// 创建响应式引用存储当前时间
const currentTime = ref(new Date().toLocaleString());

// 监听 isDark 的变化并更新到 bgStore
watchPostEffect(() => {
  $isDark.set(isDark.value);
});

onMounted(() => {
  // 预加载下一张背景图
  preloadAll();
  // 每隔一段时间更换名言（可选功能）
  setInterval(() => {
    currentQuote.value = getRandomQuote();
    // 更新key值以触发动画
    quoteKey.value++;
  }, 10000);
  // 每秒更新时间
  setInterval(() => {
    currentTime.value = new Date().toLocaleString();
  }, 1000);
});
</script>

<style scoped>
@reference "tailwindcss";

/* 背景蒙版渐变色 */
.bg-mask-container {
  @apply bg-gradient-to-t from-[#705e26]/20 to-teal-400/50;

  @variant dark {
    @apply bg-gradient-to-t from-blue-300/20 to-purple-400/50;
  }
}
</style>
