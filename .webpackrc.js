const path = require('path');

export default {
  disableCSSModules: false,
  alias:{
    'public': path.resolve(__dirname, 'public'),
    '@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components/')
  },
  cssLoaderOptions: {
    localIdentName: '[name]--[hash:base64:6]'
  }
}
