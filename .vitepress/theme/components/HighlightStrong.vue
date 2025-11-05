<!-- docs/.vitepress/theme/components/HighlightObserver.vue -->

<!-- 给<strong></strong>标签添加荧光笔动画 -->
<!-- 每个元素只在第一次进入视口时播放一次动画<strong>（不再次触发）；
支持SSR（服务端渲染），即代码只在浏览器中运行，避免SSR报错 -->

<script setup>
import { onMounted } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

onMounted(() => {
  // ✅ 仅在客户端执行（SSR 安全）
  if (typeof document === 'undefined') return;

  const observerCallback = ([{ isIntersecting, target }]) => {
    if (isIntersecting && !target.hasAttribute('data-animated')) {
      // 标记已动画，防止重复触发
      target.setAttribute('data-animated', 'true');
      target.classList.add('highlighted');
    }
  };

  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const strongs = document.querySelectorAll('strong');
  const observers = [];

  strongs.forEach((el) => {
    const { stop } = useIntersectionObserver(el, observerCallback, options);
    observers.push(stop);
  });

  // 可选：组件卸载时清理（VitePress 页面切换时有用）
  // 但通常 VitePress 不频繁卸载 Layout，可省略
});
</script>

<!-- 无 template，纯逻辑组件 -->
