import { resolve } from 'path';

export default {
  plugins: [
    ['umi-plugin-react', {
      dva: {
        immer: true,
      },
      antd: true,
      routes: {
        exclude: [
          /model\.tsx?$/,
          /service\.tsx?$/,
          /models\//,
          /components\//,
          /services\//
        ],
      },
      locale: {},
      library: 'react',
      dynamicImport: {
        webpackChunkName: true,
        loadingComponent: './components/PageLoading/index'
      },
      dll: {
        exclude: [],
        include: ["dva", "dva/router", "dva/saga", "dva/fetch", "antd/es"],
      },
    }]
  ],
  publicPath: './',
  alias: {
    '@': resolve(__dirname, 'src')
  },
  targets: {
    ie: 10,
  },
  history: 'hash',
  ignoreMomentLocale: true,
  urlLoaderExcludes: [
    resolve(__dirname, 'src/icons/*')
  ],
  chainWebpack(config) {
    config.module.rule('svg')
      .test(/\.svg$/i)
      .include
      .add(resolve(__dirname, 'src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader(require.resolve('svg-sprite-loader'));
  },
}
