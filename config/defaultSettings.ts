import { Settings as LayoutSettings } from '@ant-design/pro-layout';

export const defaultSettings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'React Admin',
  pwa: false,
  iconfontUrl: '',
};
