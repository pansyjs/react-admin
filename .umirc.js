export default {
  plugins: [
    'umi-plugin-dva',
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
