import request from '@/utils/request';
import { LoginParamsType } from '@/common/types/login';

export async function fetchLogin(data: LoginParamsType) {
  return request.post('/api/login/account', {
    data
  });
}

export async function fetchCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
