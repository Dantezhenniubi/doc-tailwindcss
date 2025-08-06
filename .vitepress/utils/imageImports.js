/**
 * 简化版图片导入工具
 * 只需传入路径和文件名即可查找匹配的图片
 * 支持在VitePress项目中方便地引用图片资源
 *
 * @module imageImports
 * @example
 * // 在Vue组件中使用
 * import { getImage } from '../utils/imageImports';
 * const avatar = getImage('DailyRecord/assets', '头像图片');
 */

// 预定义支持的图片目录映射
// 注意：Vite要求import.meta.glob的参数必须是字符串字面量
const IMAGE_DIRECTORIES = {
  'DailyRecord/assets': import.meta.glob('../../DailyRecord/assets/*.{jpg,png,svg}', {
    eager: true,
    import: 'default',
  }),
  'public/assets': import.meta.glob('../../public/assets/*.{jpg,png,svg}', {
    eager: true,
    import: 'default',
  }),
  // 可以在这里添加更多目录
};

/**
 * 获取所有已注册的图片目录
 * @returns {string[]} 已注册目录的名称列表
 */
const getRegisteredDirectories = () => Object.keys(IMAGE_DIRECTORIES);

/**
 * 获取指定目录下的图片
 * @param {string} dirPath - 图片所在目录的路径，例如 'DailyRecord/assets'
 * @param {string} fileName - 图片文件名（不含扩展名）
 * @param {string|string[]} [extensions] - 可选的文件扩展名（不含点，如'jpg'或['jpg','png']）
 * @returns {string|null} 图片URL或null（如果未找到）
 */
const getImage = (dirPath, fileName, extensions) => {
  try {
    // 根据dirPath选择正确的图片集合
    const images = IMAGE_DIRECTORIES[dirPath];

    // 检查目录是否受支持
    if (!images) {
      console.warn(`不支持的图片目录: "${dirPath}"`);
      return null;
    }

    // 将extensions转换为数组格式，方便处理
    const extensionsArray = extensions
      ? Array.isArray(extensions)
        ? extensions
        : [extensions]
      : [];

    // 提取文件名和扩展名的正则表达式
    const fileNameRegex = /\/([^/]+)\.([^.]+)$/;

    // 查找匹配文件名的图片
    for (const [path, module] of Object.entries(images)) {
      // 从路径中提取文件名和扩展名
      const match = path.match(fileNameRegex);
      if (!match) continue;

      const [, imgFileName, imgExtension] = match;

      // 如果文件名匹配且扩展名符合要求，返回图片URL
      if (
        imgFileName === fileName &&
        (extensionsArray.length === 0 || extensionsArray.includes(imgExtension))
      ) {
        return module;
      }
    }

    // 未找到匹配的图片，
    const extensionInfo = extensions
      ? `(扩展名: ${Array.isArray(extensions) ? extensions.join(',') : extensions})`
      : '';
    // 使用开发环境下更详细的日志，生产环境下简化日志
    if (process.env.NODE_ENV === 'development') {
      console.warn(`图片 "${fileName}"${extensionInfo} 在目录 "${dirPath}" 中未找到`);
    } else {
      console.warn(`图片未找到: ${dirPath}/${fileName}`);
    }
    return null;
  } catch (error) {
    console.error(`导入图片时出错: ${error.message}`);
    return null;
  }
};

/**
 * 注册新的图片目录
 * 注意：此函数仅在开发环境下使用，不会影响生产环境
 * 由于Vite的限制，此函数不会动态添加新的import.meta.glob路径
 *
 * @param {string} dirName - 目录名称标识符
 * @param {Object} imagesObject - 通过import.meta.glob获取的图片对象
 * @returns {boolean} 注册是否成功
 */
const registerImageDirectory = (dirName, imagesObject) => {
  // 参数验证
  if (typeof dirName !== 'string' || !dirName) {
    console.error('目录名称必须是非空字符串');
    return false;
  }

  if (!imagesObject || typeof imagesObject !== 'object') {
    console.error('图片对象必须是有效的对象');
    return false;
  }

  // 添加到目录映射中
  IMAGE_DIRECTORIES[dirName] = imagesObject;
  return true;
};

/**
 * 检查图片是否存在于指定目录
 * @param {string} dirPath - 图片所在目录的路径
 * @param {string} fileName - 图片文件名（不含扩展名）
 * @param {string|string[]} [extensions] - 可选的文件扩展名
 * @returns {boolean} 图片是否存在
 */
const hasImage = (dirPath, fileName, extensions) => {
  return getImage(dirPath, fileName, extensions) !== null;
};

/**
 * 获取指定目录下所有可用的图片
 * @param {string} dirPath - 图片所在目录的路径
 * @returns {Object|null} 包含所有图片的对象，键为文件名，值为图片URL；如果目录不存在则返回null
 */
const getAllImages = (dirPath) => {
  const images = IMAGE_DIRECTORIES[dirPath];
  if (!images) {
    console.warn(`不支持的图片目录: "${dirPath}"`);
    return null;
  }

  const result = {};
  const fileNameRegex = /\/([^/]+)\.([^.]+)$/;

  for (const [path, module] of Object.entries(images)) {
    const match = path.match(fileNameRegex);
    if (match) {
      const [, imgFileName] = match;
      result[imgFileName] = module;
    }
  }

  return result;
};

// 导出函数
export { getImage, registerImageDirectory, getRegisteredDirectories, hasImage, getAllImages };
