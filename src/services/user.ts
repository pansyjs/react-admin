import { request } from 'umi';

/**
 * 获取当前登录用户信息
 */
export async function fetchCurrent() {
  return request<API.ResponseResult<API.CurrentUser>>('/api/user/current');
}

/**
 * 获取用户列表
 */
export async function fetchList(params: any) {
  return request<API.ResponseResult<API.UserInfo>>('/api/user/list', { params });
}
