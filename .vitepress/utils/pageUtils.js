/**
 * 页面工具类 - 用于处理页面相关的通用功能
 */


/**
 * 提取有效的路由路径
 * @param {string} path - 原始文件路径
 * @returns {string} - 格式化后的路由路径
 */
function extractRoutePath(path) {
  
  console.log("路径处理前path", path);
  // 匹配 /docs/ 之后的部分，并移除 .md 扩展名

  const match = path.match(/(\/docs\/.*?)(?=\.md$)/);
  console.log("1路径处理后path", match);
  if (match && match[1]) {
    return match[1];
  }
  

  // 备选方案：移除不必要的路径前缀
  return path
    .replace(/^.*?\/docs\//, '/') // 移除 /docs/ 之前的所有部分
    .replace(/(\.md|\.html)$/, ''); // 移除扩展名
}

/**
 * 格式化显示名称
 * @param {string} name - 原始文件名
 * @returns {string} - 格式化后的显示名称
 */
function formatDisplayName(name) {
  return name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/\.md$/, '');
}



/**
 * 获取指定目录下的Markdown文件列表
 * @param {string} dirPath - 目录路径，默认为当前目录 '.'
 * @param {Object} options - 配置选项
 * @param {Array<string>} options.exclude - 要排除的文件名列表，默认排除 'index.md'
 * @param {Function} options.customFilter - 自定义过滤函数
 * @param {Function} options.customMap - 自定义映射函数
 * @returns {Promise<Array>} - 返回处理后的文件列表
 */
export function getMarkdownFiles(MapName = ".", options = {}) {
  // 默认选项
  const defaultOptions = {
    exclude: ["index.md"],
    customFilter: null,
    customMap: null,
  };
  console.log("G MapName", MapName);
  console.log("G options", options);

  // 合并选项
  const mergedOptions = { ...defaultOptions, ...options };
  console.log("mergedOptions", mergedOptions);

  // 定义硬编码的路径映射
  const mdFilesMap = {
    ".": import.meta.glob("../../*.md"),
    前端开发小技巧: import.meta.glob(
      "../../docs/Front-end/前端开发小技巧/*.md"
    ),
    前端工程化: import.meta.glob("../../docs/Front-end/前端工程化/*.md"),

    // 可以根据需要添加更多的预定义路径
  };

  // 获取指定目录的文件
  console.log("获取前的MapName", MapName);

  const mdFiles = mdFilesMap[MapName] || {};
  console.log("mdFiles", mdFiles);

  // 处理文件列表
  const fileList = Object.keys(mdFiles)
    // 应用默认过滤 - 排除指定文件
    .filter((path) => {
      const fileName = path.split("/").pop();
      return !mergedOptions.exclude.includes(fileName);
    })
    // 应用自定义过滤（如果有）
    .filter((path) =>
      mergedOptions.customFilter ? mergedOptions.customFilter(path) : true
    )
    // 应用默认映射 - 提取文件名和构建路由
    .map((path) => {
      // 提取文件名（不含路径和扩展名）
      const fileNameWithExt = path.split("/").pop();
      const name = fileNameWithExt.replace(/\.md$/, "");
      // 构建路由路径

      const route = extractRoutePath(path);

      return {
        name,
        route,
        // 添加显示名称（中文友好的名称）
        displayName: formatDisplayName(name),
      };
    })

  return fileList;
}

/**
 * 在组件中使用的获取Markdown文件列表的辅助函数
 * @param {import('vue').Ref} articlesRef - Vue ref对象，用于存储文件列表
 * @param {string} MapName - 映射路径的别名，默认为当前目录 '.'
 * @param {Object} options - 配置选项，同getMarkdownFiles的options
 */
export function useMarkdownFiles(articlesRef, MapName = '.', options = {}) {
  // 获取文件列表
  console.log("刚传递的MapName", MapName);
  console.log("刚传递的articlesRef", articlesRef);  

  console.log("刚传递的options",  options);

  const fileList = getMarkdownFiles(MapName, options);

  // 更新文章列表
  articlesRef.value = fileList;

  return fileList;
}
