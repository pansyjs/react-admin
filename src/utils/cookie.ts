import cookie from 'js-cookie';
import { COOKIE_DEFAULT_CONFIG } from '@/common/constant';

const cookieKey = COOKIE_DEFAULT_CONFIG.TOKEN;

export function getCookie() {
  return cookie.get(cookieKey);
}

export function setCookie(value: string | object) {
  return cookie.set(cookieKey, value);
}

export function removeCookie() {
  return cookie.remove(cookieKey);
}
