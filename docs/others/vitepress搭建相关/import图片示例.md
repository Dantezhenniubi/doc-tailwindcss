---
layout: page
---

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from 'vitepress/theme'

// 使用import语法导入图片
import xiaNa from '../../DailyRecord/assets/夏娜.jpg'
import jieChengXiYa from '../../DailyRecord/assets/结城希亚.jpg'
import yinLang from '../../DailyRecord/assets/银狼.jpg'

// 定义团队成员数据，使用导入的图片变量
const members = [
  {
    avatar: xiaNa, // 使用导入的图片变量
    name: '夏娜',
    title: '炎发灼眼的杀手',
    links: [
      { icon: 'github', link: 'https://github.com/example' }
    ]
  },
  {
    avatar: jieChengXiYa, // 使用导入的图片变量
    name: '结城希亚',
    title: '魔法少女',
    links: [
      { icon: 'github', link: 'https://github.com/example' }
    ]
  },
  {
    avatar: yinLang, // 使用导入的图片变量
    name: '银狼',
    title: '星穹铁道',
    links: [
      { icon: 'github', link: 'https://github.com/example' }
    ]
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      使用import导入图片示例
    </template>
    <template #lead>
      这个示例展示了如何在VitePress中使用import语法导入图片，
      而不是将所有图片放在public文件夹中。
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="members" />
</VPTeamPage>

## 使用import导入图片的优势

### 1. 更好的项目组织结构

- 图片可以与相关的文章放在同一目录下
- 不需要将所有图片混在一个public文件夹中
- 便于管理和维护，特别是在大型项目中

### 2. 自动的资源处理

- Vite会自动处理导入的图片资源
- 构建时会自动添加哈希值，有利于缓存控制
- 小图片会自动转为base64内联，减少HTTP请求

### 3. 类型安全

- 使用import语法可以确保图片路径的正确性
- 如果图片不存在或路径错误，在编译时就会报错
- 避免了运行时才发现图片路径错误的问题

## 代码说明

```js
// 使用import语法导入图片
import xiaNa from '../../DailyRecord/assets/夏娜.jpg';
import jieChengXiYa from '../../DailyRecord/assets/结城希亚.jpg';
import yinLang from '../../DailyRecord/assets/银狼.jpg';

// 在成员数据中使用导入的图片变量
const members = [
  {
    avatar: xiaNa, // 使用导入的图片变量而不是字符串路径
    name: '夏娜',
    // ...
  },
  // ...
];
```

## 部署注意事项

使用import语法导入的图片在部署到GitHub Pages时不需要手动添加base路径前缀，因为：

1. Vite的构建系统会自动处理这些导入的资源
2. 图片会被打包并添加哈希值，如：`assets/xiaNa.a1b2c3d4.jpg`
3. 所有引用都会自动更新为正确的路径

这种方法解决了在Vue组件中使用相对路径导致GitHub Pages部署后图片无法显示的问题。
