// markdown-container.js
// 将Iconify图标库和markdown-it-container结合
// 用于创建带有Iconify图标的自定义容器
import { getContainerConfigs } from './container-config.js';

/**
 * 创建带有Iconify图标的自定义容器
 * @param {Object} options 配置选项
 * @param {string} options.name 容器名称
 * @param {string} options.defaultTitle 默认标题
 * @param {string} options.iconPrefix Iconify图标前缀
 * @returns {Function} markdown-it插件函数
 */
export function createIconContainer(options) {
  const {
    name,
    defaultTitle = '',
    iconPrefix = 'tabler:'
  } = options;

  return async (md) => {
    const container = await import('markdown-it-container');
    
    md.use(container.default, name, {
      validate(params) {
        return params.trim().match(new RegExp(`^${name}\\s*(.*)$`));
      },
      render(tokens, idx) {
        const token = tokens[idx];
        
        if (token.nesting === 1) {
          // 开始标签
          const match = token.info.trim().match(new RegExp(`^${name}\\s*(.*)$`));
          const title = match && match[1] ? match[1] : defaultTitle;
          const iconName = options.icon ? `${iconPrefix}${options.icon}` : '';
          
          const iconHtml = iconName 
            ? `<span class="container-icon"><iconify-icon icon="${iconName}"></iconify-icon></span>` 
            : '';
          
          return `<div class="custom-block ${name}">
            <p class="custom-block-title">
              ${iconHtml}
              ${md.utils.escapeHtml(title)}
            </p>
          `;
        } else {
          // 结束标签
          return '</div>\n';
        }
      }
    });
  };
}

/**
 * 创建多种带有Iconify图标的容器
 * @param {Object} [containers] 容器配置对象，如果不提供则使用默认配置
 * @returns {Function} 配置函数
 */
export function createIconContainers(containers) {
  return async (md) => {
    // 如果没有提供容器配置，则使用默认配置
    const containerConfigs = containers || getContainerConfigs();
    
    for (const [name, config] of Object.entries(containerConfigs)) {
      const containerPlugin = createIconContainer({
        name,
        defaultTitle: config.defaultTitle || '',
        icon: config.icon || '',
        iconPrefix: config.iconPrefix || 'tabler:'
      });
      
      await containerPlugin(md);
    }
  };
}