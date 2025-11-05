<template>
  <div>
    <Motion
      :animate="{
        rotate: currentRotation,
        scale: getCurrentScale(),
      }"
      :transition="{
        rotate: {
          duration: 0,
        },
        scale: {
          type: 'spring',
          damping: 20,
          stiffness: 300,
        },
      }"
      :class="`m-0 mx-auto rounded-full ${props.ringSize} relative font-black text-white text-center cursor-pointer origin-center ${props.className}`"
      @mouseenter="handleHoverStart"
      @mouseleave="handleHoverEnd"
    >
      <span
        v-for="(letter, i) in letters"
        :key="i"
        class="absolute inline-block inset-0 text-5xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)] bg-gradient-to-r from-[hsl(var(--fromHue,0),80%,60%)] to-[hsl(var(--toHue,0),80%,60%)] bg-clip-text text-transparent"
        :style="{
          transform: getLetterTransform(i),
          '--fromHue': (currentRotation + (360 / letters.length) * i) % 360,
          '--toHue': (currentRotation + (360 / letters.length) * i + 30) % 360,
          WebkitTransform: getLetterTransform(i),
        }"
      >
        {{ letter }}
      </span>

      <img
        v-if="imgSrc"
        :src="imgSrc"
        alt="logo"
        :class="`absolute inset-0 ${props.imgClassName} m-auto ${props.imgSize} object-contain pointer-events-none`"
      />
    </Motion>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect, onUnmounted } from 'vue';
import { Motion } from 'motion-v';

interface CircularTextProps {
  text?: string;
  spinDuration?: number;
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  imgSrc?: string;
  imgSize?: string;
  ringSize?: string;
  imgClassName?: string;
  className?: string;
}

const props = withDefaults(defineProps<CircularTextProps>(), {
  text: '',
  spinDuration: 20,
  onHover: 'speedUp',
  imgSrc: '',
  imgSize: 'size-20',
  ringSize: 'size-20',
  imgClassName: '',
  className: '',
});

const letters = computed(() => Array.from(props.text));
const isHovered = ref(false);

const currentRotation = ref(0);
const animationId = ref<number | null>(null);
const lastTime = ref<number>(Date.now());
const rotationSpeed = ref<number>(0);

const getCurrentSpeed = () => {
  if (isHovered.value && props.onHover === 'pause') return 0;

  const baseDuration = props.spinDuration;
  const baseSpeed = 360 / baseDuration;

  if (!isHovered.value) return baseSpeed;

  switch (props.onHover) {
    case 'slowDown':
      return baseSpeed / 2;
    case 'speedUp':
      return baseSpeed * 4;
    case 'goBonkers':
      return baseSpeed * 20;
    default:
      return baseSpeed;
  }
};

const getCurrentScale = () => {
  return isHovered.value && props.onHover === 'goBonkers' ? 0.8 : 1;
};

const animate = () => {
  const now = Date.now();
  const deltaTime = (now - lastTime.value) / 1000;
  lastTime.value = now;

  const targetSpeed = getCurrentSpeed();

  const speedDiff = targetSpeed - rotationSpeed.value;
  const smoothingFactor = Math.min(1, deltaTime * 5);
  rotationSpeed.value += speedDiff * smoothingFactor;

  currentRotation.value = (currentRotation.value + rotationSpeed.value * deltaTime) % 360;

  animationId.value = requestAnimationFrame(animate);
};

const startAnimation = () => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value);
  }
  lastTime.value = Date.now();
  rotationSpeed.value = getCurrentSpeed();
  animate();
};

watchEffect(() => {
  startAnimation();
});

startAnimation();

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value);
  }
});

const handleHoverStart = () => {
  isHovered.value = true;
};

const handleHoverEnd = () => {
  isHovered.value = false;
};

const getLetterTransform = (index: number) => {
  const rotationDeg = (360 / letters.value.length) * index;

  return `rotateZ(${rotationDeg}deg) translate3d(${(Math.PI / letters.value.length) * index}px, ${(Math.PI / letters.value.length) * index}px, 0)`;
};
</script>
