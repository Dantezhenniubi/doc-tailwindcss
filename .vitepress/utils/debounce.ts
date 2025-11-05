// 防抖函数
// utils/debounce.ts
type Fn = (...args: unknown[]) => void;

export function debounce<T extends Fn>(fn: T, delay = 300): T {
  let timer: number | null = null;
  return ((...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  }) as T;
}
