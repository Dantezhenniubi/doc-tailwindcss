<!-- 使用@vueuse/motion实现的文章瀑布流动画组件（SSR兼容版） -->
<script setup>
import { useMotion } from '@vueuse/motion';
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import { useRoute, inBrowser } from 'vitepress'; // 添加 inBrowser 检测

const route = useRoute();
const motionInstances = ref([]);
const isReducedMotion = ref(false);
const observer = ref(null);
const animationReady = ref(false);

// 检测是否偏好减少运动
const checkReducedMotion = () => {
  if (inBrowser) {
    isReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
};

// SSR 安全的 DOM 操作函数
const safeQuerySelectorAll = (selector) => {
  if (!inBrowser) return [];
  return document.querySelectorAll(selector);
};

// 清除动画实例和状态 (SSR 安全)
const clearAnimations = () => {
  // 清除所有动画实例
  motionInstances.value.forEach((instance) => instance.stop());
  motionInstances.value = [];

  // 停止观察所有元素
  if (observer.value && inBrowser) {
    observer.value.disconnect();
    observer.value = null;
  }

  // 重置所有元素的动画状态
  if (inBrowser) {
    safeQuerySelectorAll('[data-motion-applied]').forEach((el) => {
      el.removeAttribute('data-motion-applied');
      el.removeAttribute('data-motion-index');
      el.style.opacity = '';
      el.style.transform = '';
      el.style.willChange = '';
    });
  }
};

// 创建滚动观察器 (SSR 安全)
const createObserver = () => {
  if (!inBrowser) return;

  // 创建 Intersection Observer 实例
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const index = parseInt(el.dataset.motionIndex);

          // 计算延迟
          let delay = Math.min(index * 10, 200);
          if (el.tagName.toLowerCase().startsWith('h')) {
            delay = Math.min(index * 5, 100);
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
                duration: 500,
                easing: 'ease-out',
                type: 'spring',
                stiffness: 120,
                damping: 12,
              },
            },
          });

          motionInstances.value.push(instance);
          observer.value.unobserve(el);
        }
      });
    },
    {
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.01,
    }
  );
};

// 准备动画元素 (SSR 安全)
const prepareTextAnimations = async () => {
  // 清除之前的动画状态
  clearAnimations();

  // 检查减少运动偏好
  checkReducedMotion();

  // 如果没有浏览器环境或用户偏好减少运动
  if (!inBrowser || isReducedMotion.value) {
    // 减少运动时直接显示所有内容
    if (inBrowser) {
      safeQuerySelectorAll('.vp-doc :is(h1, h2, h3, h4, h5, h6, p, li, blockquote)').forEach(
        (el) => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      );
    }
    return;
  }

  // 等待 DOM 更新
  await nextTick();

  if (!inBrowser) return;

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
        if (observer.value) {
          observer.value.unobserve(el);
          observer.value.observe(el);
        }
      }
    });
  }, 50);
};

// 监听路由变化
watch(
  () => route.path,
  (newPath, oldPath) => {
    // 只有当路径确实改变时才重新准备动画
    if (newPath !== oldPath && inBrowser) {
      setTimeout(prepareTextAnimations, 50);
    }
  },
  { immediate: true }
);

onMounted(() => {
  // 只在浏览器中执行
  if (!inBrowser) return;

  // 初始准备动画
  prepareTextAnimations();

  // 监听减少运动偏好的变化
  window
    .matchMedia('(prefers-reduced-motion: reduce)')
    .addEventListener('change', checkReducedMotion);
});

onUnmounted(() => {
  // 组件卸载时清理
  clearAnimations();

  // 移除事件监听
  if (inBrowser) {
    window
      .matchMedia('(prefers-reduced-motion: reduce)')
      .removeEventListener('change', checkReducedMotion);
  }
});
</script>

<style scoped>
/* 初始状态 */
.vp-doc :is(h1, h2, h3, h4, h5, h6, p, li, blockquote) {
  opacity: 0;
  transform: translateY(20px) rotateX(3deg);
  will-change: opacity, transform;
  transition: none !important;
}

/* 排除代码块 */
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
}

@media (prefers-reduced-motion: reduce) {
  .vp-doc :is(h1, h2, h3, h4, h5, h6, p, li, blockquote) {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
