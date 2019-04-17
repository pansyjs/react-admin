import { MenuTheme } from 'antd/es/menu';

interface ISetting {
  menu: {
    disableLocal: boolean;
  },
  theme: MenuTheme;
  fixedHeader: boolean;
  autoHideHeader: boolean;
  fixedSide: boolean;
  iconFontUrl: string;
}

// axios 相关配置
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 20000,
  withCredentials: true,
  // 使用webpack DefinePlugin 插件
  // 具体配置请查看 /config/server.config.ts
  // @ts-ignore
  baseURL: `${BASE_URL}/api/`,
};

// 项目相关配置
export const APP_DEFAULT_CONFIG = {
  companyName: '九毛科技',
  title: 'React Admin Template',
  // 免登陆白名单
  whiteList: ['/user/*']
};

// 本地存储Key
export const STORAGE_KEY_DEFAULT_CONFIG = {
  loginType: 'login-type',
  tabListKey: 'tab-list',
  storageTabActiveKey: 'tab-active-key'
};

// 项目默认设置
export const SETTING_DEFAULT_CONFIG: ISetting = {
  menu: {
    disableLocal: false,
  },
  theme: 'dark',
  fixedHeader: false,
  autoHideHeader: false,
  fixedSide: false,
  // 自定义图标链接
  iconFontUrl: ''
};
