import { GET, POST } from '@/utils/request';

// 获取当前用户信息
export function fetchCurrentUser() {
  return GET('/users/current');
}

// 用户登录
export function fetchLogin(data) {
  return POST('/users/login', data);
}

// 退出登录
export function fetchLogout() {
  return GET('/user/logout');
}
