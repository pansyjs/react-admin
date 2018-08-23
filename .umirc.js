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
      polyfills: ['ie9'],
      locale: {},
      library: 'react',
      dynamicImport: {
        webpackChunkName: true
      },
      dll: {
        exclude: [],
        include: ["dva", "dva/router", "dva/saga", "dva/fetch", "antd/es"],
      },
    }]
  ],
  alias: {
    '@': resolve(__dirname, 'src'),
    '@assets': resolve(__dirname, 'src/assets'),
    '@components': resolve(__dirname, 'src/components'),
    '@config': resolve(__dirname, 'src/config'),
    '@icons': resolve(__dirname, 'src/icons'),
    '@layouts': resolve(__dirname, 'src/layouts'),
    '@pages': resolve(__dirname, 'src/pages'),
    '@services': resolve(__dirname, 'src/services'),
    '@styles': resolve(__dirname, 'src/styles'),
    '@utils': resolve(__dirname, 'src/utils'),
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
