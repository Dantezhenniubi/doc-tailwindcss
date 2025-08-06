/**
 * 页面工具类 - 用于处理页面相关的通用功能
 */

/**
 * 获取指定目录下的Markdown文件列表
 * @param {string} dirPath - 目录路径，默认为当前目录 '.'
 * @param {Object} options - 配置选项
 * @param {Array<string>} options.exclude - 要排除的文件名列表，默认排除 'index.md'
 * @param {Function} options.customFilter - 自定义过滤函数
 * @param {Function} options.customMap - 自定义映射函数
 * @returns {Promise<Array>} - 返回处理后的文件列表
 */
export function getMarkdownFiles(dirPath = '.', options = {}) {
  // 默认选项
  const defaultOptions = {
    exclude: ['index.md'],
    customFilter: null,
    customMap: null,
  };

  // 合并选项
  const mergedOptions = { ...defaultOptions, ...options };

  // 使用预定义的静态路径模式获取Markdown文件
  // Vite要求import.meta.glob必须使用字符串字面量
  const mdFilesMap = {
    '../../': import.meta.glob('../../*.md'),
    前端开发小技巧: import.meta.glob('../../Front-end/前端开发小技巧/*.md'),
    前端工程化: import.meta.glob('../../Front-end/前端工程化/*.md'),

    './Front-end/frontend-tool-share': import.meta.glob('./Front-end/frontend-tool-share/*.md'),
    './Front-end/vue3': import.meta.glob('./Front-end/vue3/*.md'),
    './Back-end': import.meta.glob('./Back-end/*.md'),
    './DailyRecord': import.meta.glob('./DailyRecord/*.md'),
    './DailyRecord/实习记录': import.meta.glob('./DailyRecord/实习记录/*.md'),
    './DailyRecord/开发记录': import.meta.glob('./DailyRecord/开发记录/*.md'),
    './others/vitepress搭建相关': import.meta.glob('./others/vitepress搭建相关/*.md'),
    './others/写文章相关': import.meta.glob('./others/写文章相关/*.md'),
    // 可以根据需要添加更多的预定义路径
  };

  // 获取指定目录的文件
  const mdFiles = mdFilesMap[dirPath] || {};

  // 处理文件列表
  const fileList = Object.keys(mdFiles)
    // 应用默认过滤 - 排除指定文件
    .filter((path) => {
      const fileName = path.split('/').pop();
      return !mergedOptions.exclude.includes(fileName);
    })
    // 应用自定义过滤（如果有）
    .filter((path) => (mergedOptions.customFilter ? mergedOptions.customFilter(path) : true))
    // 应用默认映射 - 提取文件名和构建路由
    .map((path) => {
      // 提取文件名（不含路径和扩展名）
      const fileNameWithExt = path.split('/').pop();
      const name = fileNameWithExt.replace(/\.md$/, '');
      // 构建路由路径（去除.md后缀）
      const route = path.replace(/\.md$/, '');
      return { name, route, path };
    })
    // 应用自定义映射（如果有）
    .map((item) => (mergedOptions.customMap ? mergedOptions.customMap(item) : item));

  return fileList;
}

/**
 * 在组件中使用的获取Markdown文件列表的辅助函数
 * @param {import('vue').Ref} articlesRef - Vue ref对象，用于存储文件列表
 * @param {string} dirPath - 目录路径，默认为当前目录 '.'
 * @param {Object} options - 配置选项，同getMarkdownFiles的options
 */
export function useMarkdownFiles(articlesRef, dirPath = '.', options = {}) {
  // 获取文件列表
  const fileList = getMarkdownFiles(dirPath, options);

  // 更新文章列表
  articlesRef.value = fileList;

  return fileList;
}
