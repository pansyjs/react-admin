import { resolve } from 'path';
import pageRoutes from './router.config';

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        immer: true
      },
      locale: {
        enable: true,
        default: 'zh-CN',
        baseNavigator: true
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index'
      },
      dll: {
        exclude: [],
        include: ['dva', 'dva/router', 'dva/saga']
      }
    }
  ]
];

export default {
  plugins,
  targets: {
    ie: 11
  },
  // 路由配置
  routes: pageRoutes,
  theme: {
    'primary-color': '#1890FF'
  },
  history: 'hash',
  ignoreMomentLocale: true,
  urlLoaderExcludes: [resolve(__dirname, 'src/icons/*')],
  chainWebpack(config) {
    config.module
      .rule('svg')
      .test(/\.svg$/i)
      .include.add(resolve(__dirname, 'src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader(require.resolve('svg-sprite-loader'));
  }
};
