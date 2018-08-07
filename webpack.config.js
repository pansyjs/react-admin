const path = require('path');

export default function (webpackConfig) {
  webpackConfig.module.rules.push({
    test: /\.svg$/i,
    include: [path.join(__dirname, 'src/icons')],
    use: [
      {
        loader: require.resolve('svg-sprite-loader')
      }
    ]
  });

  return webpackConfig
};
