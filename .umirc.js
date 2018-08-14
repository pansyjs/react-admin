const path = require('path');

export default {
  plugins: [
    ['umi-plugin-dva', { immer: true }],
    'umi-plugin-locale',
    [
      'umi-plugin-polyfill',
      {
        extend: ['url-polyfill']
      }
    ]
  ],
  alias: {
    '@': path.resolve(__dirname, 'src/'),
    '@assets': path.resolve(__dirname, 'src/assets/'),
    '@components': path.resolve(__dirname, 'src/components/'),
    '@icons': path.resolve(__dirname, 'src/icons/'),
    '@layouts': path.resolve(__dirname, 'src/layouts/'),
    '@pages': path.resolve(__dirname, 'src/pages/'),
    '@services': path.resolve(__dirname, 'src/services/'),
    '@styles': path.resolve(__dirname, 'src/styles/'),
    '@utils': path.resolve(__dirname, 'src/utils/'),
  },
  hashHistory: false
}
