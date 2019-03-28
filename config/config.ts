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
  urlLoaderExcludes: [resolve(__dirname, '../src/icons/svg')],
  chainWebpack(config) {
    config.module
      .rule('svg')
      .test(/\.svg$/i)
      .include.add(resolve(__dirname, '../src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader(require.resolve('svg-sprite-loader'));
  }
};
