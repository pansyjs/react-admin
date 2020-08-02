import { defineConfig } from 'umi';
import proxy from './proxy';

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/page-loading/index',
  },
  ignoreMomentLocale: true,
  proxy,
})
