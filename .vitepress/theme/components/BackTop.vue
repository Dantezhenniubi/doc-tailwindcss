<!-- BackTop.vue -->
<template>
  <transition
    :name="animation"
    appear
    @before-enter="emit('beforeShow')"
    @after-enter="emit('afterShow')"
    @before-leave="emit('beforeHide')"
    @after-leave="emit('afterHide')"
  >
    <div
      v-if="visible"
      class="back-top"
      :class="positionClass"
      :style="rootStyle"
      @click="scrollToTop"
    >
      <div class="progress-ring" :style="ringStyle">
        <div class="back-top-inner" :style="innerStyle">
          <slot v-if="showArrow" name="icon">
            <!-- 默认箭头 -->
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </slot>
          <slot v-else />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, type StyleValue } from 'vue';

/* ---------------- Props + Emits ---------------- */
interface Props {
  visibilityHeight?: number;
  duration?: number;
  progressColor?: string;
  size?: number | string;
  target?: string | Element;
  position?: 'left' | 'right';
  offset?: [number, number];
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'scale';
  showArrow?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  visibilityHeight: 400,
  duration: 500,
  progressColor: '#409eff',
  size: 40,
  target: undefined,
  position: 'right',
  offset: () => [30, 30],
  animation: 'fade',
  showArrow: true,
});

const emit = defineEmits<{
  beforeShow: [];
  afterShow: [];
  beforeHide: [];
  afterHide: [];
}>();

/* ---------------- 响应式数据 ---------------- */
const visible = ref(false);
const scrollPercent = ref(0);

/* ---------------- 计算属性 ---------------- */
const progressNum = computed(() => Math.min(100, Math.max(0, scrollPercent.value)));

const rootStyle = computed<StyleValue>(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
}));

const ringStyle = computed<StyleValue>(() => ({
  background: `conic-gradient(${props.progressColor} ${progressNum.value}% , transparent ${progressNum.value}%)`,
}));

const innerStyle = computed<StyleValue>(() => ({
  width: `calc(${props.size}px - 8px)`,
  height: `calc(${props.size}px - 8px)`,
}));

const positionClass = computed(() => `pos-${props.position}`);

/* ---------------- 滚动相关 ---------------- */
let el: Element | Window = window;

function getScrollTop() {
  if (el === window) return window.pageYOffset || document.documentElement.scrollTop;
  return (el as Element).scrollTop;
}

function getScrollHeight() {
  if (el === window) return document.documentElement.scrollHeight;
  return (el as Element).scrollHeight;
}

function getClientHeight() {
  if (el === window) return window.innerHeight;
  return (el as Element).clientHeight;
}

function handleScroll() {
  const scrollTop = getScrollTop();
  const scrollHeight = getScrollHeight();
  const clientHeight = getClientHeight();
  const maxScroll = scrollHeight - clientHeight;

  scrollPercent.value = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
  visible.value = scrollTop >= props.visibilityHeight;
}

function scrollToTop() {
  const startTime = performance.now();
  const startTop = getScrollTop();

  const animate = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / props.duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const newTop = startTop * (1 - easeOut);

    if (el === window) window.scrollTo(0, newTop);
    else (el as Element).scrollTop = newTop;

    if (progress < 1) requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}

/* ---------------- 生命周期 ---------------- */
onMounted(() => {
  const target = props.target;
  if (target && typeof target === 'string') el = document.querySelector(target) || window;
  else if (target instanceof Element) el = target;

  handleScroll();
  el.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  el.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* ===== 基础定位 ===== */
.back-top {
  position: fixed;
  bottom: v-bind('offset[1] + "px"');
  z-index: 1000;
  cursor: pointer;
}
.back-top.pos-right {
  right: v-bind('offset[0] + "px"');
}
.back-top.pos-left {
  left: v-bind('offset[0] + "px"');
}

/* ===== 圆环 + 内圆 ===== */
.progress-ring {
  width: v-bind('size + "px"');
  height: v-bind('size + "px"');
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.back-top-inner {
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}
.back-top-inner:hover {
  transform: scale(1.05) rotate(180deg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* ===== 动画 ===== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from {
  transform: translateY(30px);
  opacity: 0;
}
.slide-up-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from {
  transform: translateY(-30px);
  opacity: 0;
}
.slide-down-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}
.scale-enter-from {
  transform: scale(0);
  opacity: 0;
}
.scale-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
