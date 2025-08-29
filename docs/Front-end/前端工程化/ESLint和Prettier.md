---
outline: [1, 4]
---

# ESLint9 和 Prettier 配置指南

## 安装依赖

如果你使用的是类VScode编辑器，推荐使用插件`Version Lens`，它能直接在package.json里显示最新的依赖版本。

- 假设你使用了`pnpm`和`Version Lens`：
  在`package.json`中安装依赖(此处版本为编写该教程时最新)：
  - 安装主要依赖

  ```js
  "eslint": "^9.31.0",
  "@eslint/js": "^9.31.0",
  "prettier": "^3.6.2",
  ```

  - 安装其它依赖

  ```js
  "globals": "^16.3.0",
  "vue-eslint-parser": "^10.2.0",
  "eslint-plugin-vue": "^10.3.0",
  "@typescript-eslint/eslint-plugin": "^8.37.0",
  "@typescript-eslint/parser": "^8.37.0",
  "eslint-config-prettier": "^10.1.8",
  "eslint-plugin-prettier": "^5.5.3",
  ```

  然后终端执行命令`pnpm install`将依赖更新到需要的版本即可

- 假设你只使用了`pnpm`：
  ```bash
  pnpm add -D eslint @eslint/js prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin globals vue-eslint-parser eslint-plugin-vue
  ```

::: tip
说明一下各依赖的作用：

- `eslint`：ESLint 核心库，用于解析和检查代码。
- `@eslint/js`：ESLint 插件，提供 JavaScript 相关的规则。
- `prettier`：Prettier 代码格式化工具。
- `eslint-config-prettier`：ESLint 插件，用于禁用与 Prettier 冲突的规则。
- `eslint-plugin-prettier`：ESLint 插件，用于将 Prettier 作为 ESLint 规则运行。
- `@typescript-eslint/parser`：TypeScript 解析器，用于解析 TypeScript 代码。
- `@typescript-eslint/eslint-plugin`：TypeScript ESLint 插件，提供 TypeScript 相关的规则。@typescript-eslint/eslint-plugin是一个 ESLint 插件，用于从 typescript-eslint 加载自定义规则和规则配置列表。这些规则依赖于@typescript-eslint/parser将 TypeScript 代码解析为与 ESLint 兼容的节点，并提供 TypeScript 程序的支持。
- `vue-eslint-parser`：Vue ESLint 解析器，用于解析 Vue 代码。
- `eslint-plugin-vue`：Vue ESLint 插件，提供 Vue 相关的规则。
- `globals`：ESLint 插件，提供全局变量相关的规则。
  :::

## ESLint9 配置

### 启用 ESM 支持

在 `package.json` 中添加 `"type": "module"` 字段以启用 ESM 模块支持：

```json
{
  "type": "module"
  // 其他配置...
}
```

### 配置文件

ESLint 9.x 版本使用 `eslint.config.js` 作为配置文件（扁平配置），支持以下文件名：

- `eslint.config.js`
- `eslint.config.mjs`
- `eslint.config.cjs`
- `eslint.config.ts`（需要额外配置）
- `eslint.config.mts`（需要额外配置）
- `eslint.config.cts`（需要额外配置）

本教程先以`eslint.config.js`为例，介绍一下配置。
首先在项目根目录下创建`eslint.config.js`文件
ESlint9对比旧版本最大的区别就是往外部暴露配置时，是以**数组**的形式暴露的。

一些官方文档或规则参考：

- 官方文档：
  eslint：https://eslint.org/docs/latest/
  eslint-plugin-vue：https://eslint.vuejs.org/user-guide/
  typescript-eslint: https://typescript-eslint.io/getting-started/
- 规则：
  eslint规则操场: https://eslint.org/play/
  eslint：https://eslint.org/docs/latest/rules/
  eslint-plugin-vue：https://eslint.vuejs.org/rules/
- 仓库地址：
  eslint-plugin-vue：https://github.com/vuejs/eslint-plugin-vue

**这里有份简单的示例：**
::: CTcode

```js
import js from "@eslint/js"
// 导入Vue规则用于ESLint配置
import vuePlugin from 'eslint-plugin-vue'
// 导入Vue解析器用于ESLint配置
import vueParser from "vue-eslint-parser"
// 导入TypeScript解析器用于ESLint配置
import tsParser from '@typescript-eslint/parser';
// 导入TypeScript插件用于ESLint配置
import tsPlugin from '@typescript-eslint/eslint-plugin';
// 导入全局变量用于ESLint配置
import globals from 'globals'

export default [
  {
    // 指定要检查的文件类型
    files: ['**/*.{js, ts, tsx}'],
    // 指定规则
    rules: {
      // 推荐的规则
      ...js.configs.recommended.rules,
      // 使用vuePlugin插件的规则
      ...vuePlugin.configs['flat/recommended'],
      // 如果你使用的是vue2，则是...vuePlugin.configs['flat/vue2-recommended'],
      // 你可以参考官方文档https://eslint.vuejs.org/user-guide/

      // 使用插件的规则，自定义插件名/规则名
      "vue/html-self-closing": "error"
      // 比如指定使用console就会报错
      "no-console": "error"
    }
    // 语言支持
    languageOptions: {
      // 解析器
      parser: vueParser,
      // parserOptions.parser属性指定自定义解析器
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        // 明确指定 JSX 支持
        // 额外后缀名支持
        extraFileExtension: ['.vue'],
        parser: tsParser,
      },
    },
    // 插件支持
    plugins: {
      // 前面是定义的插件名，后面是对应插件，意思就是你定义好的插件名可以在rules规则里使用
      vue: vuePlugin,
      // 当然你也可以直接使用命名空间
      vuePlugin,
    },
    // 扩展配置，详见https://eslint.org/docs/latest/use/configure/configuration-files#extending-configurations
    // 你可以直接访问命名空间的配置
    // 也可以指定已经在plugins插件里定义好的插件，就像这样：
    plugins: {
			example: pluginExample,
		},
		extends: [pluginExample.configs.recommended],
  },
];
```

:::

**下面是本项目的示例配置：**

<!-- <<< ../../eslint.config.js -->

#### 需要注意的点:star:

- 配置文件的数组顺序很重要，数组越靠前的配置会覆盖越靠后的配置。
- 关于plugin vue推荐配置的引入
  官方的推荐规则是在`...vuePlugin.configs['flat/recommended'],`里的

  详见：https://eslint.vuejs.org/rules/

  由于是作为对象展开，如果你的配置文件是这样的结构([级联配置对象](https://eslint.org/docs/latest/use/configure/configuration-files#cascading-configuration-objects))
  你必须把这个展开语句放在外层
  就像这样
  ::: CTcode

  ```js{7}
  export default {
    {
      languageOptions: {
        xxxxx
      }
    },
    ...vuePlugin.configs['flat/recommended'],
    {
      file: xxxxx
      rules: xxx
    }

  }
  ```

  :::

- 确保 eslint-config-prettier 放在最后，以覆盖之前的规则
  官方原话：导入 eslint-config-prettier，并将其放入配置数组中 -位于您想要覆盖的其他配置之后。

  就像这样
  ::: CTcode

  ```js{12}
  export default {
    {
      languageOptions: {
        xxxxx
      }
    },
    ...vuePlugin.configs['flat/recommended'],
    {
      file: xxxxx
      rules: xxx
    },
    eslintConfigPrettier,
  }
  ```

  :::

- 关于TS的检查

  安装了`typescript-eslint`后，你最好确保项目下是有`tsconfig.json`的，否则eslint的检查过程很可能报错。
  因为ts的parser解析器是会基于`tsconfig.json`中的类型信息来检查文件目录的。
  下面是一份`tsconfig.json`的示例文件

  <!-- <<< ../../tsconfig.json{js} -->

  > **依然出现Parsing error？**

  这很可能是由于你在ts文件中使用了jsx语法导致的，详细请看[关于ts和tsx文件的区别](../../Front-end/前端开发小技巧/TS和TSX文件.md)

## 添加 NPM 脚本

在 `package.json` 中添加以下脚本，我们逐一进行操作：

### 添加指令

`eslint .`(无修复)：

    ✅ 只做代码检查
    ❌ 发现错误时不会修改任何文件
    📝 在终端输出所有错误和警告清单
    ⚠️ 需要开发者手动修复所有问题

`eslint . --fix`(自动修复)：

    🛠️ 尝试自动修复支持修复的问题（如缩进、引号、分号等风格问题）
    ❗ 无法自动修复的问题（如逻辑错误）会输出警告
    ✨ 修复后直接修改源文件（.js, .ts 等）
    ️ 大幅减少手动修复工作量

`eslint . --ext .js,.jsx,.ts,.tsx,.vue`(指定检查):
🔍 检查指定文件类型，比如 .js、.jsx、.ts、.tsx、.vue 等文件

::: code-group

```js[开启自动修复]
"lint": "eslint . --fix",
```

```js[常规检查，不修复]
"lint": "eslint .",
```

```js[明确指定检查的文件后缀]
"lint": "eslint . --ext .js,.jsx,.ts,.tsx,.vue",
```

:::

### 使用指令

在终端输入`pnpm lint`之后，会在终端输出所有错误和警告清单。

::: warning
如果你发现类似以下错误`Parsing error`，说明你的eslint并没有成功解析Vue文件，这可能是配置编写问题，或者依赖安装失败或漏装。

```bash
'"' 不是内部或外部命令，也不是可运行的程序
或批处理文件。

H:\doc-demo\.vitepress\theme\components\TailwindCard.vue
  1:1  error  Parsing error: Unexpected token <
```

:::

::: tip
推荐配置:

```json
{
  "scripts": {
    "lint": "eslint . --fix",
    "format": "prettier --write ."
  }
}
```

:::

## 编辑器集成

### VS Code

1. 安装 ESLint 和 Prettier 插件：
   - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

2. 配置 VS Code 设置（`.vscode/settings.json`）：

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "vue"]
}
```

## Prettier 配置

### 配置文件

Prettier 支持多种配置文件格式，按优先级从高到低排序：

1. `package.json` 中的 `"prettier"` 字段
2. JSON 或 YAML 格式的 `.prettierrc` 文件
3. `.prettierrc.json`、`.prettierrc.yml`、`.prettierrc.yaml` 或 `.prettierrc.json5` 文件
4. `.prettierrc.js`、`prettier.config.js`、`.prettierrc.ts` 或 `prettier.config.ts` 文件（使用 `export default` 或 `module.exports`）
5. `.prettierrc.mjs`、`prettier.config.mjs`、`.prettierrc.mts` 或 `prettier.config.mts` 文件（使用 `export default`）
6. `.prettierrc.cjs`、`prettier.config.cjs`、`.prettierrc.cts` 或 `prettier.config.cts` 文件（使用 `module.exports`）
7. `.prettierrc.toml` 文件

在本项目中，我们使用 `prettier.config.js` 文件进行配置：

```javascript
/** @type {import('prettier').Config} */
export default {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  printWidth: 100,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'auto',
};
```

### 忽略文件配置

创建 `.prettierignore` 文件来指定不需要格式化的文件和目录：

```plaintext
# VitePress 构建输出
.vitepress/dist/
.vitepress/cache/

# 依赖目录
node_modules/

# 其他构建输出
dist/
build/

# 日志文件
*.log

# 本地环境文件
.env.local
.env.*.local

# 编辑器目录和文件
.idea/
.vscode/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# 包管理器文件
pnpm-lock.yaml
package-lock.json
yarn.lock

# Markdown 文件（可选，如果你想保持 Markdown 文件的原始格式）
# *.md
```

## 注意事项

1. ESLint 和 Prettier 的配置文件应该放在项目根目录下。
2. 确保在每个项目中都本地安装 Prettier，这样可以保证团队成员使用相同的 Prettier 版本。
3. 如果使用 TypeScript，需要安装相关的解析器和插件。
4. 可以根据项目需求调整规则配置。
5. 建议将 ESLint 和 Prettier 配置文件添加到版本控制中，以确保团队成员使用相同的代码规范。
6. 使用 ESM 配置时，确保在 `package.json` 中设置 `"type": "module"`。
7. 如果遇到全局变量未定义的错误，可以使用 `globals` 包来引入预定义的全局变量。
8. 不要同时使用 eslint-plugin-prettier 和 eslint-config-prettier，只需要使用 eslint-config-prettier 来关闭所有与 Prettier 冲突的 ESLint 规则。
