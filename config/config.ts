import routes from './router.config';
import plugins from './plugin.config';
import themeConfig from './theme.config';
import serverConfig from './server.config';

const { SERVER_ENV } = process.env;

// 设置后端接口地址
let localServerConfig;
let BaseURL = '';

try {
  localServerConfig = require('./local-server.config.ts');
} catch (error) {}

if (serverConfig[SERVER_ENV]) {
  BaseURL = serverConfig[SERVER_ENV];
} else if (localServerConfig && localServerConfig.baseURL) {
  BaseURL = localServerConfig.baseURL;
} else {
  BaseURL = serverConfig.localhost;
}

export default {
  plugins,
  targets: {
    // 推荐设置，项目不用考虑IE可删除
    ie: 9,
  },
  treeShaking: true,
  define: {
    BASE_URL: BaseURL,
  },
  // 路由配置
  routes,
  hash: true,
  theme: themeConfig,
  ignoreMomentLocale: true,
  disableCSSModules: true,
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
