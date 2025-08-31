<!-- 闪亮文字动画组件，支持tailwindcss渐变色语法，支持传入自定义类名 -->
<template>
  <div
    :class="`${props.textColor} bg-clip-text inline-block ${props.twLinearConfig} ${!props.disabled ? 'animate-shine' : ''} ${props.className}`"
    :style="{
      backgroundImage: props.twLinearConfig
        ? ''
        : 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
      backgroundSize: '200% 100%',
      WebkitBackgroundClip: 'text',
      animationDuration: animationDuration,
    }"
  >
    {{ props.text }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface ShinyTextProps {
  text?: string;
  textColor?: string; // 文字颜色
  disabled?: boolean; // 是否禁用
  speed?: number; // 流动速度，越大越慢
  className?: string; // 自定义样式
  twLinearConfig?: string; // tailwindcss的渐变色语法,别忘了添加黑暗模式支持
}

const props = withDefaults(defineProps<ShinyTextProps>(), {
  text: '',
  textColor: 'text-[#b5b5b5a4]',
  disabled: false,
  speed: 5,
  className: '',
  twLinearConfig: '',
});

const animationDuration = computed(() => `${props.speed}s`);
</script>

<style scoped>
@keyframes shine {
  0% {
    background-position: 100%;
  }
  100% {
    background-position: -100%;
  }
}

.animate-shine {
  animation: shine 5s linear infinite;
}
</style>
