import routes from './router.config';
import plugins from './plugin.config';
import themeConfig from './theme.config';

const { NODE_ENV } = process.env;

export interface ILocalServerConfig {
  baseURL?: string;
}

// 设置后端接口地址
let localServerConfig: ILocalServerConfig = {};
let BaseURL = '';

try {
  localServerConfig = require('./local-server.config.ts').default;
} catch (error) {}

// 开发环境使用 local-server.config.ts 中的配置
if (NODE_ENV === 'development') {
  BaseURL = localServerConfig.baseURL;
}

export default {
  plugins,
  targets: {
    // 推荐设置，项目不用考虑IE可删除
    ie: 9
  },
  treeShaking: true,
  define: {
    BASE_URL: BaseURL
  },
  // 路由配置
  routes,
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
      },
      'ant-plus'
    ]
  ],
  disableCSSModules: true
  // 代理配置 - 请根据需要开启
  // 访问 `/api/users` 代理到 `http://api.jiumao.com/users`]
  // proxy: {
  //   '/api': {
  //     target: 'http://api.jiumao.com/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/api' : '' }
  //   }
  // }
};
