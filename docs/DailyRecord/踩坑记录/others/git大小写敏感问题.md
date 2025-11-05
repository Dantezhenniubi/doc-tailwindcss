---
outline: [2, 6]
tags: ['git', 'github']
---

# git大小写敏感问题

## 问题描述
更改文件名大小写提交后不一致。由于git默认配置对大小写不敏感，我更改了导入部分的文件名`Linkcard`为`LinkCard`，并提交到仓库中，但是文件本身忘记改名了。。这时候git也检测不到

## 解决方案
1. 配置 Git 区分大小写（如果尚未配置）
::: CTcode
```sh
git config core.ignorecase false
```
:::
2. 强制 Git 识别文件名大小写更改
::: CTcode
```sh
# 先删除旧文件名（小写）的缓存
git rm --cached .vitepress/theme/components/Linkcard.vue

# 添加新文件名（大写）的缓存
git add .vitepress/theme/components/LinkCard.vue
```
:::