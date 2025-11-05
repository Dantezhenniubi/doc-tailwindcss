<template><span ref="trigger" /></template>

<script setup lang="ts">
import confetti from 'canvas-confetti';
import { inBrowser } from 'vitepress'; // SSR兼容

function startFirework(e: MouseEvent) {
  if (inBrowser) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // 1. 主水柱：少粒子 + 高重力 + 短生存期
    confetti({
      particleCount: 25, // 清爽：粒子少
      startVelocity: 55, // 初速度大，像喷出去
      gravity: 5.8, // 重力加大，快速下坠
      spread: 45, // 角度小，水柱集中
      ticks: 35, // 生命周期短（≈0.3 s）
      origin: { x, y: y + 0.05 },
      colors: ['#00BFFF', '#87CEEB'], // 清水蓝系
    });

    // 2. 可选：再喷一层更细的小水珠，增加层次
    confetti({
      particleCount: 15,
      startVelocity: 65,
      gravity: 2,
      spread: 30,
      ticks: 30,
      origin: { x, y: y + 0.03 },
      colors: ['#FFFFFF'],
    });
  }
}

defineExpose({ startFirework });
</script>
