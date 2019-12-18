import { IPlugin } from 'umi-types';

const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true
      },
      locale: {
        enable: true,
        default: 'zh-CN',
        baseNavigator: true
      },
      dynamicImport: {
        loadingComponent: './components/page-loading/index',
        webpackChunkName: true,
        level: 3
      }
    }
  ],
  [
    '@alitajs/umi-plugin-deploy-config',
    {
      baseURL: '/'
    }
  ]
];

export default plugins;
