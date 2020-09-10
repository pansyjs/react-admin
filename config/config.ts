import { defineConfig } from 'umi';
import { routes } from './routes';
import defaultSettings from './default-settings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  targets: {
    ie: 11,
  },
  antd: {},
  layout: {
    name: 'Admin Template',
    locale: true,
    siderWidth: 240,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  routes,
  consoleVersion: {
    projectName: 'admin-template'
  },
  dynamicImport: {
    loading: '@/components/page-loading/index',
  },
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  // proxy: proxy[REACT_APP_ENV || 'dev'],
})
