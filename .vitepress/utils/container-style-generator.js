// container-style-generator.js
// 用于根据容器配置生成CSS样式，与markdown-container.js配合

import { getContainerConfigs } from './container-config.js';

/**
 * 生成容器样式
 * @returns {string} 生成的CSS样式字符串
 */
export function generateContainerStyles() {
  const configs = getContainerConfigs();
  let styles = '';

  // 基础样式
  styles += `

/* 避免布局偏移 */
iconify-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
}

/* 自定义容器图标样式 */
:root .container-icon {
  margin-right: 0.5rem;
  display: inline-flex;
  align-items: center;
}

/* 自定义容器样式 */
:root .custom-block {
  margin: 1rem 0;
  border-left-width: 0.25rem;
  border-left-style: solid;
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  overflow-x: auto;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:root .custom-block-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}
`;

  // 为每个容器生成特定样式
  for (const [name, config] of Object.entries(configs)) {
    if (config.colors) {
      styles += `
/* ${config.defaultTitle || name}容器 */
:root .custom-block.${name} {
  background-color: ${config.colors.bg} !important;
  border-color: ${config.colors.border} !important;
}

:root .custom-block.${name} .custom-block-title {
  color: ${config.colors.title} !important;
}

/* 黑暗模式下的${config.defaultTitle || name}容器 */
.dark .custom-block.${name} {
  background-color: ${config.colors.bgDark} !important;
  border-color: ${config.colors.borderDark} !important;
}

.dark .custom-block.${name} .custom-block-title {
  color: ${config.colors.titleDark} !important;
}

.dark .custom-block.${name} {
  color: ${config.colors.textDark} !important;
}
`;
    }
  }

  return styles;
}

/**
 * 将生成的样式写入文件
 * @param {string} filePath 文件路径
 * @param {Function} writeFile 写入文件的函数
 */
export async function writeContainerStyles(filePath, writeFile) {
  const styles = generateContainerStyles();
  await writeFile(filePath, styles);
}
