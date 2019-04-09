import routes from './router.config';
import plugins from './plugin.config';
import themeConfig from './theme.config';
import serverConfig from './server.config';

const { NODE_ENV } = process.env;

export default {
  plugins,
  targets: {
    ie: 11
  },
  define: {
    BASE_URL: serverConfig[NODE_ENV] || serverConfig.development
  },
  // 路由配置
  routes,
  // 请根据项目需要修改
  publicPath: './',
  history: 'hash',
  hash: true,
  theme: themeConfig,
  ignoreMomentLocale: true,
  disableCSSModules: true
};
