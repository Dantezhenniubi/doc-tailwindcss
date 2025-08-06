以下是 Tailwind CSS V4 的 **核心变动详解** 和 **升级操作指南**，用通俗语言分类说明：

---

### 🚨 一、必须注意的破坏性变更

#### 1. **浏览器要求升级**

- **仅支持**：Safari 16.4+、Chrome 111+、Firefox 128+
- **旧项目处理**：需支持旧浏览器？**停留在 V3.4**，等官方后续兼容方案。

#### 2. **核心导入方式变更**

```diff
/* V3 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* V4 ✅ 正确写法 */
@import "tailwindcss";
```

#### 3. **工具类删除 & 重命名**

| 旧类 (V3)          | 新类 (V4)              | 说明                   |
| ------------------ | ---------------------- | ---------------------- |
| `bg-opacity-*`     | `bg-black/50`          | 改用透明度修饰符       |
| `shadow-sm`        | `shadow-xs`            | 阴影尺寸重命名         |
| `shadow`           | `shadow-sm`            |                        |
| `rounded-sm`       | `rounded-xs`           | 圆角尺寸重命名         |
| `outline-none`     | `outline-hidden`       | 语义更清晰（隐藏轮廓） |
| `ring`             | `ring-3`               | 默认环宽从 1px → 3px   |
| `decoration-slice` | `box-decoration-slice` | 更名以匹配 CSS 规范    |

---

### ⚙️ 二、工具链升级操作

#### 1. **官方升级工具（推荐）**

```bash
npx @tailwindcss/upgrade  # 需 Node.js 20+
```

- **自动完成**：依赖更新、配置转 CSS、模板修复
- **注意**：在独立分支运行，测试后再合并！

#### 2. **手动升级关键步骤**

- **PostCSS 用户**：  
  移除 `postcss-import` 和 `autoprefixer`，改用新包：

  ```js
  // postcss.config.js
  export default {
    plugins: {
      '@tailwindcss/postcss': {}, // 替换旧版 tailwindcss
    },
  };
  ```

- **Vite 用户**：换用高性能插件

  ```js
  // vite.config.ts
  import tailwindcss from '@tailwindcss/vite';
  export default defineConfig({
    plugins: [tailwindcss()],
  });
  ```

- **CLI 用户**：
  ```diff
  - npx tailwindcss -i input.css -o output.css
  + npx @tailwindcss/cli -i input.css -o output.css
  ```

---

### 🛠️ 三、重要行为变更与修复

#### 1. **边框与轮廓默认值**

- **边框颜色**：从 `gray-200` → `currentColor`（匹配浏览器默认）  
  **修复**：手动加颜色类，如 `border border-gray-200`
- **轮廓宽度**：`outline-2` 现在等效于 `outline outline-2`（无需组合）

#### 2. **伪类选择器优化**

```diff
/* V3 低效选择器 */
.space-y-4 > :not([hidden]) ~ :not([hidden])

/* V4 ✅ 高性能写法 */
.space-y-4 > :not(:last-child)
```

- **问题场景**：子元素为 `inline` 或自定义边距时可能异常
- **替代方案**：改用 Flex/Gap 布局更可靠

#### 3. **移动端 Hover 行为**

- `hover:` 变体**仅在支持悬停的设备生效**（如 PC）
- **触摸设备需额外处理**：
  ```css
  @custom-variant hover (&:hover); /* 强制启用旧行为 */
  ```

---

### 🧩 四、自定义功能调整

#### 1. **自定义工具类**

```diff
/* V3 */
@layer utilities { .tab-4 { tab-size: 4; } }

/* V4 ✅ */
@utility tab-4 {
  tab-size: 4;
}
```

- **优点**：自动处理变体顺序，避免样式冲突

#### 2. **主题变量使用**

- **优先用 CSS 变量**：
  ```css
  .btn {
    color: var(--color-red-500);
  } /* 替代 theme(colors.red.500) */
  ```
- **媒体查询例外**：
  ```css
  @media (width >= theme(--breakpoint-xl)) { ... }
  ```

#### 3. **前缀 (Prefix) 语法**

```html
<!-- 前缀统一放开头 -->
<div class="tw:flex tw:bg-red-500 tw:hover:bg-red-600"></div>
```

- **配置不变**：
  ```css
  @import 'tailwindcss' prefix(tw);
  @theme {
    --color-red-500: #ef4444;
  } /* 变量自动加前缀 --tw-* */
  ```

---

### 🔥 五、常见问题解决方案

#### 1. **Vue/Svelte/Stylus 支持**

- **问题**：`<style>` 块中无法用 `@apply`
- **方案一**：导入主 CSS
  ```css
  @reference "../../app.css"; /* 不重复生成代码 */
  h1 {
    @apply text-xl;
  }
  ```
- **方案二**：直接使用 CSS 变量
  ```css
  h1 {
    color: var(--text-red-500);
  } /* 性能更好 */
  ```

#### 2. **预处理器弃用警告**

- **Tailwind V4 不兼容** Sass/Less/Stylus
- **官方建议**：将 Tailwind 视为唯一预处理器

#### 3. **渐变颜色覆盖修复**

```html
<!-- V4 需显式重置中间色 -->
<div
  class="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 
             dark:via-none dark:from-blue-500"
></div>
```

---

### 💎 升级总结建议

1. **必做**：用 `npx @tailwindcss/upgrade` 自动升级
2. **重点检查**：
   - 所有 `shadow-*`、`rounded-*`、`ring` 类名
   - 移动端交互（`hover:` 是否生效）
   - 边框/轮廓颜色是否丢失
3. **深度定制**：
   - 容器类用 `@utility container` 配置
   - 兼容旧行为参考文中的 CSS 片段修复
4. **性能优化**：
   - 弃用 `@apply`，多用 CSS 变量
   - 移除 `autoprefixer` 等冗余依赖

> 官方文档直通车：[Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)  
> 遇到复杂问题？优先检查 [Breaking Changes 清单](https://tailwindcss.com/docs/upgrade-guide#changes)！
