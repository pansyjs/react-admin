import { request } from 'umi';

export async function fetchCurrent() {
  return request<API.ResponseResult<API.CurrentUser>>('/api/currentUser');
}
