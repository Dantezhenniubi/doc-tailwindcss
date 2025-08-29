# 配置Git钩子

记录一下配置 git钩子的过程，踩了不少坑

## 安装依赖

一般是lint-staged + husky，但是本项目是小项目，把husky换成[simple-git-hooks](https://github.com/toplenboren/simple-git-hooks)

一个让你轻松管理 git hooks 的工具，比husky更加轻量化
::: CTcode 安装命令

```sh
pnpm add -D simple-git-hooks lint-staged
```

::: tip 什么是 git hook？
git hook 是一个命令或脚本，每次执行 git 操作时都会运行，例如`git commit`或`git push`。
如果 git hook 执行失败，则 git 操作将中止。
:::

## 配置钩子

我们知道，git默认的钩子都在项目下的`.git/hooks`文件夹下，里面可以看到有很多sample后缀的示例文件，我们想要启用对应的钩子，就得去掉这些文件的后缀
当然，我们不必手动操作，只需运行刚刚安装的hooks管理工具即可

首先，需要在`package.json`中编写钩子配置：
比如我的：
::: CTcode

```yaml
"simple-git-hooks": {
    "pre-commit": "npx lint-staged",
    "commit-msg": "node scripts/git-hooks/commit-msg.mjs"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix --cache --cache-location ./.eslintcache --max-warnings=0",
      "prettier --write"
    ],
    "*.{css,scss}": [
      "prettier --write"
    ],
    "*.{json,md,html}": [
      "prettier --write"
    ],
    "*.vue": [
      "eslint --fix --cache --max-warnings=0",
      "stylelint --fix"
    ]
  }
```

:::

看到这个了吗：
::: CTcode

```yaml
"simple-git-hooks": {
    "pre-commit": "npx lint-staged",
    "commit-msg": "node scripts/git-hooks/commit-msg.mjs"
  },
```

:::
`"commit-msg"`对应的就是`commit-msg`这个钩子，后面是要执行的命令

配置好之后，我们需要运行hooks工具来更新文件，注意在项目根目录下运行
::: CTcode

```sh
npx simple-git-hooks
```

:::

或者直接在`package.json`里配置`prepare` 脚本确保钩子自动安装
::: CTcode

```yaml
{ 'scripts': { 'prepare': 'simple-git-hooks' } }
```

:::
这样每次 `npm install` 或 `pnpm install` 后会自动配置钩子

`"commit-msg": "node scripts/git-hooks/commit-msg.mjs"`
的意思是：调用这个路径的脚本文件，所以我们需要手动创建`commit-msg.mjs`

测试正则表达式的[网站](https://regex101.com/)

这里给一份示例：
::: CTcode

```js
// scripts/git-hooks/commit-msg.mjs
import fs from 'node:fs';
import path from 'node:path';

const msgPath = path.resolve(process.cwd(), '.git/COMMIT_EDITMSG');
const msg = fs.readFileSync(msgPath, 'utf-8').trim();
const commitRE =
  /^Merge.+|(?:feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert|types)(?:\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  // 友好的错误提示
  console.error(
    '  Error: proper commit message format is required for automated changelog generation.'
  );
  console.error("  - Use 'npm run commit' to interactively generate a commit message.");
  console.error('  - See .github/COMMIT_CONVENTION.md for more details.');
  console.error('');

  // 添加 SourceTree 友好提示
  console.error('  SourceTree 用户请注意：');
  console.error('  1. 请修改上方的提交信息文本框');
  console.error('  2. 按规范格式重新输入，比如feat: 提交改动 或者 feat(theme): 提交改动');
  console.error('  3. 再次点击"提交"按钮');

  process.exit(1);
}
```

:::

## 题外话

感觉可以配置一下[cz-git](https://github.com/Zhengqbbb/cz-git)
命令行git提交用的，不过我都用sourcetree了感觉好像用不上？
DX 第一个更加工程化、轻量级、可定制、标准输出格式的Commitizen 适配器和Git 提交 CLI。

> 什么是 commitizen：一个基于 Node.js 的git commit命令行工具，用于辅助生成标准化的提交消息。

> 什么是适配器：替换commitizen 命令行工具的交互式插件。
