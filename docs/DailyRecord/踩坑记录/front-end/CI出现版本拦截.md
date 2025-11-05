---
outline: [2, 6]
tags: ['部署', '踩坑记录', '前端']
---

# GitHub Pages CI部署时出现版本拦截

我一开始的报错如下:

::: danger
```md
推送到github action部署出错：
Run pnpm install
 WARN  A pnpm-lock.yaml file exists. The current configuration prohibits to read or write a lockfile
Progress: resolved 1, reused 0, downloaded 0, added 0
Progress: resolved 47, reused 0, downloaded 42, added 0
Progress: resolved 82, reused 0, downloaded 48, added 0
Progress: resolved 165, reused 0, downloaded 145, added 0
Progress: resolved 227, reused 0, downloaded 184, added 0
 ERR_PNPM_UNSUPPORTED_ENGINE  Unsupported environment (bad pnpm and/or Node.js version)

This error happened while installing the dependencies of unplugin-auto-import@20.2.0

Your Node version is incompatible with "unplugin-utils@0.3.1".

Expected version: >=20.19.0
Got: v20.18.2

This is happening because the package's manifest has an engines.node field specified.
To fix this issue, install the required Node version.
Error: Process completed with exit code 1.
```
:::

然后我在`deploy.yml`加了`--frozen-lockfile` 使用本地锁文件:
```yml
- name: Install dependencies
  run: pnpm install --frozen-lockfile
```

然后又报错:
::: danger
```md
Run pnpm install --frozen-lockfile
 WARN  A pnpm-lock.yaml file exists. The current configuration prohibits to read or write a lockfile
 ERR_PNPM_NO_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is absent

Note that in CI environments this setting is true by default. If you still need to run install in such cases, use "pnpm install --no-frozen-lockfile"
Error: Process completed with exit code 1.
```
:::

我问了AI，AI是这样说的：

第一句说“lockfile 存在但**被配置禁止读写**”，第二句又说“lockfile 不存在所以无法 `--frozen-lockfile`”。
根本原因：你的 `.npmrc / package.json /` 环境变量里显式写了 `lockfile=false`，导致 pnpm 10 **强制忽略锁文件**，于是 `--frozen-lockfile` 直接失败。

## 总结

首先，我们要搞清楚以下问题：

- `lockfile=false`是pnpm的配置?

- `package-lock=false`是npm的配置?

- `--frozen-lockfile`是pnpmCI部署指令的一个参数，用于固定锁文件与本地相同?

- `engine-strict=true`是npm的配置项，需要package.json里有engine字段配置，会严格执行node版本?

- 锁文件是什么？

- 锁文件和依赖的关系？

- CICD是什么？



### 配置参数说明

| 配置项               | 所属包管理器                | 作用                                           | 备注                                                                                                            |
| -------------------- | --------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `lockfile=false`     | **pnpm** 专有               | 禁止生成/读取 `pnpm-lock.yaml`                 | 写进 `.npmrc` 就全局生效；pnpm 10 默认 `true`，设成 `false` 会强制忽略锁文件，导致 `--frozen-lockfile` 直接失败 |
| `package-lock=false` | **npm** 专有                | 禁止生成 `package-lock.json`                   | 对 pnpm **完全无效**，属于「复制粘贴残留」；可以安全删除                                                        |
| `--frozen-lockfile`  | **pnpm/yarn** 参数          | 安装时**严格复现**锁文件描述的依赖树           | CI 推荐加；pnpm 10 在 CI 里默认 `true`，但若 `lockfile=false` 就会冲突报错                                      |
| `engine-strict=true` | **npm** 原生，**pnpm** 兼容 | 让 `engines.node` 字段从「警告」变成「硬报错」 | 本地/CI 只要 Node 版本低于 `package.json` 要求的下限就 exit 1                                                   |

### 锁文件 & 依赖的关系

- **锁文件（lock file）** =「依赖快照」
它把**间接依赖**的**精确版本号、下载地址、哈希**全部钉死，保证「谁、什么时候、在哪台机器」都能装出**完全一样**的 node_modules 树」。
- `**package.json**` 只声明「宽泛范围」(^1.2.0、~2.3.4)，

**锁文件**才把「1.2.0 还是 1.2.7」落到磁盘。

- 不同包管理器锁文件名字不同：
    
    npm → package-lock.json
    
    yarn → yarn.lock
    
    pnpm → pnpm-lock.yaml

- 因此：
    - 开发阶段：提交锁文件到仓库 → 团队所有人环境一致。
    - CI/CD 阶段：用 `--frozen-lockfile` 直接复现，避免「今天装到最新版 A，明天装到最新版 B」导致的**构建漂移**。

### CI/CD 是什么？

| 术语   | 全称                                                          | 通俗解释                                                                               |
| ------ | ------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **CI** | Continuous Integration（持续集成）                            | 每次 push/PR 自动跑「安装依赖 →  lint/test/build → 出包/出镜像」，**尽早发现集成错误** |
| **CD** | Continuous Delivery 或 Continuous Deployment（持续交付/部署） | CI 成功后自动把产物「发到预发布环境」甚至「直接上线」，**人工 0 干预**                 |

GitHub Actions、GitLab CI、Jenkins、Azure DevOps 都是 CI/CD 平台。
`deploy.yml` 就是一条典型流水线：
「push → CI 阶段（pnpm install + vitepress build）→ CD 阶段（GitHub Pages 部署）」。

开发者 push
   ↓
GitHub Actions 触发
   ↓
checkout 代码 + 锁文件
   ↓
pnpm install --frozen-lockfile   ← 严格复现依赖
   ↓
pnpm run docs:build              ← 产物生成
   ↓
upload-pages-artifact
   ↓
deploy-pages                     ← 线上生效（CD）

