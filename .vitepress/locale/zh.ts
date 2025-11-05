import zhLocale from 'element-plus/dist/locale/zh-cn.mjs';

/* 覆盖分页文案 */
zhLocale.el.pagination = {
  goto: '跳至',
  pagesize: '条/页',
  total: '共 {total} 条',
  pageClassifier: '页',
};

export default zhLocale;
