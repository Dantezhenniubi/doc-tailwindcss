// scripts/git-hooks/commit-msg.mjs
import fs from 'fs';
import process from 'process';

try {
  const msg = fs.readFileSync(process.argv[2], 'utf8').trim();
  console.log(`正在验证提交信息: "${msg}"`);

  // 基础验证规则 - 按需修改这部分
  const isValid = /^(feat|fix|docs|style|refactor|test|chore)$$?.*$$?:\s.+/.test(msg);

  if (!isValid) {
    console.error(`
     ❌ 提交信息格式错误！
    
    要求格式: <类型>(<作用域>): <描述>
    
    示例:
      feat(auth): 添加登录功能
      fix(button): 修复点击事件
    
    允许的类型: feat, fix, docs, style, refactor, test, chore
    `);
    process.exit(1);
  }

  console.log('✅ 提交信息格式正确');
} catch (error) {
  console.error('验证出错:', error.message);
  process.exit(1);
}
