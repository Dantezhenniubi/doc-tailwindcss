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