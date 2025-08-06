# 图片导入工具 (imageImports.js)

## 简介

这是一个简化的图片导入工具，用于在VitePress项目中轻松导入图片资源。通过这个工具，你可以：

- 使用简单的函数调用导入图片，无需记住复杂的相对路径
- 支持多个预定义的图片目录
- 可以注册自定义的图片目录（开发环境）
- 自动处理图片导入和路径解析

## 基本用法

```js
import { getImage } from './.vitepress/utils/imageImports.js';

// 导入DailyRecord/assets目录下的图片
const xiaNaImage = getImage('DailyRecord/assets', '夏娜');

// 导入public/assets目录下的图片
const logoImage = getImage('public/assets', 'Logo');
```

## 在Vue组件中使用

```vue
<script setup>
import { getImage } from '../.vitepress/utils/imageImports.js';
</script>

<template>
  <!-- 基本用法 -->
  <img :src="getImage('DailyRecord/assets', '夏娜')" alt="夏娜" />

  <!-- 带备用图片的用法 -->
  <img :src="getImage('DailyRecord/assets', '夏娜') || '/fallback-image.jpg'" alt="夏娜" />
</template>
```

## 高级用法：注册自定义图片目录

由于Vite的限制，`import.meta.glob`必须使用字符串字面量作为参数，因此不能动态生成导入路径。但你可以在开发环境中注册已经导入的图片目录：

```js
import { getImage, registerImageDirectory } from './.vitepress/utils/imageImports.js';

// 使用import.meta.glob导入图片
const customImages = import.meta.glob('../path/to/images/*.{jpg,png,svg}', {
  eager: true,
  import: 'default',
});

// 注册自定义目录
registerImageDirectory('custom/images', customImages);

// 之后就可以使用新注册的目录
const myImage = getImage('custom/images', '图片名称');
```

## 当前支持的预定义目录

- `DailyRecord/assets`: 日常记录的资源目录
- `public/assets`: 公共资源目录

## 注意事项

1. 图片文件名不需要包含扩展名，工具会自动匹配
2. 目前支持的图片格式：jpg, png, svg
3. 如果找不到匹配的图片，函数会返回`null`并在控制台输出警告
4. 自定义目录注册仅在开发环境中有效，不会影响生产环境构建
