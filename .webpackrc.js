const path = require('path');

export default {
  disableCSSModules: false,
  urlLoaderExcludes: [
    path.join(__dirname, 'src/icons')
  ]
}
