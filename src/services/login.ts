import { request } from 'umi';
import { LoginParamsType } from '@/common/types/login';

/**
 * 用户登录
 * @param data
 */
export async function fetchLogin(data: LoginParamsType) {
  return request('/api/user/login', {
    method: 'POST',
    data
  });
}

/**
 * 退出登录
 * @param data
 */
export async function fetchLogout() {
  return request('/api/user/logout', {
    method: 'POST',
  });
}

/**
 * 用户注册
 * @param data
 */
export async function fakeRegister(data: any) {
  return request('/api/user/register', {
    method: 'POST',
    data
  });
}

/**
 * 获取手机验证码
 * @param mobile
 */
export async function fetchCaptcha(mobile: string) {
  return request(`/api/user/captcha?mobile=${mobile}`);
}
