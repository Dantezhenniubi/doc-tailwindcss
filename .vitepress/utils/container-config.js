// container-config.js
// 容器配置文件，用于集中管理所有自定义容器的配置

/**
 * 容器配置对象
 * 每个容器配置包含：
 * - defaultTitle: 默认标题
 * - icon: 图标名称（不含前缀）
 * - iconPrefix: iconify图标库图标前缀，默认为'tabler:'
 * - colors: 自定义颜色配置（可选）
 */
export const containerConfigs = {
  // 信息容器
  info: {
    defaultTitle: '信息',
    icon: 'info-circle',
    iconPrefix: 'tabler:',
    colors: {
      bg: '#e6f7ff',
      bgDark: '#111d2c',
      border: '#1890ff',
      borderDark: '#177ddc',
      title: '#0050b3',
      titleDark: '#40a9ff',
      textDark: '#a6d8ff',
    },
  },

  // 提示容器
  tip: {
    defaultTitle: '提示',
    icon: 'bulb',
    iconPrefix: 'tabler:',
    colors: {
      bg: '#f6ffed',
      bgDark: '#162312',
      border: '#52c41a',
      borderDark: '#49aa19',
      title: '#237804',
      titleDark: '#73d13d',
      textDark: '#b7eb8f',
    },
  },

  // 警告容器
  warning: {
    defaultTitle: '警告',
    icon: 'alert-triangle',
    iconPrefix: 'tabler:',
    colors: {
      bg: '#fffbe6',
      bgDark: '#2b2111',
      border: '#faad14',
      borderDark: '#d89614',
      title: '#ad6800',
      titleDark: '#ffc53d',
      textDark: '#ffe58f',
    },
  },

  // 危险容器
  danger: {
    defaultTitle: '危险',
    icon: 'alert-octagon',
    iconPrefix: 'tabler:',
    colors: {
      bg: '#fff2f0',
      bgDark: '#2a1215',
      border: '#ff4d4f',
      borderDark: '#d32029',
      title: '#a8071a',
      titleDark: '#ff7875',
      textDark: '#ffccc7',
    },
  },

  // 笔记容器
  note: {
    defaultTitle: '笔记',
    icon: 'note',
    iconPrefix: 'tabler:',
    colors: {
      bg: '#f9f0ff',
      bgDark: '#1f1a29',
      border: '#722ed1',
      borderDark: '#642ab5',
      title: '#531dab',
      titleDark: '#9254de',
      textDark: '#efdbff',
    },
  },

  // 成功容器
  success: {
    defaultTitle: '成功',
    icon: 'circle-check',
    iconPrefix: 'tabler:',
    colors: {
      bg: '#f0fff0',
      bgDark: '#162312',
      border: '#52c41a',
      borderDark: '#49aa19',
      title: '#135200',
      titleDark: '#73d13d',
      textDark: '#b7eb8f',
    },
  },

  // 代码容器
  CTcode: {
    defaultTitle: '代码',
    icon: 'code',
    iconPrefix: 'tabler:',
    colors: {
      bg: '#f5f5f5',
      bgDark: '#1f1f1f',
      border: '#8c8c8c',
      borderDark: '#6b6b6b',
      title: '#262626',
      titleDark: '#d9d9d9',
      textDark: '#f0f0f0',
    },
  },
};

/**
 * 获取所有容器配置
 * @returns {Object} 容器配置对象
 */
export function getContainerConfigs() {
  return containerConfigs;
}

/**
 * 获取指定容器的配置
 * @param {string} name 容器名称
 * @returns {Object|null} 容器配置对象，如果不存在则返回null
 */
export function getContainerConfig(name) {
  return containerConfigs[name] || null;
}

/**
 * 添加新的容器配置
 * @param {string} name 容器名称
 * @param {Object} config 容器配置
 */
export function addContainerConfig(name, config) {
  containerConfigs[name] = config;
}
