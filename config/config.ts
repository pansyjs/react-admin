import routes from './router.config';
import plugins from './plugin.config';
import themeConfig from './theme.config';
import serverConfig from './server.config';

const { SERVER_ENV } = process.env;

export default {
  plugins,
  targets: {
    ie: 11
  },
  treeShaking: true,
  define: {
    BASE_URL: serverConfig[SERVER_ENV] || serverConfig.localhost
  },
  // 路由配置
  routes,
  // 请根据项目需要修改
  base: '/react-admin-template',
  publicPath: '/react-admin-template/',
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
