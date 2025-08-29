/**
 * 文章数据加载器
 * 这个文件的作用是在 VitePress 构建时自动扫描 对应 目录下的所有 Markdown 文件
 * 并提取文章的元数据（标题、日期、标签等）供页面使用
 */

import matter from 'gray-matter'; // 用于解析 Markdown 文件的 frontmatter（头部元数据）
import { glob } from 'tinyglobby'; // 用于查找匹配的文件
import { readFile } from 'fs/promises'; // Node.js 的文件系统 API，用于读取文件内容
import path from 'path'; // Node.js 的路径处理工具
import { createMarkdownRenderer } from 'vitepress'; // VitePress 的 Markdown 渲染器

// 导出数据加载器配置
export default {
  // 监视的文件模式：监视 对应 目录下所有 .md 文件，但排除 index.md
  watch: ['docs/Front-end/**/*.md', '!docs/Front-end/index.md'],
  // 数据加载函数，VitePress 会在构建时调用这个函数
  async load() {
    // 1. 查找所有博客文章
    const files = await glob('docs/Front-end/**/*.md', {
      ignore: ['**/index.md'],
    });
    // 2. 创建 Markdown 渲染器
    // 参数说明：
    // - process.cwd(): 当前工作目录
    // - {}: Markdown 配置选项（这里使用默认配置）
    // - '/doc-tailwindcss/': 网站的 base 路径
    // - console: 日志输出
    const md = await createMarkdownRenderer(process.cwd(), {}, '/doc-tailwindcss/', console);
    // 存储所有文章的数组
    const posts = [];
    // 3. 遍历每个文件并处理
    for (const file of files) {
      try {
        // 构建完整的文件路径
        const filePath = path.join(process.cwd(), file);
        // 读取文件内容
        const content = await readFile(filePath, 'utf8');
        // 使用 gray-matter 解析md 返回 frontmatter 和正文
        // frontmatter 是 Markdown 文件头部的 YAML 元数据
        const { data: frontmatter, content: body } = matter(content);

        // 提取文章信息
        // 标题，如果没有则用文件名
        const title = frontmatter.title || path.basename(file, '.md');
        // 时间戳
        const date = frontmatter.date ? new Date(frontmatter.date).getTime() : Date.now();
        // 描述，如果没有则截取正文
        const description = frontmatter.description || body.slice(0, 150) + '...';
        // 标签数组
        const tags = frontmatter.tags || [];
        // 分类
        const category = frontmatter.category || '未分类';
        // 使用 Markdown 渲染器将正文渲染为 HTML
        const html = md.render(body);
        // 计算字数和阅读时间
        const words = body.split(/\s+/).length;
        const minutes = Math.ceil(words / 200); // 假设每分钟阅读200字
        // 构建完整的文章路径
        const relativePath = file.replace('.md', '.html');
        const fullPath = `/doc-tailwindcss/${relativePath}`;
        // 将文章信息添加到数组
        posts.push({
          title,
          path: fullPath,
          description,
          date,
          tags,
          category,
          words,
          minutes,
          html,
          frontmatter,
        });
      } catch (error) {
        console.warn(`Failed to load ${file}:`, error);
      }
    }
    // 4. 按日期降序排序（最新的文章在前）
    return posts.sort((a, b) => b.date - a.date);
  },
};
