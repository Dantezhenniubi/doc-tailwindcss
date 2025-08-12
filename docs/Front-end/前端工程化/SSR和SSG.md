---
outline: [1,6]
---

# SSR和SSG

## 简单介绍
| 术语                           | 含义                                                                | 适用场景                                     |
| ------------------------------ | ------------------------------------------------------------------- | -------------------------------------------- |
| SSR \(Server\-Side Rendering\) | 在 Node\.js 服务器环境 预渲染页面（VitePress 仅在构建阶段使用 SSR） | 构建时生成静态 HTML，解决 SEO 和首屏性能问题 |
| SSG \(Static Site Generation\) | 通过 SSR 在构建时生成 纯静态 HTML 文件（VitePress 的默认模式）      | 文档、博客等无动态数据的站点                 |
| 构建阶段                       | 在 CI/CD（如 GitHub Actions）中运行 pnpm build 生成静态文件的阶段   | 部署到 GitHub Pages、Netlify 等静态托管服务  |

## SSR (Server-Side Rendering,服务端渲染) 介绍

