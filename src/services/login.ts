import { request } from 'umi';
import { LoginParamsType } from '@/common/types/login';

export async function fetchLogin(data: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data
  });
}

export async function fetchCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
