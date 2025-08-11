```ts
import {
  componentPlugin,
  type ComponentPluginOptions
} from '@mdit-vue/plugin-component' // 导入组件插件及其选项类型
import {
  frontmatterPlugin,
  type FrontmatterPluginOptions
} from '@mdit-vue/plugin-frontmatter' // 导入前言插件及其选项类型
import {
  headersPlugin,
  type HeadersPluginOptions
} from '@mdit-vue/plugin-headers' // 导入标题插件及其选项类型
import { sfcPlugin, type SfcPluginOptions } from '@mdit-vue/plugin-sfc' // 导入单文件组件插件及其选项类型
import { titlePlugin } from '@mdit-vue/plugin-title' // 导入标题插件
import { tocPlugin, type TocPluginOptions } from '@mdit-vue/plugin-toc' // 导入目录插件及其选项类型
import { slugify as defaultSlugify } from '@mdit-vue/shared' // 导入默认的 slugify 函数
import type {
  LanguageInput,
  ShikiTransformer,
  ThemeRegistrationAny
} from '@shikijs/types' // 导入 Shiki 相关类型
import anchorPlugin from 'markdown-it-anchor' // 导入锚点插件
import { MarkdownItAsync, type Options } from 'markdown-it-async' // 导入异步 Markdown 解析器及其选项类型
import attrsPlugin from 'markdown-it-attrs' // 导入属性插件
import { full as emojiPlugin } from 'markdown-it-emoji' // 导入表情符号插件
import type { BuiltinLanguage, BuiltinTheme, Highlighter } from 'shiki' // 导入 Shiki 内置语言、主题和高亮器类型
import type { Logger } from 'vite' // 导入 Vite 日志记录器类型
import type { Awaitable } from '../shared' // 导入可等待类型
import { containerPlugin, type ContainerOptions } from './plugins/containers' // 导入容器插件及其选项类型
import { gitHubAlertsPlugin } from './plugins/githubAlerts' // 导入 GitHub 警告插件
import { highlight as createHighlighter } from './plugins/highlight' // 导入高亮创建函数
import { highlightLinePlugin } from './plugins/highlightLines' // 导入行高亮插件
import { imagePlugin, type Options as ImageOptions } from './plugins/image' // 导入图片插件及其选项类型
import { lineNumberPlugin } from './plugins/lineNumbers' // 导入行号插件
import { linkPlugin } from './plugins/link' // 导入链接插件
import { preWrapperPlugin } from './plugins/preWrapper' // 导入预包装器插件
import { restoreEntities } from './plugins/restoreEntities' // 导入实体恢复插件
import { snippetPlugin } from './plugins/snippet' // 导入代码片段插件

export type { Header } from '../shared' // 导出 Header 类型

// 主题选项类型，可以是任何主题注册、内置主题，或者包含亮色和暗色主题的对象
export type ThemeOptions =
  | ThemeRegistrationAny
  | BuiltinTheme
  | {
      light: ThemeRegistrationAny | BuiltinTheme
      dark: ThemeRegistrationAny | BuiltinTheme
    }

// Markdown 选项接口，扩展自基本选项
export interface MarkdownOptions extends Options {
  /* ==================== 通用选项 ==================== */

  /**
   * 在应用插件之前设置 markdown-it 实例
   */
  preConfig?: (md: MarkdownItAsync) => Awaitable<void>
  /**
   * 设置 markdown-it 实例
   */
  config?: (md: MarkdownItAsync) => Awaitable<void>
  /**
   * 禁用缓存（实验性功能）
   */
  cache?: boolean
  /**
   * 外部链接配置
   */
  externalLinks?: Record<string, string>

  /* ==================== 语法高亮 ==================== */

  /**
   * 语法高亮的自定义主题。
   *
   * 你也可以传递一个包含 `light` 和 `dark` 主题的对象来支持双主题。
   *
   * @example { theme: 'github-dark' }
   * @example { theme: { light: 'github-light', dark: 'github-dark' } }
   *
   * 你可以使用现有的主题。
   * @see https://shiki.style/themes
   * 或者添加你自己的主题。
   * @see https://shiki.style/guide/load-theme
   */
  theme?: ThemeOptions
  /**
   * 用于语法高亮的自定义语言或预加载内置语言。
   * @see https://shiki.style/languages
   */
  languages?: (LanguageInput | BuiltinLanguage)[]
  /**
   * 自定义语言别名。
   *
   * @example { 'my-lang': 'js' }
   * @see https://shiki.style/guide/load-lang#custom-language-aliases
   */
  languageAlias?: Record<string, string>
  /**
   * 在代码块中显示行号
   * @default false
   */
  lineNumbers?: boolean
  /**
   * 当指定的语言不可用时使用的后备语言。
   */
  defaultHighlightLang?: string
  /**
   * 应用于代码块的转换器
   * @see https://shiki.style/guide/transformers
   */
  codeTransformers?: ShikiTransformer[]
  /**
   * 设置 Shiki 实例
   */
  shikiSetup?: (shiki: Highlighter) => void | Promise<void>
  /**
   * 代码块中复制按钮的提示文本
   * @default 'Copy Code'
   */
  codeCopyButtonTitle?: string

  /* ==================== Markdown It 插件 ==================== */

  /**
   * `markdown-it-anchor` 插件的选项
   * @see https://github.com/valeriangalliat/markdown-it-anchor
   */
  anchor?: anchorPlugin.AnchorOptions
  /**
   * `markdown-it-attrs` 插件的选项
   * @see https://github.com/arve0/markdown-it-attrs
   */
  attrs?: {
    leftDelimiter?: string // 左定界符
    rightDelimiter?: string // 右定界符
    allowedAttributes?: Array<string | RegExp> // 允许的属性
    disable?: boolean // 是否禁用
  }
  /**
   * `markdown-it-emoji` 插件的选项
   * @see https://github.com/markdown-it/markdown-it-emoji
   */
  emoji?: {
    defs?: Record<string, string> // 表情符号定义
    enabled?: string[] // 启用的表情符号
    shortcuts?: Record<string, string | string[]> // 表情符号快捷方式
  }
  /**
   * `@mdit-vue/plugin-frontmatter` 插件的选项
   * @see https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-frontmatter
   */
  frontmatter?: FrontmatterPluginOptions
  /**
   * `@mdit-vue/plugin-headers` 插件的选项
   * @see https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-headers
   */
  headers?: HeadersPluginOptions | boolean
  /**
   * `@mdit-vue/plugin-sfc` 插件的选项
   * @see https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-sfc
   */
  sfc?: SfcPluginOptions
  /**
   * `@mdit-vue/plugin-toc` 插件的选项
   * @see https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc
   */
  toc?: TocPluginOptions
  /**
   * `@mdit-vue/plugin-component` 插件的选项
   * @see https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-component
   */
  component?: ComponentPluginOptions
  /**
   * `markdown-it-container` 插件的选项
   * @see https://github.com/markdown-it/markdown-it-container
   */
  container?: ContainerOptions
  /**
   * 数学公式支持
   *
   * 你需要安装 `markdown-it-mathjax3` 并将 `math` 设置为 `true` 来启用它。
   * 你也可以在这里传递选项给 `markdown-it-mathjax3`。
   * @default false
   * @see https://vitepress.dev/guide/markdown#math-equations
   */
  math?: boolean | any
  /**
   * 图片插件选项
   */
  image?: ImageOptions
  /**
   * 允许禁用 GitHub 风格的警告插件
   * @default true
   * @see https://vitepress.dev/guide/markdown#github-flavored-alerts
   */
  gfmAlerts?: boolean
}

// Markdown 渲染器类型
export type MarkdownRenderer = MarkdownItAsync

// Markdown 实例和高亮器处理函数
let md: MarkdownRenderer | undefined
let _disposeHighlighter: (() => void) | undefined

/**
 * 释放 Markdown 实例
 */
export function disposeMdItInstance() {
  if (md) {
    md = undefined
    _disposeHighlighter?.()
  }
}

/**
 * 创建 Markdown 渲染器
 * @experimental 实验性功能
 */
export async function createMarkdownRenderer(
  srcDir: string, // 源目录
  options: MarkdownOptions = {}, // Markdown 选项
  base = '/', // 基础路径
  logger: Pick<Logger, 'warn'> = console // 日志记录器
): Promise<MarkdownRenderer> {
  // 如果已存在实例，直接返回
  if (md) return md

  // 设置主题和复制按钮标题
  const theme = options.theme ?? { light: 'github-light', dark: 'github-dark' }
  const codeCopyButtonTitle = options.codeCopyButtonTitle || 'Copy Code'

  // 创建高亮器
  let [highlight, dispose] = options.highlight
    ? [options.highlight, () => {}]
    : await createHighlighter(theme, options, logger)

  _disposeHighlighter = dispose

  // 创建 Markdown 实例
  md = new MarkdownItAsync({ html: true, linkify: true, highlight, ...options })

  // 设置链接处理和实体恢复
  md.linkify.set({ fuzzyLink: false })
  md.use(restoreEntities)

  // 应用预配置
  if (options.preConfig) {
    await options.preConfig(md)
  }

  // 获取 slugify 函数
  const slugify = options.anchor?.slugify ?? defaultSlugify

  // 应用自定义插件
  md.use(componentPlugin, { ...options.component }) // 组件插件
    .use(highlightLinePlugin) // 行高亮插件
    .use(preWrapperPlugin, { codeCopyButtonTitle }) // 预包装器插件
    .use(snippetPlugin, srcDir) // 代码片段插件
    .use(containerPlugin, options.container) // 容器插件
    .use(imagePlugin, options.image) // 图片插件
    .use(
      linkPlugin,
      { target: '_blank', rel: 'noreferrer', ...options.externalLinks },
      base,
      slugify
    ) // 链接插件
    .use(lineNumberPlugin, options.lineNumbers) // 行号插件

  // 设置表格开启规则
  const tableOpen = md.renderer.rules.table_open
  md.renderer.rules.table_open = function (tokens, idx, options, env, self) {
    const token = tokens[idx]
    if (token.attrIndex('tabindex') < 0) token.attrPush(['tabindex', '0'])
    return tableOpen
      ? tableOpen(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options)
  }

  // 应用 GitHub 警告插件
  if (options.gfmAlerts !== false) {
    md.use(gitHubAlertsPlugin, options.container)
  }

  // 应用第三方插件
  if (!options.attrs?.disable) {
    md.use(attrsPlugin, options.attrs) // 属性插件
  }
  md.use(emojiPlugin, { ...options.emoji }) // 表情符号插件

  // 应用 mdit-vue 插件
  md.use(anchorPlugin, {
    slugify,
    getTokensText: (tokens) => {
      return tokens
        .filter((t) => !['html_inline', 'emoji'].includes(t.type))
        .map((t) => t.content)
        .join('')
    },
    permalink: (slug, _, state, idx) => {
      const title =
        state.tokens[idx + 1]?.children
          ?.filter((token) => ['text', 'code_inline'].includes(token.type))
          .reduce((acc, t) => acc + t.content, '')
          .trim() || ''

      const linkTokens = [
        Object.assign(new state.Token('text', '', 0), { content: ' ' }),
        Object.assign(new state.Token('link_open', 'a', 1), {
          attrs: [
            ['class', 'header-anchor'],
            ['href', `#${slug}`],
            ['aria-label', `Permalink to "${title}"`]
          ]
        }),
        Object.assign(new state.Token('html_inline', '', 0), {
          content: '&#8203;',
          meta: { isPermalinkSymbol: true }
        }),
        new state.Token('link_close', 'a', -1)
      ]

      state.tokens[idx + 1].children?.push(...linkTokens)
    },
    ...options.anchor
  } as anchorPlugin.AnchorOptions).use(frontmatterPlugin, {
    ...options.frontmatter
  } as FrontmatterPluginOptions)

  // 应用标题插件
  if (options.headers) {
    md.use(headersPlugin, {
      level: [2, 3, 4, 5, 6],
      slugify,
      ...(typeof options.headers === 'boolean' ? undefined : options.headers)
    } as HeadersPluginOptions)
  }

  // 应用单文件组件插件、标题插件和目录插件
  md.use(sfcPlugin, {
    ...options.sfc
  } as SfcPluginOptions)
    .use(titlePlugin)
    .use(tocPlugin, {
      slugify,
      ...options.toc
    } as TocPluginOptions)

  // 应用数学公式插件
  if (options.math) {
    try {
      const mathPlugin = await import('markdown-it-mathjax3')
      md.use(mathPlugin.default ?? mathPlugin, {
        ...(typeof options.math === 'boolean' ? {} : options.math)
      })
      const origMathInline = md.renderer.rules.math_inline!
      md.renderer.rules.math_inline = function (...args) {
        return origMathInline
          .apply(this, args)
          .replace(/^<mjx-container /, '<mjx-container v-pre ')
      }
      const origMathBlock = md.renderer.rules.math_block!
      md.renderer.rules.math_block = function (...args) {
        return origMathBlock
          .apply(this, args)
          .replace(/^<mjx-container /, '<mjx-container v-pre tabindex="0" ')
      }
    } catch (error) {
      throw new Error(
        '你需要安装 `markdown-it-mathjax3` 来使用数学公式支持。'
      )
    }
  }

  // 应用用户配置
  if (options.config) {
    await options.config(md)
  }

  return md
}
```