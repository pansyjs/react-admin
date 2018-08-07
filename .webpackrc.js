const path = require('path');

export default {
  disableCSSModules: false,
  alias:{
    '@': path.join(__dirname,'src'),
    '@assets': path.join(__dirname,'src/assets'),
    '@components': path.join(__dirname, 'src/components'),
    '@config': path.join(__dirname, 'src/config'),
    '@icons': path.join(__dirname, 'src/icons'),
    '@layouts': path.join(__dirname, 'src/layouts'),
    '@pages': path.join(__dirname, 'src/pages'),
    '@styles': path.join(__dirname, 'src/styles'),
    '@utils': path.join(__dirname, 'src/utils')
  },
  cssLoaderOptions: {
    localIdentName: '[name]--[hash:base64:6]'
  },
  urlLoaderExcludes: [
    path.join(__dirname, 'src/icons')
  ]
}
