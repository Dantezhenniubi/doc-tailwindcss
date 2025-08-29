/**
 * 文章数据全局状态管理的一些方法
 * 使用 nanostores 实现跨组件的数据共享
 */

import { atom } from 'nanostores';

// 创建一个原子状态，初始值为空数组
// atom 是 nanostores 的核心概念，它是一个响应式的数据容器
export const $posts = atom([]);

/**
 * 设置文章数据到全局状态
 * @param {Array} posts - 文章数据数组
 */
export function setPosts(posts) {
  $posts.set(posts);
}

/**
 * 获取当前的文章数据
 * @returns {Array} 当前的文章数组
 */
export function getPosts() {
  return $posts.get();
}

// 获取响应式引用
export function usePosts() {
  return $posts;
}

/**
 * 按标签过滤文章
 * @param {string} tag - 要过滤的标签
 * @returns {Array} 包含该标签的文章数组
 */
export function filterPostsByTag(tag) {
  const posts = $posts.get();
  return posts.filter(
    (post) => post.tags && post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * 按分类过滤文章
 * @param {string} category - 要过滤的分类
 * @returns {Array} 属于该分类的文章数组
 */
export function filterPostsByCategory(category) {
  const posts = $posts.get();
  return posts.filter(
    (post) => post.category && post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * 获取最新文章
 * @param {number} [limit] - 可选，返回的文章数量限制
 * @returns {Array} 按日期倒序排列的最新文章
 */
export function getLatestPosts(limit) {
  const posts = [...$posts.get()]; // 创建副本避免修改原数组

  // 按日期倒序排序（最新的在前）
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // 如果指定了数量限制
  return limit ? posts.slice(0, limit) : posts;
}
