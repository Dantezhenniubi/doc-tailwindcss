<!-- 这是一个使用@vueuse/motion库实现的文章瀑布流动画组件 -->
<script setup>
import { useMotion } from '@vueuse/motion';
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';

const route = useRoute();
const motionInstances = ref([]);
const isReducedMotion = ref(false);
const observer = ref(null);
const animationReady = ref(false);

// 检测是否偏好减少运动
const checkReducedMotion = () => {
  if (typeof window !== 'undefined') {
    isReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
};

// 清除动画实例和状态
const clearAnimations = () => {
  // 清除所有动画实例
  motionInstances.value.forEach((instance) => instance.stop());
  motionInstances.value = [];

  // 停止观察所有元素
  if (observer.value) {
    observer.value.disconnect();
    observer.value = null;
  }

  // 重置所有元素的动画状态
  document.querySelectorAll('[data-motion-applied]').forEach((el) => {
    el.removeAttribute('data-motion-applied');
    el.removeAttribute('data-motion-index');
    el.style.opacity = '';
    el.style.transform = '';
    el.style.willChange = '';
  });
};

// 创建滚动观察器
const createObserver = () => {
  if (typeof window === 'undefined') return;

  // 创建 Intersection Observer 实例
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const index = parseInt(el.dataset.motionIndex);

          // 计算延迟 - 大幅减少延迟时间
          let delay = Math.min(index * 10, 200); // 最大延迟200ms
          if (el.tagName.toLowerCase().startsWith('h')) {
            delay = Math.min(index * 5, 100); // 标题最大延迟100ms
          }

          // 创建动画实例
          const instance = useMotion(el, {
            initial: {
              opacity: 0,
              y: 20,
              rotateX: 3,
            },
            enter: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                delay,
                duration: 500, // 缩短动画时间
                easing: 'ease-out',
                type: 'spring',
                stiffness: 120,
                damping: 12,
              },
            },
          });

          motionInstances.value.push(instance);

          // 动画开始后停止观察
          observer.value.unobserve(el);
        }
      });
    },
    {
      rootMargin: '0px 0px -100px 0px', // 扩大触发区域
      threshold: 0.01, // 更低阈值确保触发
    }
  );
};

// 准备动画元素
const prepareTextAnimations = async () => {
  // 清除之前的动画状态
  clearAnimations();

  // 检查减少运动偏好
  checkReducedMotion();
  if (isReducedMotion.value) {
    // 减少运动时直接显示所有内容
    document
      .querySelectorAll('.vp-doc :is(h1, h2, h3, h4, h5, h6, p, li, blockquote)')
      .forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    return;
  }

  // 等待 DOM 更新
  await nextTick();

  const docContainer = document.querySelector('.vp-doc');
  if (!docContainer) return;

  // 选择所有需要动画的文本元素
  const textElements = [
    ...docContainer.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, blockquote'),
  ].filter((el) => !el.closest('pre, .language-'));

  // 创建观察器实例
  createObserver();

  // 为每个元素设置索引并添加到观察器
  textElements.forEach((el, index) => {
    // 设置标记和索引
    el.dataset.motionApplied = 'true';
    el.dataset.motionIndex = index;

    // 重置元素到初始状态
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px) rotateX(3deg)';
    el.style.willChange = 'opacity, transform';

    // 添加到观察器
    if (observer.value) {
      observer.value.observe(el);
    }
  });

  // 特殊处理：确保在视口顶部的元素也能触发
  setTimeout(() => {
    textElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        // 手动添加到观察器队列
        if (observer.value) {
          observer.value.unobserve(el); // 先移除
          observer.value.observe(el); // 再添加以触发回调
        }
      }
    });
  }, 50);

  // 标记动画已准备就绪
  animationReady.value = true;
};

// 监听路由变化
watch(
  () => route.path,
  (newPath, oldPath) => {
    // 重置动画就绪状态
    animationReady.value = false;

    // 只有当路径确实改变时才重新准备动画
    if (newPath !== oldPath) {
      setTimeout(prepareTextAnimations, 50); // 缩短等待时间
    }
  },
  { immediate: true }
);

onMounted(() => {
  // 初始准备动画
  prepareTextAnimations();

  // 监听减少运动偏好的变化
  if (typeof window !== 'undefined') {
    window
      .matchMedia('(prefers-reduced-motion: reduce)')
      .addEventListener('change', checkReducedMotion);
  }
});

onUnmounted(() => {
  // 组件卸载时清理
  clearAnimations();

  // 移除事件监听
  if (typeof window !== 'undefined') {
    window
      .matchMedia('(prefers-reduced-motion: reduce)')
      .removeEventListener('change', checkReducedMotion);
  }
});
</script>

<style scoped>
/* 初始状态 - 使用CSS变量控制 */
.vp-doc :is(h1, h2, h3, h4, h5, h6, p, li, blockquote) {
  opacity: 0;
  transform: translateY(20px) rotateX(3deg);
  will-change: opacity, transform;
  transition: none !important; /* 防止默认过渡干扰 */
}

/* 当动画准备就绪时显示元素 */
body.vp-animation-ready .vp-doc :is(h1, h2, h3, h4, h5, h6, p, li, blockquote) {
  opacity: 1;
  transform: none;
}

/* 减少运动时直接显示内容 */
@media (prefers-reduced-motion: reduce) {
  .vp-doc :is(h1, h2, h3, h4, h5, h6, p, li, blockquote) {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

/* 排除代码块 - 修复CSS语法错误 */
.vp-doc pre,
.vp-doc code,
.vp-doc .language- {
  opacity: 1 !important;
  transform: none !important;
  animation: none !important;
  transition: none !important;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .vp-doc :is(h1, h2, h3, h4, h5, h6, p, li, blockquote) {
    transform: translateY(15px) rotateX(2deg) !important;
  }

  /* 移动设备上减少延迟效果 */
  [data-motion-index] {
    --animation-delay-multiplier: 0.5 !important;
  }
}
</style>
