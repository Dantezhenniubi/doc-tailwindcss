// 黑名单配置示例
// 展示如何在导航栏和侧边栏中使用黑名单功能

// 定义常用的黑名单
export const COMMON_BLACKLIST = [
  'draft.md', // 草稿文件
  'temp.md', // 临时文件
  'private.md', // 私有文件
  'TODO.md', // 待办事项
  'assets', // 资源文件夹
  'images', // 图片文件夹
  'temp', // 临时文件夹
  'backup', // 备份文件夹
  '.DS_Store', // macOS系统文件
  'Thumbs.db', // Windows缩略图文件
];

// 开发相关黑名单
export const DEV_BLACKLIST = [
  'test.md', // 测试文件
  'debug.md', // 调试文件
  'experimental.md', // 实验性文件
  'wip.md', // 进行中的工作
];

// 文档相关黑名单
export const DOC_BLACKLIST = [
  'README.md', // 通常不需要在导航中显示
  'CHANGELOG.md', // 更新日志
  'LICENSE.md', // 许可证文件
  'CONTRIBUTING.md', // 贡献指南
];

// 使用示例：
// 在config.mjs中使用黑名单
/*
import { COMMON_BLACKLIST, DEV_BLACKLIST } from './utils/blacklist-example.mjs';

// 导航栏配置示例
const nav = [
    {
        text: '更多',
        items: [
            // 使用黑名单过滤不想显示的文件
            set_nav_smart("VitePress搭建相关", "/others/vitepress搭建相关", COMMON_BLACKLIST),
            set_nav_smart("写文章相关", "/others/写文章相关", [...COMMON_BLACKLIST, ...DEV_BLACKLIST]),
        ],
    },
];

// 侧边栏配置示例
const sidebar = {
    "/DailyRecord/index": [
        // 过滤掉草稿和临时文件
        set_sidebar_smart("开发记录", "/DailyRecord/开发记录/", ['draft.md', 'temp.md']),
        set_sidebar_smart("实习记录", "/DailyRecord/实习记录/", COMMON_BLACKLIST),
    ],
};
*/

// 动态黑名单生成器
export const createBlacklist = (options = {}) => {
  const {
    includeDrafts = false,
    includeTemp = false,
    includePrivate = false,
    includeAssets = true,
    customBlacklist = [],
  } = options;

  let blacklist = [...customBlacklist];

  if (!includeDrafts) {
    blacklist.push('draft.md', 'drafts');
  }

  if (!includeTemp) {
    blacklist.push('temp.md', 'temp', 'tmp');
  }

  if (!includePrivate) {
    blacklist.push('private.md', 'private');
  }

  if (includeAssets) {
    blacklist.push('assets', 'images', 'img', 'static');
  }

  return blacklist;
};

// 使用动态黑名单的示例
/*
const myBlacklist = createBlacklist({
    includeDrafts: false,  // 不显示草稿
    includeTemp: false,    // 不显示临时文件
    includePrivate: false, // 不显示私有文件
    includeAssets: true,   // 过滤资源文件夹
    customBlacklist: ['old.md', 'deprecated.md'] // 自定义黑名单
});

set_nav_smart("我的文档", "/docs", myBlacklist);
*/
