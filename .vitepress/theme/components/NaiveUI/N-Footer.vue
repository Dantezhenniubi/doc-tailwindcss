NEW_FILE_CODE
<template>
  <n-layout-footer class="custom-footer" bordered>
    <div class="footer-content">
      <!-- 上半部分：站点信息 -->
      <div class="footer-top">
        <n-grid :cols="24" :x-gap="12" :y-gap="12">
          <n-gi :span="24" :md="8">
            <div class="footer-section">
              <h3 class="footer-title">关于本站</h3>
              <p class="footer-description">
                {{
                  siteInfo.description || '这是一个使用 VitePress 和 Naive UI 构建的技术博客站点'
                }}
              </p>
            </div>
          </n-gi>

          <n-gi :span="24" :md="8">
            <div class="footer-section">
              <h3 class="footer-title">快速链接</h3>
              <n-space vertical>
                <n-button
                  v-for="link in quickLinks"
                  :key="link.name"
                  text
                  :type="link.type || 'default'"
                  @click="navigateTo(link.url)"
                >
                  {{ link.name }}
                </n-button>
              </n-space>
            </div>
          </n-gi>

          <n-gi :span="24" :md="8">
            <div class="footer-section">
              <h3 class="footer-title">联系方式</h3>
              <n-space vertical>
                <div v-for="contact in contacts" :key="contact.name" class="contact-item">
                  <n-icon-wrapper :size="18" :border-radius="6">
                    <n-icon :size="16" :component="contact.icon" />
                  </n-icon-wrapper>
                  <span class="contact-text">{{ contact.name }}: {{ contact.value }}</span>
                </div>
              </n-space>
            </div>
          </n-gi>
        </n-grid>
      </div>

      <!-- 下半部分：版权信息 -->
      <n-divider />

      <div class="footer-bottom">
        <n-grid :cols="24" :x-gap="12">
          <n-gi :span="24" :md="12">
            <div class="copyright">
              <!-- <n-icon :component="copyrightIcon" /> -->
              <span class="copyright-text">
                {{ new Date().getFullYear() }} {{ siteInfo.title || '技术博客' }}. 版权所有.
              </span>
            </div>
          </n-gi>

          <n-gi :span="24" :md="12">
            <div class="powered-by">
              <n-space justify="end">
                <span class="powered-text">由</span>
                <n-button text type="primary" @click="openLink('https://vitepress.dev/')">
                  VitePress
                </n-button>
                <span class="powered-text">和</span>
                <n-button text type="primary" @click="openLink('https://www.naiveui.com/')">
                  Naive UI
                </n-button>
                <span class="powered-text">驱动</span>
              </n-space>
            </div>
          </n-gi>
        </n-grid>
      </div>
    </div>
  </n-layout-footer>
</template>

<script setup>
import { ref } from 'vue';
// import { CopyrightOutlined } from '@vicons/antd';

// 定义组件属性
const props = defineProps({
  siteInfo: {
    type: Object,
    default: () => ({
      title: '技术博客',
      description: '这是一个使用 VitePress 和 Naive UI 构建的技术博客站点',
    }),
  },
  quickLinks: {
    type: Array,
    default: () => [
      { name: '首页', url: '/', type: 'primary' },
      { name: '关于', url: '/about', type: 'default' },
      { name: '归档', url: '/archive', type: 'default' },
      { name: '标签', url: '/tags', type: 'default' },
    ],
  },
  contacts: {
    type: Array,
    default: () => [
      { name: '邮箱', value: 'example@example.com', icon: 'mail' },
      { name: 'GitHub', value: 'github.com/username', icon: 'github' },
    ],
  },
});

// 图标
// const copyrightIcon = ref(CopyrightOutlined);

// 导航方法
const navigateTo = (url) => {
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
};

// 打开链接方法
const openLink = (url) => {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank');
  }
};
</script>

<style scoped>
.custom-footer {
  padding: 24px 0;
  background-color: var(--n-color);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-top {
  margin-bottom: 24px;
}

.footer-section {
  text-align: left;
}

.footer-title {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: bold;
  color: var(--n-title-text-color);
}

.footer-description {
  margin: 0;
  font-size: 14px;
  color: var(--n-text-color);
  line-height: 1.5;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-text {
  font-size: 14px;
  color: var(--n-text-color);
}

.footer-bottom {
  display: flex;
  align-items: center;
}

.copyright {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--n-text-color);
}

.powered-by {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.powered-text {
  font-size: 14px;
  color: var(--n-text-color);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-content {
    padding: 0 16px;
  }

  .footer-top {
    margin-bottom: 16px;
  }

  .powered-by {
    justify-content: flex-start;
    margin-top: 12px;
  }

  :deep(.n-divider) {
    margin: 16px 0;
  }
}
</style>
