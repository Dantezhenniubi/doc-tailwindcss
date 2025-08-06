// 引入path模块, 用于处理文件路径, 例如获取文件名, 扩展名等
import path from 'node:path';
// 引入fs模块, 用于处理文件系统, 例如读取文件, 写入文件等
import fs from 'node:fs';

// 文件根目录
const DIR_PATH = path.resolve();
// 白名单，过滤不是文章的文件和文件夹
const WHITE_LIST = ['index.md', '.vitepress', 'node_modules', '.idea', 'assets'];

// 最大递归深度限制，防止栈溢出
const MAX_RECURSION_DEPTH = 10;

// 判断是否是文件夹
const isDirectory = (path) => {
  try {
    return fs.lstatSync(path).isDirectory();
  } catch {
    return false;
  }
};

// 取差集（在arr1中但不在arr2中的元素）
const getDifference = (arr1, arr2) => {
  // 对于小型数组，直接使用filter和includes即可
  if (arr2.length < 10) {
    return arr1.filter((item) => !arr2.includes(item));
  }

  // 对于较大的数组，使用Set提高查找效率
  const set2 = new Set(arr2);
  return arr1.filter((item) => !set2.has(item));
};

// 检查路径是否包含中文字符
const containsChinese = (str) => /[\u4e00-\u9fa5]/.test(str);

// 规范化路径，确保中文路径能够正确处理
const normalizePath = (pathStr) => {
  // 检查是否包含中文
  if (containsChinese(pathStr)) {
    // 在Windows系统中，确保路径分隔符统一
    return pathStr.replace(/\//g, path.sep);
  }
  return pathStr;
};

/**
 * 递归获取目录结构
 * @param {Array} files - 文件列表
 * @param {string} dirPath - 目录路径
 * @param {string} pathname - URL路径名
 * @param {number} depth - 当前递归深度
 * @param {Array} blacklist - 黑名单数组
 * @returns {Array} - 目录结构数组
 */
function geList(files, dirPath, pathname, depth = 0, blacklist = []) {
  // 递归深度限制
  if (depth > MAX_RECURSION_DEPTH) {
    return [];
  }

  // 存放结果
  const res = [];

  // 开始遍历files
  for (const item of files) {
    try {
      // 拼接目录
      const itemPath = path.join(dirPath, item);

      // 判断是否是文件夹
      const isDir = isDirectory(itemPath);
      if (isDir) {
        // 如果是文件夹，读取之后作为下一次递归参数
        try {
          const subFiles = fs.readdirSync(itemPath);
          // 对子目录也应用黑名单过滤
          const combinedBlacklist = [...WHITE_LIST, ...blacklist];
          const filteredSubFiles = getDifference(subFiles, combinedBlacklist);

          // 处理子目录路径，确保URL格式正确
          const subDirPath = `${pathname}/${item}`.replace(/\\/g, '/');

          res.push({
            text: item, // 文件夹名称
            collapsible: true, // 可折叠
            items: geList(filteredSubFiles, itemPath, subDirPath, depth + 1, blacklist),
          });
        } catch {
          // 静默处理子目录读取错误
        }
      } else {
        // 获取文件扩展名
        const suffix = path.extname(item);

        if (suffix !== '.md') {
          // 不是md文件，跳过
          continue;
        }
        // 直接获取不含扩展名的文件名
        const name = path.basename(item, suffix);

        // 处理链接路径，确保URL格式正确
        const linkPath = `${pathname}/${name}`.replace(/\\/g, '/');

        // 添加到结果数组
        res.push({
          text: name,
          link: linkPath,
        });
      }
    } catch {
      // 静默处理单个文件/文件夹的错误
    }
  }

  return res;
}

/**
 * 生成侧边栏配置
 * @param {string} pathname - 路径名
 * @param {Array} blacklist - 黑名单数组，指定要过滤的文件和文件夹名称（可选）
 * @returns {Array} - 侧边栏配置数组
 */
export const set_sidebar = (pathname, blacklist = []) => {
  try {
    // 规范化路径
    const normalizedPath = normalizePath(pathname);

    // 获取pathname的路径
    const dirPath = path.join(DIR_PATH, normalizedPath);

    // 检查目录是否存在
    if (!fs.existsSync(dirPath)) {
      return [];
    }

    // 读取pathname下的所有文件和文件夹
    const files = fs.readdirSync(dirPath);

    // 过滤掉白名单和黑名单中的文件和文件夹
    const combinedBlacklist = [...WHITE_LIST, ...blacklist];
    const filterItems = getDifference(files, combinedBlacklist);

    return geList(filterItems, dirPath, pathname, 0, blacklist);
  } catch {
    // 发生错误时返回空数组
    return [];
  }
};

/**
 * 智能侧边栏配置生成器
 * 根据路径类型自动决定配置方式：
 * - 主路径（如 "/DailyRecord/index"）：直接导航到index.md文件
 * - 子路径（如 "/DailyRecord/开发记录/"）：列出路径下所有md文件
 *
 * @param {string} text - 显示文本
 * @param {string} pathname - 路径名
 * @param {Array} blacklist - 黑名单数组，指定要过滤的文件和文件夹名称（可选）
 * @returns {Object} - 侧边栏配置对象
 */
export const set_sidebar_smart = (text, pathname, blacklist = []) => {
  try {
    const normalizedPath = normalizePath(pathname);
    const dirPath = path.join(DIR_PATH, normalizedPath);

    if (!fs.existsSync(dirPath)) {
      console.warn(`路径不存在: ${dirPath}`);
      return { text, items: [] };
    }

    // 检查是否是主路径（以/index结尾）
    if (pathname.endsWith('/index')) {
      // 主路径，直接返回链接到index.md
      return {
        text,
        link: pathname.replace(/\\/g, '/'),
      };
    } else {
      // 子路径，返回该路径下的所有md文件
      return {
        text,
        items: set_sidebar(pathname, blacklist),
      };
    }
  } catch (error) {
    console.error(`生成智能侧边栏配置时出错:`, error);
    return { text, items: [] };
  }
};

/**
 * 生成完整的侧边栏配置对象
 * 支持多个路径的侧边栏配置
 *
 * @param {Array} configs - 配置数组，每个元素包含 {mainPath, items}
 * @returns {Object} - 完整的侧边栏配置对象
 */
export const create_sidebar_config = (configs) => {
  const sidebarConfig = {};

  for (const config of configs) {
    const { mainPath, items } = config;
    sidebarConfig[mainPath] = items.map((item) => set_sidebar_smart(item.text, item.path));
  }

  return sidebarConfig;
};
