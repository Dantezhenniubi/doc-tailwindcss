// scripts/git-hooks/commit-msg.mjs
import fs from 'node:fs';
import path from 'node:path';

const msgPath = path.resolve(process.cwd(), '.git/COMMIT_EDITMSG');
const msg = fs.readFileSync(msgPath, 'utf-8').trim();
const commitRE =
  /^Merge.+|(?:feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert|types)(?:\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  // 友好的错误提示
  console.error(
    '  Error: proper commit message format is required for automated changelog generation.'
  );
  console.error("  - Use 'npm run commit' to interactively generate a commit message.");
  console.error('  - See .github/COMMIT_CONVENTION.md for more details.');
  console.error('');

  // 添加 SourceTree 友好提示
  console.error('  SourceTree 用户请注意：');
  console.error('  1. 请修改上方的提交信息文本框');
  console.error('  2. 按规范格式重新输入，比如feat: 提交改动 或者 feat(theme): 提交改动');
  console.error('  3. 再次点击"提交"按钮');

  process.exit(1);
}
