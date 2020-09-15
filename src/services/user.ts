import { request } from 'umi';

/**
 * 获取当前登录用户信息
 */
export async function fetchCurrent() {
  return request<API.ResponseResult<API.CurrentUser>>('/api/user/current');
}
