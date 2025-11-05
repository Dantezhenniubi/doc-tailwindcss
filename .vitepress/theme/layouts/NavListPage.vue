<template>
  <div class="NavListPage">
    <ElPagination v-bind="$attrs" ref="paginationRef" popper-class="NavPageNumSelect">
      <template v-for="(value, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}" />
      </template>
    </ElPagination>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElPagination } from 'element-plus';

const paginationRef = ref<InstanceType<typeof ElPagination> | null>(null);

// 暴露底层实例（外部可通过 ref.paginationRef 访问）
defineExpose({
  paginationRef,
});
</script>

<style scoped>
@reference "tailwindcss";

/* --------------------el-pagination样式(基于tailwindcss v4)---------------------------- */
/* 总容器 */
:global(.NavListPage .el-pagination) {
  @apply font-[AiDian];
}

/* ------总数------ */
:global(.NavListPage .el-pagination .el-pagination__total) {
  @apply text-gray-800 bg-gray-50 rounded-full text-sm lg:text-base 2xl:text-lg p-1
         shadow-lg shadow-gray-400/50
         transition-all duration-300 ease-in-out;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 531.28 200'%3E%3Cpolygon fill='%230EA5E9' points='415.81 200 0 200 115.47 0 531.28 0 415.81 200'/%3E%3C/svg%3E");
  background-size: 200%;
  background-position: 200%;
  background-repeat: no-repeat;
}
:global(.NavListPage .el-pagination .el-pagination__total:hover) {
  @apply text-gray-50;
  background-position: 40%;
}
/* 暗色模式 */
:global(.dark .NavListPage .el-pagination .el-pagination__total) {
  @apply text-gray-100 bg-gray-800 shadow-emerald-300/10;
  /* 换成深色渐变（可选蓝/紫） */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 531.28 200'%3E%3Cpolygon fill='%2397D8C4' points='415.81 200 0 200 115.47 0 531.28 0 415.81 200'/%3E%3C/svg%3E");
  background-size: 200%;
  background-position: 200%;
}

:global(.dark .NavListPage .el-pagination .el-pagination__total:hover) {
  @apply text-gray-800;
  background-position: 40%;
}

/* ------跳至X页------ */
:global(.NavListPage .el-input__wrapper) {
  @apply text-gray-800 bg-gray-50 rounded-full
         shadow-lg shadow-gray-400/50
         transition-shadow duration-300 ease-in-out;
}
:global(.NavListPage .el-input__wrapper:hover) {
  @apply shadow-lg! shadow-gray-400/80!;
}
:global(.NavListPage .el-input__wrapper:focus-within) {
  @apply border-1 border-sky-600;
}
:global(.dark .NavListPage .el-input__wrapper) {
  @apply text-gray-50 bg-gray-800 rounded-full shadow-lg shadow-emerald-300/10
         transition-shadow duration-300 ease-in-out;
}
:global(.dark .NavListPage .el-input__wrapper:hover) {
  @apply shadow-emerald-300/50!;
}
:global(.dark .NavListPage .el-input__wrapper:focus-within) {
  @apply border-1 border-emerald-300;
}

/* 填写页数 */
:global(.NavListPage .el-input__inner) {
  @apply text-gray-800 text-sm lg:text-base 2xl:text-lg
         transition-all duration-300 ease-in-out;
}
:global(.NavListPage .el-input__wrapper:hover .el-input__inner) {
  @apply text-sky-600 text-shadow-lg;
}
:global(.NavListPage .el-input__inner:focus) {
  @apply text-sky-800;
}
:global(.dark .NavListPage .el-input__inner) {
  @apply text-gray-50;
}
:global(.dark .NavListPage .el-input__wrapper:hover .el-input__inner) {
  @apply text-emerald-300 text-shadow-lg;
}
:global(.dark .NavListPage .el-input__inner:focus) {
  @apply text-emerald-500;
}

/* ------↑回到上一页按钮------ */
:global(.NavListPage .el-pagination > .btn-prev:not(:disabled)) {
  @apply text-gray-800 bg-gray-50! transition-all duration-300 ease-in-out relative rounded-full;
}
:global(.NavListPage .el-pagination > .btn-prev:not(:disabled):hover) {
  @apply text-gray-50;
}
/* 背景动画层 */
:global(.NavListPage .el-pagination > .btn-prev:not(:disabled)::before) {
  @apply transition-all duration-300 ease-in-out rounded-full;
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 531.28 200'%3E%3Cpolygon fill='%230EA5E9' points='415.81 200 0 200 115.47 0 531.28 0 415.81 200'/%3E%3C/svg%3E");
  background-size: 300%;
  background-position: 200%;
  background-repeat: no-repeat;
}
:global(.dark .NavListPage .el-pagination > .btn-prev:not(:disabled)::before) {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 531.28 200'%3E%3Cpolygon fill='%2397D8C4' points='415.81 200 0 200 115.47 0 531.28 0 415.81 200'/%3E%3C/svg%3E");
  background-size: 300%;
  background-position: 200%;
}
:global(.NavListPage .el-pagination > .btn-prev:not(:disabled):hover::before) {
  background-position: 40%;
}
/* 微调黑暗模式hover文字颜色增加辨识度 */
:global(.dark .NavListPage .el-pagination > .btn-prev:not(:disabled):hover) {
  @apply text-gray-800;
}
:global(.dark .NavListPage .el-pagination > .btn-prev:not(:disabled)) {
  @apply text-gray-50 bg-gray-800!;
}
/* 禁用模式 */
:global(.NavListPage .el-pagination > .btn-prev:disabled) {
  @apply bg-gray-50! rounded-full;
}
:global(.dark .NavListPage .el-pagination > .btn-prev:disabled) {
  @apply text-gray-500 bg-gray-800! rounded-full;
}

/* ------↓下一页按钮------ */
:global(.NavListPage .el-pagination > .btn-next:not(:disabled)) {
  @apply text-gray-800 bg-gray-50! transition-all duration-300 ease-in-out relative rounded-full;
}
:global(.NavListPage .el-pagination > .btn-next:not(:disabled):hover) {
  @apply text-gray-50;
}
/* 背景动画层 */
:global(.NavListPage .el-pagination > .btn-next:not(:disabled)::before) {
  @apply transition-all duration-300 ease-in-out rounded-full;
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 531.28 200'%3E%3Cpolygon fill='%230EA5E9' points='415.81 200 0 200 115.47 0 531.28 0 415.81 200'/%3E%3C/svg%3E");
  background-size: 300%;
  background-position: 200%;
  background-repeat: no-repeat;
}
:global(.dark .NavListPage .el-pagination > .btn-next:not(:disabled)::before) {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 531.28 200'%3E%3Cpolygon fill='%2397D8C4' points='415.81 200 0 200 115.47 0 531.28 0 415.81 200'/%3E%3C/svg%3E");
  background-size: 300%;
  background-position: 200%;
}
:global(.NavListPage .el-pagination > .btn-next:not(:disabled):hover::before) {
  background-position: 40%;
}
/* 微调黑暗模式hover文字颜色增加辨识度 */
:global(.dark .NavListPage .el-pagination > .btn-next:not(:disabled):hover) {
  @apply text-gray-800;
}
:global(.dark .NavListPage .el-pagination > .btn-next:not(:disabled)) {
  @apply text-gray-50 bg-gray-800!;
}
/* 禁用模式 */
:global(.NavListPage .el-pagination > .btn-next:disabled) {
  @apply bg-gray-50! rounded-full;
}
:global(.dark .NavListPage .el-pagination > .btn-next:disabled) {
  @apply text-gray-500 bg-gray-800! rounded-full;
}

/* ------页码------ */
:global(.NavListPage .el-pagination.is-background > .el-pager li) {
  @apply rounded-full bg-gray-50! text-gray-800 relative overflow-hidden;
}
:global(.dark .NavListPage .el-pagination.is-background > .el-pager li) {
  @apply bg-gray-800! text-gray-50 relative overflow-hidden;
}
/* 激活页码 */
:global(.NavListPage .el-pagination.is-background .el-pager li.is-active) {
  @apply bg-sky-500! text-gray-50;
}
:global(.dark .NavListPage .el-pagination.is-background .el-pager li.is-active) {
  @apply bg-gray-600! text-emerald-300/50;
}
/* hover页码 */
:global(.NavListPage .el-pagination.is-background > .el-pager li:not(.is-active):hover) {
  @apply bg-gray-100!;
  animation: wobble-rotate 0.4s ease-in-out forwards;
}
:global(.dark .NavListPage .el-pagination.is-background > .el-pager li:not(.is-active):hover) {
  @apply bg-gray-900!;
}
/* hover动画 */
@keyframes wobble-rotate {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(15deg); /* 顺时针转一点 */
  }
  60% {
    transform: rotate(-10deg); /* 逆时针回一点 */
  }
  80% {
    transform: rotate(5deg); /* 微调回正 */
  }
  100% {
    transform: rotate(0deg);
  }
}
/* ------个数选择器------ */
/* --选择器-- */
:global(.NavListPage .el-pagination .el-pagination__sizes .el-select__wrapper) {
  @apply bg-gray-50 rounded-full border border-transparent
  shadow-none transition-colors duration-300 ease-in-out;
}
:global(.NavListPage .el-pagination .el-pagination__sizes .el-select__wrapper:hover) {
  @apply border-gray-300;
}

:global(.dark .NavListPage .el-pagination .el-pagination__sizes .el-select__wrapper) {
  @apply bg-gray-800 rounded-full border-y-gray-900 border-x-gray-800 border-1
  shadow-none transition-colors duration-300 ease-in-out;
}
:global(.dark .NavListPage .el-pagination .el-pagination__sizes .el-select__wrapper:hover) {
  @apply border-1 border-gray-900;
}

/* 未展开文字 */
:global(
  .NavListPage .el-pagination .el-pagination__sizes .el-select__wrapper .el-select__selected-item
) {
  @apply text-gray-600 transition-colors duration-300 ease-in-out;
}
:global(
  .dark
    .NavListPage
    .el-pagination
    .el-pagination__sizes
    .el-select__wrapper
    .el-select__selected-item
) {
  @apply text-gray-600 transition-colors duration-300 ease-in-out;
}
/* 展开文字 */
:global(.NavListPage .el-pagination .el-pagination__sizes .el-select__placeholder.is-transparent) {
  @apply text-gray-800;
}
:global(
  .dark .NavListPage .el-pagination .el-pagination__sizes .el-select__placeholder.is-transparent
) {
  @apply text-gray-50;
}
/* --列表-- */
:global(.NavPageNumSelect) {
  @apply border-none! rounded-lg bg-gray-300;
}
:global(.dark .NavPageNumSelect) {
  @apply border-none! rounded-lg bg-gray-800;
}
:global(.NavPageNumSelect .el-scrollbar) {
  @apply bg-gray-50 border-2 border-gray-300 rounded-lg;
}
:global(.dark .NavPageNumSelect .el-scrollbar) {
  @apply bg-gray-800 border-2 border-gray-600 rounded-lg;
}
/* 常规选项 */
:global(.NavPageNumSelect .el-select-dropdown__item) {
  @apply text-gray-800 bg-gray-50;
}
:global(.dark .NavPageNumSelect .el-select-dropdown__item) {
  @apply text-gray-50 bg-gray-800;
}
/* 选中项 */
:global(.NavPageNumSelect .el-select-dropdown__item.is-selected) {
  @apply text-gray-600 bg-gray-300;
}
:global(.dark .NavPageNumSelect .el-select-dropdown__item.is-selected) {
  @apply text-gray-300 bg-gray-600;
}
</style>
