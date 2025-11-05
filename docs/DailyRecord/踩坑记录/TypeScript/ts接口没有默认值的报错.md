---
outline: [2, 6]
tags: ['TypeScript', '语法', '代码检查', '前端']
---

# ts接口没有默认值的报错

## 问题描述
eslint检查警告ts接口没有默认值，该警告提示是因为在使用 withDefaults 为 prop 设置默认值时，仍将其类型定义为必需（required），这在逻辑上冲突。应将 prop 定义为可选。

## 解决方案
将 Props 接口中对应的 prop 类型设置为可选（即加上 ?），以匹配 withDefaults 提供的默认值，消除 ESLint 警告。
::: CTcode

```ts
interface Props {
  url: string;
  title: string;
  description: string;
  logo: string;
}
```

改为：

```ts
interface Props {
  url?: string;
  title?: string;
  description?: string;
  logo?: string;
}
```

:::