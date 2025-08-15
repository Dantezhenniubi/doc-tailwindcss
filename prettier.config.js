// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs
// 具体规则可看官方文档https://prettier.io/docs/options
/** @type {import('prettier').Config} */
const config = {
  semi: true, // 允许使用分号
  singleQuote: true, // 允许使用单引号
  tabWidth: 2, // 允许使用 2 个空格缩进
  printWidth: 100, // 允许使用 100 个字符宽度
  trailingComma: 'es5', // 尾随逗号，在 ES5 中，尾随逗号有效（对象、数组等）。TypeScript 和 Flow 中的类型参数尾随逗号无效。
  bracketSpacing: true, // 允许使用括号空格
  arrowParens: 'always', // 允许使用箭头函数括号
  endOfLine: 'auto', // 允许使用自动换行
};

export default config;
