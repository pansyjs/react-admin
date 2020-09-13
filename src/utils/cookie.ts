import cookie from 'js-cookie';
import { COOKIE_DEFAULT_CONFIG } from '@/common/constant';

const cookieKey = COOKIE_DEFAULT_CONFIG.TOKEN;

export function getCookie(name?: string) {
  return cookie.get(name || cookieKey);
}

export function setCookie(name: string, value: string | object) {
  return cookie.set(name || cookieKey, value);
}

export function removeCookie(name?: string) {
  return cookie.remove(name || cookieKey);
}

export function clearAllCookie() {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g) || [];

  keys.forEach((item) => {
    removeCookie(item);
  });
}
