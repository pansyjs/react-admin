export default {
  doc: {
    title: 'admin-layout'
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
      }
    ]
  ],
  hash: true,
  disableCSSModules: true
};
