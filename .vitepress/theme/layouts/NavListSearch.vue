<template>
  <div class="relative w-full max-w-80 sm:max-w-full">
    <!-- 搜索图标 -->
    <div class="ui-input-container">
      <!-- 输入框 -->
      <input
        id="search-input"
        ref="input"
        v-model="model"
        type="text"
        class="ui-input peer group"
        @keydown.enter="handleSearch"
      />
      <div class="ui-input-underline"></div>
      <div class="ui-input-highlight"></div>
      <!-- 逐字上升占位符 -->
      <span class="ui-placeholder" aria-hidden="true">
        <span
          v-for="(ch, i) in placeholderChars"
          :key="i"
          class="char"
          :style="{ '--i': i, '--hue': Math.floor(Math.random() * 360) }"
        >
          {{ ch }}
        </span>
      </span>

      <span class="ui-input-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            stroke="currentColor"
            d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
          ></path>
        </svg>
      </span>
      <span v-if="model" class="cancel-icon" @click="clear">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 15.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12zM22 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7c-.69 0-1.23-.36-1.59-.89L0 12l5.41-8.12C5.77 3.35 6.31 3 7 3zm0 2H7l-4.72 7L7 19h15z"
          />
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup>
// Vue 3.4+ 使用 defineModel 实现 v-model 双向绑定
const model = defineModel({
  type: String,
  required: true,
});

// props
const props = defineProps({
  placeholder: {
    type: String,
    default: '搜索内容...',
  },
});

// emits（可选：如果你需要监听搜索事件）
const emit = defineEmits(['search', 'clear']);

// 方法
/* 逐字数组（中文也适用） */
const placeholderChars = computed(() => props.placeholder.split(''));
const handleSearch = () => {
  if (model.value.trim()) {
    emit('search', model.value.trim());
  }
};

const clear = () => {
  model.value = '';
  emit('clear');
  // 自动聚焦（可选）
  // nextTick(() => inputRef.value?.focus())
};
</script>

<style scoped>
@reference "tailwindcss";

.ui-input-container {
  @apply relative w-full;
}

.ui-input {
  @apply w-full p-[10px_10px_10px_40px] text-[1em] border-solid border-b-2 border-gray-300 inset-shadow-sm;
  outline: none;
  background-color: transparent;
  transition: border-color 0.5s;
}
.dark .ui-input {
  @apply border-gray-800/20;
}

.ui-input:focus {
  @apply border-[#4059AD];
}
.dark .ui-input:focus {
  @apply border-[#97D8C4];
}

/* 下划线 */
.ui-input-underline {
  @apply absolute bottom-0 left-0 h-[2px] w-full bg-[#4059AD];
  transform: scaleX(0);
  transition: transform 0.5s;
}
.dark .ui-input-underline {
  @apply bg-[#97D8C4];
}

.ui-input:focus + .ui-input-underline {
  transform: scaleX(1);
}

/* 高亮 */
.ui-input-highlight {
  @apply absolute bottom-0 left-0 h-full w-0 bg-[#4059AD]/10;
  transition: width 0.5s;
}
.dark .ui-input-highlight {
  @apply bg-[#97D8C4]/20;
}

.ui-input:focus ~ .ui-input-highlight {
  @apply w-full;
}

/* 图标 */
.ui-input-icon {
  @apply absolute left-[10px] top-1/2 translate-y-[-50%] text-gray-200 peer-focus:text-[#4059AD];
  transition: color 0.3s;
}
.dark .ui-input-icon {
  @apply text-gray-800/80 peer-focus:text-[#97D8C4];
}

.ui-input-icon svg {
  width: 20px;
  height: 20px;
}

.cancel-icon {
  @apply absolute right-[10px] top-1/2 translate-y-[-50%];
  color: #999;
  transition: color 0.3s;
}
.cancel-icon:hover {
  @apply text-[#6c63ff];
}
.dark .cancel-icon:hover {
  @apply text-[#97D8C4];
}

.cancel-icon svg {
  width: 20px;
  height: 20px;
}
/* 占位文字 */
.ui-placeholder {
  @apply absolute left-[40px] top-1/2 -translate-y-1/2 text-lg text-gray-400 pointer-events-none select-none;
  transition: opacity 0.3s;
}
.dark .ui-placeholder {
  @apply text-gray-800;
}

/* 每个字符 */
.char {
  display: inline-block;
  transition:
    transform 0.4s cubic-bezier(0.58, 0.11, 0.63, 1.62),
    opacity 0.4s,
    color 1.4s;
  transition-delay: calc(var(--i) * 0.05s); /* 依次延迟 50ms */
  transform-origin: bottom;
}

/* 未聚焦：原位 */
.peer:not(:focus) ~ .ui-placeholder .char {
  transform: translateY(0);
  opacity: 1;
}

/* 聚焦：向上移动 + 渐隐 */
.peer:focus ~ .ui-placeholder .char {
  color: hsl(var(--hue), calc(60% + var(--i) * 5%), calc(45% + var(--i) * 3%));
  transform: translateY(-2.4em); /* 向上 1.2 倍字高 */
  opacity: 1;
}
</style>
