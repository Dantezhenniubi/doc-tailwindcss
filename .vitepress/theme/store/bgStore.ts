// stores/bgStore.ts
import { persistentAtom } from '@nanostores/persistent';
import { atom } from 'nanostores';
import { computed } from 'nanostores';

export const lightClasses = ['bg-light1', 'bg-light2', 'bg-light3', 'bg-light4'] as const;
export const darkClasses = ['bg-dark1', 'bg-dark2'] as const;

export const $lightIdx = persistentAtom<number>('lightBgIdx', 0, {
  encode: String,
  decode: Number,
});

export const $darkIdx = persistentAtom<number>('darkBgIdx', 0, {
  encode: String,
  decode: Number,
});

// 创建一个 atom 来存储当前的暗色模式状态
export const $isDark = atom<boolean>(false);

// 计算属性：返回「当前色系类名」
export const currentBgClass = computed(
  [$lightIdx, $darkIdx, $isDark],
  (lightIdx, darkIdx, isDark) => {
    const list = isDark ? darkClasses : lightClasses;
    const idx = isDark ? darkIdx : lightIdx;
    return list[idx] ?? list[0];
  }
);

export function nextBg(): void {
  const isDark = $isDark.value;
  const list = isDark ? darkClasses : lightClasses;
  const atom = isDark ? $darkIdx : $lightIdx;
  const next = (atom.get() + 1) % list.length;
  atom.set(next);
}

export function preloadAll(): void {
  // 直接读变量并立刻预加载
  lightClasses.forEach((c) => {
    const url = getComputedStyle(document.documentElement).getPropertyValue(
      `--bg-${c.replace('bg-', '')}`
    );
    if (url) {
      new Image().src = url;
    }
  });

  darkClasses.forEach((c) => {
    const url = getComputedStyle(document.documentElement).getPropertyValue(
      `--bg-${c.replace('bg-', '')}`
    );
    if (url) {
      new Image().src = url;
    }
  });
}
