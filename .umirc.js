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
  pages: {},
  hashHistory: false
}
