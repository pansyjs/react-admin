import { defineConfig } from 'umi';
import themeConfig from './theme.config';

const { NODE_ENV } = process.env;

export interface LocalServerConfig {
  baseURL?: string;
}

// 设置后端接口地址
let localServerConfig: LocalServerConfig = {};
let BaseURL = '';

try {
  localServerConfig = require('./local-server.config.ts').default;
} catch (error) {}

// 开发环境使用 local-server.config.ts 中的配置
if (NODE_ENV === 'development') {
  BaseURL = localServerConfig.baseURL;
}

export default defineConfig({
  targets: {
    // 推荐设置，项目不用考虑IE可删除
    ie: 9
  },
  define: {
    BASE_URL: BaseURL
  },
  hash: true,
  theme: themeConfig,
  ignoreMomentLocale: true,
  // 配置按需加载
  extraBabelPlugins: [
    [
      require.resolve('babel-plugin-import'),
      {
        libraryName: '@alitajs/antd-plus',
        libraryDirectory: 'es',
        style: true
      }
    ]
  ],
  // 插件相关
  antd: {},
  dva: {
    hmr: true
  },
  dynamicImport: {
    loading: '@/components/page-loading/index'
  },
  locale: {
    default: 'zh-CN',
    baseNavigator: true,
  },
  plugins: [
    '@alitajs/main-path'
  ],
  mainPath: '/dashboard/analysis'
});
