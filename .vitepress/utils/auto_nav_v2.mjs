// auto_nav_v2.mjs - 简化版导航栏生成工具
// 根据路径下文件夹内容自动判断导航方式：
// - 有index.md存在时: 路径只导航到文件夹，自动加载index.md作为主页
// - 无index.md时: 列出所有md文件作为下拉菜单项

import path from 'node:path';
import fs from 'node:fs';

// 文件根目录
const DIR_PATH = path.resolve();

// 白名单，过滤不是文章的文件和文件夹
const WHITE_LIST = ['index.md', '.vitepress', 'node_modules', '.idea', 'assets', 'public'];

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
  if (arr2.length < 10) {
    return arr1.filter((item) => !arr2.includes(item));
  }

  const set2 = new Set(arr2);
  return arr1.filter((item) => !set2.has(item));
};

// 检查路径是否包含中文字符
const containsChinese = (str) => /[\u4e00-\u9fa5]/.test(str);

// 规范化路径，确保中文路径能够正确处理
const normalizePath = (pathStr) => {
  if (containsChinese(pathStr)) {
    return pathStr.replace(/\//g, path.sep);
  }
  return pathStr;
};

/**
 * 智能导航栏配置生成器
 * 根据指定路径下是否存在index.md文件来智能地生成导航配置：
 * - 如果存在index.md，则返回一个直接链接
 * - 如果不存在，则返回一个包含子项的下拉菜单
 *
 * @param {string} text - 显示文本
 * @param {string} pathname - 路径名
 * @param {Array} blacklist - 黑名单数组，指定要过滤的文件和文件夹名称（可选）
 * @returns {Object} - 导航栏配置对象
 */
export const set_nav_smart = (text, pathname, blacklist = []) => {
  try {
    const normalizedPath = normalizePath(pathname);
    const dirPath = path.join(DIR_PATH, normalizedPath);

    if (!fs.existsSync(dirPath)) {
      console.warn(`路径不存在: ${dirPath}`);
      return { text, items: [] };
    }

    const files = fs.readdirSync(dirPath);
    const hasIndexFile = files.includes('index.md');

    if (hasIndexFile) {
      // 有index.md，返回直接链接
      return {
        text,
        link: `${pathname}/`,
      };
    } else {
      // 无index.md，返回下拉菜单
      return {
        text,
        items: set_nav_v2(pathname, blacklist),
      };
    }
  } catch (error) {
    console.error(`生成智能导航配置时出错:`, error);
    return { text, items: [] };
  }
};

/**
 * 生成符合VitePress限制的导航栏配置（最多两层嵌套）
 * 根据文件夹中是否存在index.md决定导航方式：
 * - 有index.md: 直接链接到文件夹（自动加载index.md）
 * - 无index.md: 列出所有md文件作为下拉菜单
 *
 * @param {string} pathname - 路径名
 * @param {Array} blacklist - 黑名单数组，指定要过滤的文件和文件夹名称（可选）
 * @returns {Array} - 导航栏配置数组
 */
export const set_nav_v2 = (pathname, blacklist = []) => {
  try {
    const normalizedPath = normalizePath(pathname);
    const dirPath = path.join(DIR_PATH, normalizedPath);

    if (!fs.existsSync(dirPath)) {
      console.warn(`路径不存在: ${dirPath}`);
      return [];
    }

    const files = fs.readdirSync(dirPath);
    // 合并白名单和黑名单进行过滤
    const combinedBlacklist = [...WHITE_LIST, ...blacklist];
    const filteredItems = getDifference(files, combinedBlacklist);
    const result = [];

    // 检查当前目录是否有index.md文件
    const hasRootIndexFile = files.includes('index.md');

    // 如果当前目录有index.md，直接返回指向该目录的链接
    if (hasRootIndexFile) {
      return [
        {
          text: '查看全部',
          link: `${pathname}/`,
        },
      ];
    }

    for (const item of filteredItems) {
      try {
        const itemPath = path.join(dirPath, item);
        const isDir = isDirectory(itemPath);

        if (isDir) {
          // 处理文件夹
          const subFiles = fs.readdirSync(itemPath);
          const subDirPath = `${pathname}/${item}`.replace(/\\/g, '/');
          const hasIndexFile = subFiles.includes('index.md');

          if (hasIndexFile) {
            // 有index.md，创建直接链接到文件夹
            result.push({
              text: item,
              link: `${subDirPath}/`,
            });
          } else {
            // 无index.md，创建下拉菜单列出所有md文件
            const subItems = [];

            for (const subFile of subFiles) {
              const subFilePath = path.join(itemPath, subFile);
              const isSubDir = isDirectory(subFilePath);

              if (!isSubDir && path.extname(subFile) === '.md') {
                // 处理.md文件
                const name = path.basename(subFile, '.md');
                subItems.push({
                  text: name,
                  link: `${subDirPath}/${name}`.replace(/\\/g, '/'),
                });
              }
            }

            if (subItems.length > 0) {
              result.push({
                text: item,
                items: subItems,
              });
            }
          }
        } else if (path.extname(item) === '.md' && item !== 'index.md') {
          // 处理根目录下的.md文件（排除index.md）
          const name = path.basename(item, '.md');
          result.push({
            text: name,
            link: `${pathname}/${name}`.replace(/\\/g, '/'),
          });
        }
      } catch (error) {
        console.warn(`处理项目时出错: ${item}`, error);
      }
    }

    return result;
  } catch (error) {
    console.error(`生成导航栏配置时出错:`, error);
    return [];
  }
};

/**
 * 生成扁平化的导航栏配置（将所有文件夹展平为一级菜单）
 * 适用于需要简单导航结构的场景
 *
 * @param {string} pathname - 路径名
 * @returns {Array} - 导航栏配置数组
 */
export const set_nav_flat = (pathname) => {
  try {
    const normalizedPath = normalizePath(pathname);
    const dirPath = path.join(DIR_PATH, normalizedPath);

    if (!fs.existsSync(dirPath)) {
      console.warn(`路径不存在: ${dirPath}`);
      return [];
    }

    const result = [];

    // 递归收集所有可访问的页面
    const collectAllPages = (currentPath, currentUrlPath) => {
      try {
        const files = fs.readdirSync(currentPath);
        const filteredFiles = getDifference(files, WHITE_LIST);

        for (const file of filteredFiles) {
          const filePath = path.join(currentPath, file);
          const isFileDir = isDirectory(filePath);

          if (isFileDir) {
            const subUrlPath = `${currentUrlPath}/${file}`.replace(/\\/g, '/');
            const subFiles = fs.readdirSync(filePath);
            const hasIndexFile = subFiles.includes('index.md');

            if (hasIndexFile) {
              result.push({
                text: file,
                link: `${subUrlPath}/`,
              });
            }
          } else {
            const suffix = path.extname(file);
            if (suffix === '.md' && file !== 'index.md') {
              const name = path.basename(file, suffix);
              result.push({
                text: name,
                link: `${currentUrlPath}/${name}`.replace(/\\/g, '/'),
              });
            }
          }
        }
      } catch (error) {
        console.warn(`收集页面时出错:`, error);
      }
    };

    collectAllPages(dirPath, pathname);

    return result;
  } catch (error) {
    console.error(`生成扁平导航栏配置时出错:`, error);
    return [];
  }
};
