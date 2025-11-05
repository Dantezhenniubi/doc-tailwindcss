<!-- 卡片组件，需要配合网格布局使用 -->
<template>
  <div>
    <div
      class="group flex flex-col max-w-80 p-4 bg-linear-to-b from-white to-sky-200/50 dark:from-gray-800 dark:to-amber-200/50 NavCard-border rounded-lg min-h-26 max-h-26 hover:max-h-64 shadow hover:shadow-lg hover:shadow-amber-100 dark:hover:shadow-amber-500/80 border border-gray-200 dark:border-gray-700 transition-[max-height,box-shadow] duration-300 ease-in-out"
    >
      <!-- 上半：图标 + 标题 -->
      <a :href="site.url" target="_blank" rel="noopener">
        <div class="flex items-center gap-3 mb-2">
          <Icon :icon="site.iconName || 'mdi:mdi'" class="w-6 h-6 flex-shrink-0" />
          <el-popover placement="top" popper-class="my-tooltip" :show-arrow="false">
            <template #default
              ><p class="">{{ site.name }}</p></template
            >
            <template #reference>
              <span class="text-gray-900 dark:text-gray-100 font-medium truncate">
                {{ site.name }}
              </span>
            </template>
          </el-popover>

          <el-icon class="text-gray-400 hover:text-blue-500 dark:hover:text-indigo-500 ml-auto"
            ><Promotion
          /></el-icon>
        </div>
      </a>

      <!-- 下半：描述（超出省略号） -->
      <div
        class="relative px-4 pb-4 text-sm text-gray-800 dark:text-gray-300 max-h-[2.6em] group-hover:max-h-[60em] transition-[max-height] duration-300 ease-in-out overflow-hidden"
      >
        <!-- 上层：单行 + 省略号 -->
        <div class="absolute inset-0 left-4 right-4 opacity-100 group-hover:opacity-0 line-clamp-2">
          {{ site.desc }}
        </div>

        <!-- 下层：全文 -->
        <div class="opacity-0 group-hover:opacity-100">
          {{ site.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Promotion } from '@element-plus/icons-vue';

defineProps({
  site: {
    type: Object,
    required: true,
    validator: (prop) => {
      return prop.url && prop.name;
    },
  },
});
</script>

<style scoped>
@reference "tailwindcss";

.NavCard-border {
  @apply border-[0.2em] border-gray-400/80 hover:border-sky-400/90;
}
.dark .NavCard-border {
  @apply border-gray-600/80 hover:border-emerald-300;
}
</style>

<style>
@reference "tailwindcss";
/* 定义el组件库的el-popover样式 */
.my-tooltip {
  @apply bg-blue-400/60! rounded-xl! border-gray-50! text-gray-800! flex justify-center text-base!;
}
.dark .my-tooltip {
  @apply bg-gray-800! border-emerald-300! text-gray-50!;
}
</style>
