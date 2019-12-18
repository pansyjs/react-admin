// ajax 相关配置
export const AJAX_DEFAULT_CONFIG = {
  timeout: 20000,
  withCredentials: true,
  baseURL: ''
};

try {
  // 使用webpack DefinePlugin 插件
  AJAX_DEFAULT_CONFIG.baseURL = `${BASE_URL || window.baseURL || ''}/api/`;
} catch (e) {
  AJAX_DEFAULT_CONFIG.baseURL = '/api/';
}

// 项目相关配置
export const APP_DEFAULT_CONFIG = {
  // 免登陆白名单
  whiteList: ['/user/*']
};

// 本地存储Key
export const STORAGE_KEY_DEFAULT_CONFIG = {
  loginType: 'login-type'
};
