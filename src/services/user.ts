import { request } from 'umi';

export async function fetchCurrent() {
  return request<API.CurrentUser>('/api/currentUser');
}
