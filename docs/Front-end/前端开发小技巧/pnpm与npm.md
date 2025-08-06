---
outline: [1, 4]
---

# pnpm与npm

## 两种包管理工具的区别

- 锁文件不同 ：pnpm使用 pnpm-lock.yaml 文件记录依赖的精确版本和依赖关系，而npm使用 package-lock.json 。使用错误的包管理器可能导致依赖版本不一致。
- 依赖存储方式不同 ：pnpm使用硬链接和符号链接的方式存储依赖，结构与npm完全不同。使用npm install会重新创建node_modules目录，丢失pnpm的优化结构。

---

## 使用需要注意的点

> ### 我可以同时安装npm和pnpm吗？:tada:

- Node.js环境中可以同时存在npm和pnpm，但同一个项目应该只使用其中一种包管理器，以避免依赖管理混乱。

---

> ### 项目所在的盘有一个.pnpm-store文件夹，这个是代表我pnpm作为项目安装了还是全局安装了？:tada:

当你使用 pnpm 安装依赖时，pnpm 会在硬盘上创建一个内容可寻址的存储（通常位于 ~/.pnpm-store 或磁盘根目录下的 .pnpm-store ），用于存储所有下载的依赖包。
这个存储具有以下特点：

1. 全局共享 - 所有使用 pnpm 的项目共享同一个存储，节省磁盘空间
2. 硬链接机制 - 项目的 node_modules 中的包通过硬链接指向这个存储，不会重复占用空间
3. 磁盘位置 - 通常位于用户主目录或磁盘根目录

- 全局安装 pnpm : .pnpm-store 文件夹出现在磁盘根目录或用户主目录
- 项目安装 : 项目中会有 pnpm-lock.yaml 文件，但不会有单独的 .pnpm-store 文件夹

---

> ### 如果是项目安装的pnpm，我可以把.pnpm-store 文件夹删掉吗？:tada:

- 项目安装的 pnpm 不会在磁盘根目录或用户主目录创建 .pnpm-store 文件夹，因此你可以安全地删除它。
- 全局安装的 pnpm 会在磁盘根目录或用户主目录创建 .pnpm-store 文件夹，因此你应该谨慎操作。

---

> ### 仅项目安装时是怎样的？:tada:

- **package.json 中的依赖** ：pnpm 会被列在项目的 package.json 文件的 devDependencies 或 dependencies 中
- **本地 node_modules** ：pnpm 会被安装在项目的 node_modules/.bin 目录下，而不是全局可访问的位置
- **无全局命令** ：不能直接在命令行中使用 pnpm 命令，除非使用 npx pnpm

## npm安装时加--save和--save-dev的区别

- `--save` ：将包添加到项目的 `dependencies` 中，这意味着当其他人克隆你的项目时，他们也会自动安装这个包。
- `--save-dev` ：将包添加到项目的 `devDependencies` 中，这意味着当其他人克隆你的项目时，他们不会自动安装这个包。

`npm install xxx --save`
命令是安装模块到项目node_modules目录下，会将模块依赖写入package.json文件中的dependencies{}下。如果将node_modules目录删除，使用npm install安装所有依赖，包括自行安装的依赖（如axios），会被自动安装。

`npm install xxx`
命令是安装模块到项目node_modules目录下，不会到package.json文件中。如果将node_modules目录删除，使用npm install安装所有依赖，自行安装的依赖不会被安装（如axios），如果使用，需要再次手动安装。（npm install axios）
