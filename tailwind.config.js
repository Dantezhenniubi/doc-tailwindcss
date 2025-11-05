export default {
  content: [
    './docs/**/*.{vue,js,ts,jsx,tsx,md}',
    './.vitepress/**/*.{vue,js,ts,jsx,tsx,md}',
    './.vitepress/**/**/*.{vue,js,ts,jsx,tsx,md}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // 在 tailwind.config.js 中禁用 layer，让 Tailwind 样式回到普通优先级
  corePlugins: {
    preflight: false, // 同时建议关闭 preflight，避免按钮等样式被清空
  },
  // 禁用 css layer 机制（v4 新增）
  experiments: {
    layer: false,
  },
};
