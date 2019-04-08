import { resolve } from 'path';
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
  theme: themeConfig,
  ignoreMomentLocale: true,
  disableCSSModules: true
};
