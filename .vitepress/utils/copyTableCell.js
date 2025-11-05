/* 点击原生表格单元格复制内容的脚本 */

export function copyTableCellOnDoubleClick() {
  // 监听整个文档的双击事件
  document.addEventListener('dblclick', async (event) => {
    const target = event.target;

    // 检查是否双击了表格单元格
    if (target.tagName === 'TD') {
      try {
        // 复制单元格内容
        await copyToClipboard(target.innerText);

        // 显示视觉反馈
        showCopyFeedback(target);
      } catch (err) {
        console.error('复制失败:', err);
      }
    }
  });

  // 复制文本到剪贴板
  async function copyToClipboard(text) {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      // 兼容旧版浏览器的降级方案
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }

  // 显示视觉反馈
  function showCopyFeedback(element) {
    // 添加复制反馈类
    element.classList.add('copy-feedback');

    // 2秒后移除反馈效果
    setTimeout(() => {
      element.classList.remove('copy-feedback');
    }, 2000);
  }
}
