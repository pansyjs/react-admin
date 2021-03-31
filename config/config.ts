import { defineConfig } from 'umi';
import { routes } from './routes';
import defaultSettings from './default-settings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  routes,
  targets: {
    ie: 11,
  },
  antd: {
    config: {}
  },
  layout: {
    name: defaultSettings.title,
    locale: true,
    siderWidth: 240
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
    libraryName: '@alitajs/antd-plus'
  },
  webpack5: {
    lazyCompilation: {},
  },
  consoleVersion: {
    projectName: 'admin-template'
  },
  dynamicImport: {
    loading: '@/components/page-loading/index',
  },
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  cssModulesTypescriptLoader: {},
  ignoreMomentLocale: true,
  // proxy: proxy[REACT_APP_ENV || 'dev'],
})
