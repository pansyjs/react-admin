import { defineConfig } from '@umijs/max';
import { defaultSettings } from './defaultSettings';
import routes from './routes';

export default defineConfig({
  hash: true,
  model: {},
  antd: {},
  request: {},
  initialState: {},
  routes,
  mock: {
    include: ['src/pages/**/_mock.ts'],
  },
  layout: {
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  mfsu: {
    esbuild: true,
  },
  ignoreMomentLocale: true,
  fastRefresh: true,
  npmClient: 'pnpm'
});
