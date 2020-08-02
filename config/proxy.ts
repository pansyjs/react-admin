export default {
  '/api/': {
    target: 'https://preview.pro.ant.design',
    changeOrigin: true,
    pathRewrite: { '^': '' },
  },
};
