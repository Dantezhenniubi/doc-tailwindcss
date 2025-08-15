import js from '@eslint/js';
import globals from 'globals';
// https://github.com/typescript-eslint/typescript-eslint
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ES 模块兼容的方式获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取项目根目录（ESLint 配置文件的目录）
const projectRoot = __dirname;

export default [
  // 2. 全局设置
  {
    linterOptions: {
      reportUnusedDisableDirectives: true, // 报告未使用的禁用指令
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
  },
  // 5. JavaScript 文件配置
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
    // 1. 基础 JavaScript 规则
    ...js.configs.recommended,
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      // 添加 JSX 解析支持
      parser: tsParser, // 使用 TypeScript 解析器处理 JSX
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        // 明确指定 JSX 支持
        parser: {
          js: tsParser, // 使用 TS 解析器处理 JS 文件
          jsx: tsParser, // 使用 TS 解析器处理 JSX 文件
        },
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
    },
  },
  // 展开vue推荐配置
  ...vuePlugin.configs['flat/recommended'],

  // 3. Vue 文件配置
  {
    files: ['*.vue', '**/*.vue'],
    plugins: {
      vue: vuePlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest', // 允许使用最新的 ECMAScript 版本
        sourceType: 'module', // 指示正在使用的 JavaScript 文件的模式,允许使用 import/export 语法
        ecmaFeatures: {
          jsx: true, // 允许使用 JSX 语法
        },
        parser: {
          // 在 <script> 标签中使用不同的解析器
          js: 'espree', // 使用 espree 解析器
          ts: tsParser,
        },
      },
    },
    rules: {
      'prettier/prettier': 'error',
      // vuePlugin规则：https://eslint.vuejs.org/rules/
      'vue/multi-word-component-names': 'off', // 关闭组件名必须多单词的限制
      'vue/no-v-html': 'warn', // 将 v-html 用法降级为警告而非错误
      'vue/component-api-style': ['error', ['script-setup']], // 强制使用 script setup 语法
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }], // 强制组件的块顺序
    },
  },

  // 4. TypeScript 文件配置
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest', // 允许使用最新的 ECMAScript 版本
        sourceType: 'module', // 允许使用 import/export 语法
        ecmaFeatures: {
          jsx: true, // 允许在 .ts 文件中使用 JSX 语法
        },
        project: [path.resolve(projectRoot, 'tsconfig.json')], // 绝对路径
        tsconfigRootDir: projectRoot, // 项目根目录
      },
    },
    rules: {
      // TypeScript 特定规则
      '@typescript-eslint/array-type': 'error', // 数组类型建议使用 Array<T> 而不是 T[]
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // 接口建议使用 interface 而不是 type
      '@typescript-eslint/consistent-type-assertions': 'error', // 建议使用类型断言而不是类型转换
      '@typescript-eslint/no-unsafe-assignment': 'error', // 禁止不安全的赋值
      '@typescript-eslint/explicit-function-return-type': 'warn', // 建议为函数添加返回类型
      '@typescript-eslint/no-explicit-any': 'warn', // 禁止使用 any 类型
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // 允许使用下划线前缀的参数
          varsIgnorePattern: '^_', // 允许使用下划线前缀的变量
          caughtErrorsIgnorePattern: '^_', // 允许使用下划线前缀的捕获错误变量
        },
      ],
      '@typescript-eslint/no-empty-function': 'warn', // 禁止空函数
      '@typescript-eslint/no-empty-interface': 'warn', // 禁止空接口
      '@typescript-eslint/no-inferrable-types': 'warn', // 禁止推断类型
      '@typescript-eslint/no-non-null-assertion': 'warn', // 禁止非空断言
      '@typescript-eslint/prefer-nullish-coalescing': 'warn', // 建议使用空值合并运算符
      '@typescript-eslint/prefer-optional-chain': 'warn', // 建议使用可选链运算符
      '@typescript-eslint/ban-ts-comment': [
        'warn',
        {
          'ts-expect-error': 'allow-with-description', // 允许使用 @ts-expect-error 注释
          'ts-ignore': 'allow-with-description', // 允许使用 @ts-ignore 注释
          'ts-nocheck': 'allow-with-description', // 允许使用 @ts-nocheck 注释
          'ts-check': 'allow-with-description', // 允许使用 @ts-check 注释
          minimumDescriptionLength: 3, // 允许使用 @ts-* 注释的最小描述长度
        },
      ],
      // 禁用与 TypeScript 规则冲突的 ESLint 规则
      'no-unused-vars': 'off', // 使用 @typescript-eslint/no-unused-vars 代替
      'no-empty-function': 'off', // 使用 @typescript-eslint/no-empty-function 代替
      'prettier/prettier': 'error',
    },
  },
  // 6. 应用 Prettier 配置
  // 确保 eslint-config-prettier 放在最后，以覆盖之前的规则
  eslintConfigPrettier,

  // 7. 忽略的文件和目录
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.vitepress/{dist,cache}/**',
      '**/*.md',
      'public/**',
      'assets/**',
      // '**/test-lint/**', // 用于测试语法的目录
    ],
  },
];
