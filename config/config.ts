import { defineConfig } from 'umi';
import { defaultSettings } from './defaultSettings';

export default defineConfig({
  hash: true,
  model: {},
  antd: {},
  request: {},
  initialState: {},
  srcTranspiler: 'esbuild',
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
  mfsu: {},
  ignoreMomentLocale: true,
  fastRefresh: true,
  npmClient: 'pnpm'
});
