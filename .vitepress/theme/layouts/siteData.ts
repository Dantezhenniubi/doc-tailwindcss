// 存储导航页展示的站点siteData.ts
interface Site {
  name: string;
  desc?: string;
  url: string;
  iconName: string;
}

interface Category {
  name: string;
  sites: Site[];
}

interface CategoryMap {
  [key: string]: Category[];
}

export const categoryMap: CategoryMap = {
  前端: [
    {
      name: 'Vue 生态',
      sites: [
        {
          name: 'Vue',
          desc: '渐进式 JavaScript 框架',
          url: 'https://cn.vuejs.org/',
          iconName: 'devicon:vuejs-wordmark',
        },
        {
          name: 'Vite',
          desc: '下一代前端构建工具',
          url: 'https://cn.vite.dev/',
          iconName: 'vscode-icons:file-type-vite',
        },
        {
          name: 'Vue Router',
          desc: 'Vue.js 官方路由管理器',
          url: 'https://router.vuejs.org',
          iconName: 'vscode-icons:file-type-vue',
        },
        {
          name: 'Pinia',
          desc: 'Vue 官方状态管理库',
          url: 'https://pinia.vuejs.org',
          iconName: 'logos:pinia',
        },
        {
          name: 'VueUse',
          desc: 'Vue Composition 工具库',
          url: 'https://vueuse.org',
          iconName: 'logos:vueuse',
        },
        {
          name: 'Volar',
          desc: 'Vue 官方 VSCode 插件',
          url: 'https://marketplace.visualstudio.com/items?itemName=Vue.volar',
          iconName: 'vscode-icons:file-type-vscode',
        },
      ],
    },
    {
      name: 'React 生态',
      sites: [
        {
          name: 'React',
          desc: '用于构建 Web 和原生交互界面的库',
          url: 'https://zh-hans.react.dev/',
          iconName: 'devicon:react-wordmark',
        },
        {
          name: 'Next.js',
          desc: 'React 全栈框架',
          url: 'https://nextjs.org',
          iconName: 'vscode-icons:file-type-next',
        },
        {
          name: 'React Router',
          desc: 'React 官方路由',
          url: 'https://reactrouter.com',
          iconName: 'logos:react-router',
        },
        {
          name: 'Zustand',
          desc: '轻量级 React 状态管理',
          url: 'https://zustand.docs.pmnd.rs',
          iconName: 'devicon:zustand',
        },
        {
          name: 'TanStack Query',
          desc: '异步状态管理库，以前叫React Query',
          url: 'https://tanstack.com/query/latest',
          iconName: 'logos:react-query-icon',
        },
      ],
    },
    {
      name: '静态站点框架',
      sites: [
        {
          name: 'VitePress',
          desc: 'VitePress 是一个静态站点生成器，基于 Vue 的文档站点生成工具。',
          url: 'https://vitepress.dev',
          iconName: 'simple-icons:vitepress',
        },
        {
          name: 'dumi',
          desc: '一款为组件开发场景而生的静态站点框架，与 father 一起为开发者提供一站式的组件开发体验，father 负责组件源码构建，而 dumi 负责组件开发及组件文档生成。',
          url: 'https://d.umijs.org/',
          iconName: '',
        },
        {
          name: 'Hexo',
          desc: '一个快速、简洁且高效的博客框架',
          url: 'https://hexo.io/zh-cn/',
          iconName: 'logos:hexo',
        },
        {
          name: 'Docusaurus',
          desc: '一个静态站点生成器，用于构建文档网站。',
          url: 'https://docusaurus.io/zh-CN',
          iconName: 'logos:docusaurus-plain',
        },
        {
          name: 'Astro',
          desc: 'Astro 是一个现代的静态站点生成器（SSG）和服务器端渲染（SSR）框架，专为构建快速、以内容为中心的网站而设计。岛屿架构允许你在同一页面中混合使用不同的前端框架（React、Vue、Svelte等）还有零 JavaScript 默认、服务器优先渲染、内容集中、全栈框架能力',
          url: 'https://docs.astro.build/zh-cn/getting-started/',
          iconName: 'logos:astro',
        },
      ],
    },
    {
      name: 'CSS 相关',
      sites: [
        {
          name: 'Tailwindcss官方文档',
          desc: '教你怎么使用Tailwindcss',
          url: 'https://tailwindcss.com/docs',
          iconName: 'devicon:tailwindcss',
        },
        {
          name: 'UnoCSS',
          desc: '即时原子化 CSS 引擎',
          url: 'https://unocss.dev',
          iconName: 'material-icon-theme:unocss',
        },
        {
          name: 'PostCSS',
          desc: '用 JS 插件转换 CSS',
          url: 'https://postcss.org',
          iconName: 'logos:postcss',
        },
        {
          name: 'Sass',
          desc: 'CSS预处理器，成熟、稳定、强大的专业级 CSS 扩展语言',
          url: 'https://sass-lang.com',
          iconName: 'logos:sass',
        },
        {
          name: 'LightningCSS',
          desc: 'TailwindCSS V4底层使用的CSS预处理器',
          url: 'https://lightningcss.dev/',
          iconName: '',
        },
        {
          name: 'Less.js',
          desc: '是 CSS 的一个向后兼容的语言扩展。',
          url: 'https://lesscss.org/',
          iconName: '',
        },
        {
          name: 'PurgeCSS',
          desc: '自动移除未用 CSS',
          url: 'https://purgecss.com',
          iconName: 'vscode-icons:file-type-purgecss',
        },
      ],
    },
    {
      name: '组件库',
      sites: [
        {
          name: 'Element Plus',
          url: 'https://element-plus.org',
          desc: 'Element Plus 是一套 Vue 3.0 组件库，为 Web 应用提供一套字节级轻量、可访问的组件。',
          iconName: 'logos:element',
        },
        {
          name: 'Ant Design Vue',
          desc: '企业级 UI 组件库',
          url: 'https://antdv.com',
          iconName: 'logos:ant-design',
        },
        {
          name: 'Naive UI',
          desc: 'Vue 3 组件库',
          url: 'https://www.naiveui.com',
          iconName: 'logos:naiveui',
        },
        {
          name: 'Bulma',
          desc: '一个免费开源轻量级 CSS 框架，与sass兼容良好，能使用class快速创建响应式布局',
          url: 'https://bulma.io/',
          iconName: 'logos:bulma',
        },
        {
          name: 'Arco Design Vue',
          desc: '字节跳动企业级设计系统',
          url: 'https://arco.design/vue',
          iconName: '',
        },
        {
          name: 'TDesign Vue',
          desc: '腾讯企业级设计系统',
          url: 'https://tdesign.tencent.com/vue/',
          iconName: '',
        },
      ],
    },
    {
      name: '教程文档',
      sites: [
        {
          name: 'Mdn Web Docs',
          url: 'https://developer.mozilla.org/zh-CN/docs/Web',
          desc: 'Mdn Web Docs 是一个开放、免费、可搜索的 Web 开发参考文档。',
          iconName: 'logos:mdn',
        },
        {
          name: 'Google Web Fundamentals',
          url: 'https://developers.google.com/web/fundamentals',
          desc: 'Google Web Fundamentals 是一个免费的、互动式的学习平台，为 Web 开发人员提供了关于 Web 平台的基础知识。',
          iconName: 'logos:google',
        },
      ],
    },
    {
      name: '实用插件/工具网站',
      sites: [
        {
          name: 'unplugin-icons',
          url: 'https://github.com',
          desc: '按需访问数千个图标作为组件。',
          iconName: 'logos:github',
        },
        {
          name: 'Shiki',
          url: 'https://shiki.style/',
          desc: '美观而强大的语法高亮器，vitepress底层使用',
          iconName: '',
        },
        {
          name: '全球性lighthouse评分',
          url: 'https://lighthouse-metrics.com/',
          desc: '一个用于评估网站性能的工具，提供全局和区域化的评分。',
          iconName: 'logos:google',
        },
        {
          name: 'Slidev',
          url: 'https://cn.sli.dev/guide/',
          desc: '一个为开发者设计的基于 Web 的幻灯片制作工具。它帮助您以 Markdown 的形式专注于编写幻灯片的内容，并制作出具有交互式演示功能的、高度可自定义的幻灯片。',
          iconName: 'logos:slidev',
        },
        {
          name: 'SVG Path Visualizer',
          url: 'https://svg-path-visualizer.netlify.app/',
          desc: '一个用于可视化 SVG 路径的工具。',
          iconName: 'logos:svg',
        },
      ],
    },
    {
      name: '动画库',
      sites: [
        {
          name: 'Animate.css',
          url: 'https://animate.style/',
          desc: '一个用于CSS的动画库，基于CSS3动画。',
          iconName: '',
        },
        {
          name: 'anime.js',
          url: 'https://animejs.com/',
          desc: 'A fast and versatile JavaScript library to animate。',
          iconName: '',
        },
        {
          name: 'GSAP',
          url: 'https://greensock.com/gsap/',
          desc: 'GSAP 是一个功能强大的 JavaScript 动画库。',
          iconName: 'logos:greensock',
        },
      ],
    },
    {
      name: '其它框架',
      sites: [
        {
          name: 'Tauri',
          url: 'https://tauri.app/zh-cn/',
          desc: '一个构建跨平台桌面应用程序的框架',
          iconName: 'logos:tauri',
        },
      ],
    },
  ],
  编程社区: [
    {
      name: '技术平台',
      sites: [
        {
          name: 'GitHub',
          desc: '全球最大的开源社区',
          url: 'https://github.com',
          iconName: 'logos:github',
        },
        {
          name: 'Stack Overflow',
          desc: '全球最大技术问答社区',
          url: 'https://stackoverflow.com',
          iconName: 'logos:stackoverflow-icon',
        },
        {
          name: 'V2EX',
          desc: '创意工作者社区',
          url: 'https://www.v2ex.com',
          iconName: 'simple-icons:v2ex',
        },
        {
          name: 'SegmentFault思否',
          desc: '中文技术问答社区',
          url: 'https://segmentfault.com',
          iconName: '',
        },
        {
          name: '掘金',
          desc: '中文技术社区',
          url: 'https://juejin.cn',
          iconName: 'simple-icons:juejin',
        },
        {
          name: 'CSDN',
          desc: '中文技术社区',
          url: 'https://blog.csdn.net',
          iconName: 'simple-icons:csdn',
        },
        {
          name: '程序员客栈',
          desc: '领先的程序员自由工作平台',
          url: 'https://www.proginn.com/',
          iconName: 'ant-design:code-outlined',
        },
        {
          name: 'leetcode力扣',
          desc: '一个专注于程序员技术分享的社区，提供最新的技术文章、教程、案例分析等内容。',
          url: 'https://www.leetcode.cn/',
          iconName: 'simple-icons:leetcode',
        },
        {
          name: '牛客网',
          desc: '一个帮助程序员成长的社区',
          url: 'https://www.nowcoder.com/',
          iconName: 'simple-icons:nowcoder',
        },
      ],
    },
    {
      name: '技术博客',
      sites: [
        {
          name: '茂茂物语',
          desc: '用vitepress搭建',
          url: 'https://fe-nav.netlify.app/',
          iconName: '',
        },
        {
          name: '犀木101',
          desc: '华中师范大学',
          url: 'https://muxi-studio.github.io/101/',
          iconName: '',
        },
      ],
    },
  ],
  设计: [
    {
      name: '素材',
      sites: [
        {
          name: 'Pixabay',
          desc: '令人惊叹的免版税图片和免版税素材',
          url: 'https://pixabay.com',
          iconName: 'simple-icons:pixabay',
        },
        {
          name: 'Unsplash',
          desc: '免费高清摄影图',
          url: 'https://unsplash.com',
          iconName: 'simple-icons:unsplash',
        },
      ],
    },
    {
      name: '图标库',
      sites: [
        {
          name: 'Iconify',
          url: 'https://iconify.design',
          desc: 'Iconify 是一个图标库，提供图标的 SVG 源代码，以及图标的图标库。',
          iconName: 'simple-icons:iconify',
        },
        {
          name: 'Iconfont',
          desc: '阿里巴巴矢量图标库',
          url: 'https://www.iconfont.cn/',
          iconName: 'simple-icons:icon',
        },
        {
          name: 'IcoMoon',
          desc: 'IcoMoon 是一个图标解决方案，提供三种主要服务：矢量图标包、IcoMoon 应用程序以及将图标托管为 SVG 或字体。',
          url: 'https://icomoon.io/',
          iconName: 'simple-icons:icomoon',
        },
        {
          name: 'Emoji',
          desc: 'Emoji 表情大全',
          url: 'https://www.emoji-cheat-sheet.com/',
          iconName: 'bi:emoji-kiss',
        },
        {
          name: 'Font Awesome',
          desc: 'Font Awesome 是一个开放源代码的图标库',
          url: 'https://fontawesome.com/',
          iconName: 'simple-icons:fontawesome',
        },
      ],
    },
    {
      name: 'UI 设计',
      sites: [
        {
          name: 'Figma',
          desc: 'Figma 是一个 UI 设计工具，用于创建、共享和 collisions 的设计。',
          url: 'https://figma.com',
          iconName: 'logos:figma',
        },
        {
          name: 'cssbuttons',
          desc: 'cssbuttons是一个收集了众多按钮设计的网站。',
          url: 'https://cssbuttons.io/o',
          iconName: '',
        },
      ],
    },
    {
      name: '配色',
      sites: [
        {
          name: 'Coolors',
          desc: '超级快速的调色板生成器，能快速生成一组配色。',
          url: 'https://coolors.co',
          iconName: 'arcticons:coolors',
        },
        {
          name: 'Adobe Color',
          desc: 'Adobe 的配色工具，能生成配色方案。',
          url: 'https://color.adobe.com',
          iconName: 'arcticons:adobe-photoshop-mix',
        },
      ],
    },
    {
      name: '字体',
      sites: [
        {
          name: 'Google Fonts',
          desc: '谷歌字体库，开源免费可商用',
          url: 'https://fonts.google.com/?lang=zh_Hans',
          iconName: 'simple-icons:googlefonts',
        },
        {
          name: 'Fontshare',
          desc: '由印度字体铸造公司 (ITF) 推出的一项免费字体服务,开源免费可商用',
          url: 'https://www.fontshare.com/',
          iconName: 'cil:font',
        },
      ],
    },
  ],
  开发工具: [
    {
      name: '静态托管/网站部署',
      sites: [
        {
          name: 'Netlify',
          desc: '使用 AI 或代码构建，立即部署。一个平台，满足您打造真实应用的一切需求。',
          url: 'https://app.netlify.com/',
          iconName: 'logos:netlify',
        },
        {
          name: 'JS Deliver',
          desc: 'JS Deliver 是一个免费的静态文件托管服务，支持 CDN 加速。',
          url: 'https://www.jsdelivr.com/?docs=gh',
          iconName: 'logos:jsdelivr',
        },
        {
          name: 'cdnjs',
          desc: 'cdnjs 是一个免费的静态文件托管服务，支持 CDN 加速。',
          url: 'https://cdnjs.com/',
          iconName: 'logos:cdnjs',
        },
      ],
    },
    {
      name: '图片处理',
      sites: [
        {
          name: 'TinyPNG',
          desc: 'TinyPNG 是一个用于压缩 PNG 图像的在线工具。',
          url: 'https://tinypng.com',
          iconName: 'noto-v1:panda',
        },
        {
          name: 'RemoveBG',
          desc: '一键去底图',
          url: 'https://www.remove.bg',
          iconName: 'vscode-icons:file-type-image',
        },
        {
          name: 'SVG在线转换',
          desc: '支持SVG与各类图片格式之间的在线相互转换',
          url: 'https://convertio.co/zh/svg-converter/',
          iconName: '',
        },
        {
          name: 'imagesTool在线图片处理',
          desc: '一款在线图片处理工具，支持图片裁剪、压缩、格式转换等功能',
          url: 'https://imagestool.com/zh_CN/',
          iconName: '',
        },
      ],
    },
    {
      name: '视频处理',
      sites: [
        {
          name: 'AVPress',
          desc: '在线压缩视频资源的工具网站。',
          url: 'https://avpress.zaps.dev/',
          iconName: '',
        },
      ],
    },
    {
      name: '数据处理',
      sites: [
        {
          name: 'TableConvert',
          desc: '实用的在线表格转换器，支持各种格式表格互转',
          url: 'https://tableconvert.com/zh-cn/',
          iconName: '',
        },
        {
          name: 'QuickType',
          desc: '将 JSON 转换为任何语言',
          url: 'https://quicktype.io',
          iconName: 'simple-icons:quicktype',
        },
        {
          name: 'QRCode Monkey',
          desc: '免费二维码生成器，将各种数据转成二维码',
          url: 'https://www.qrcode-monkey.com',
          iconName: 'mdi:qrcode',
        },
        {
          name: 'Carbon',
          desc: '代码截图美化',
          url: 'https://carbon.now.sh',
          iconName: 'devicon:carbon',
        },
      ],
    },
    {
      name: '导航网站',
      sites: [
        {
          name: '程序员盒子',
          desc: '一个完整的程序员导航网站',
          url: 'https://www.coderutil.com/',
          iconName: '',
        },
      ],
    },
  ],
  后端: [
    {
      name: '接口/测试',
      sites: [
        {
          name: 'Mock',
          desc: '模拟接口数据，生成随机数据，拦截 Ajax 请求',
          url: 'https://mockjs.com',
          iconName: 'material-icon-theme:folder-mock',
        },
        {
          name: 'Apifox',
          desc: 'Apifox 是一个 API 文档管理工具，支持 API 调试、测试、文档生成等功能。',
          url: 'https://www.apifox.com',
          iconName: 'logos:apifox',
        },
      ],
    },
    {
      name: '运维/部署/服务器',
      sites: [
        {
          name: '宝塔面板',
          desc: '宝塔面板是一个简单、易用的服务器运维管理面板，支持一键部署、网站管理、数据库管理、安全管理等功能。',
          url: 'https://www.bt.cn/',
          iconName: 'logos:bt',
        },
        {
          name: '青云存储',
          desc: '青云存储是一个基于对象存储的云存储服务，提供高可用、高可靠、高安全的存储解决方案。',
          url: 'https://www.qingcloud.com/',
          iconName: 'logos:qingcloud',
        },
        {
          name: 'Docker',
          desc: '容器化平台',
          url: 'https://www.docker.com',
          iconName: 'logos:docker-icon',
        },
      ],
    },
    {
      name: '数据库',
      sites: [
        {
          name: 'PostgreSQL',
          desc: 'PostgreSQL 是一个开放源码的关系型数据库管理系统',
          url: 'https://www.postgresql.org',
          iconName: 'logos:postgresql',
        },
      ],
    },
    {
      name: '框架',
      sites: [
        {
          name: 'Node.js',
          desc: 'JavaScript 运行时',
          url: 'https://nodejs.org',
          iconName: 'logos:nodejs-icon',
        },
        {
          name: 'Express',
          desc: 'Node.js 极简 Web 框架',
          url: 'https://expressjs.com',
          iconName: 'simple-icons:express',
        },
        {
          name: 'NestJS',
          desc: '企业级 Node 框架',
          url: 'https://nestjs.com',
          iconName: 'logos:nestjs',
        },
      ],
    },
  ],
  其它: [
    {
      name: '在线AI',
      sites: [
        {
          name: 'Kimi',
          desc: 'Kimi是由国内AI创业公司月之暗面科技有限公司开发的一款AI对话助手。卓越的长文本处理能力和丰富的应用场景。',
          url: 'https://www.kimi.com/chat/',
          iconName: 'hugeicons:kimi-ai',
        },
        {
          name: '问小白',
          desc: '问小白是一个基于deepseek的模型',
          url: 'https://www.wenxiaobai.com/',
          iconName: 'vscode-icons:file-type-fontawesome',
        },
        {
          name: 'Qwen千问大模型',
          desc: 'Qwen模型是阿里巴巴开发的语言模型',
          url: 'https://chat.qwen.ai/',
          iconName: '',
        },
      ],
    },
    {
      name: '机场',
      sites: [
        {
          name: 'Clash Party',
          desc: '一个代理客户端',
          url: 'https://github.com/mihomo-party-org/clash-party',
          iconName: '',
        },
        {
          name: 'v2rayN',
          desc: '一个代理客户端',
          url: 'https://github.com/2dust/v2rayN',
          iconName: '',
        },
        {
          name: '性价比机场',
          desc: '平均1元/月价格便宜',
          url: 'https://xn--6nq44r2uh9rhj7f.net/',
          iconName: '',
        },
        {
          name: '狗狗加速',
          desc: '平均15.8元/月',
          url: 'https://bitbucket.org/doggygo/url/src/main/',
          iconName: '',
        },
        {
          name: '农夫山泉',
          desc: '平均8元/月',
          url: 'https://www.nfsq.us/',
          iconName: '',
        },
        {
          name: '一元机场',
          desc: '',
          url: 'https://oneairport.club/',
          iconName: '',
        },
      ],
    },
    {
      name: 'MC开服',
      sites: [
        {
          name: 'Opanel',
          desc: 'MC开服管理面板，mod插件形式存在',
          url: 'https://github.com/opanel-mc/opanel',
          iconName: '',
        },
        {
          name: 'Java下载',
          desc: '开服必下java环境',
          url: 'https://www.oracle.com/cn/java/technologies/downloads/#jdk17-windows',
          iconName: '',
        },
        {
          name: '高诚云计算',
          desc: '便宜好用VPS服务商',
          url: 'https://sjcmc.cn/member/',
          iconName: '',
        },
        {
          name: '文叔叔',
          desc: '用于向VPS服务器传输大文件',
          url: 'https://www.wenshushu.cn/',
          iconName: '',
        },
      ],
    },
  ],
};

const allSites = Object.values(categoryMap)
  .filter((arr) => arr !== categoryMap.全部) // ← 排除「全部」自身
  .flatMap((arr) => arr.flatMap((sub) => sub.sites));

(categoryMap as CategoryMap).全部 = [{ name: '综合', sites: allSites }];
