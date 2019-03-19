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
export const PROJECT_DEFAULT_CONFIG = {
  companyName: 'JiuMao'
};

// 项目默认设置
export const SETTING_DEFAULT_CONFIG = {
  navTheme: 'dark',
  layout: 'sideMenu',
  contentWidth: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSideBar: false
};
