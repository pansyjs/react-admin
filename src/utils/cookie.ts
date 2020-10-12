import cookie from 'js-cookie';
import { TOKEN_KEY } from '@/config';

const cookieKey = TOKEN_KEY;

export function getCookie() {
  return cookie.get(cookieKey);
}

export function setCookie(value: string | object) {
  return cookie.set(cookieKey, value);
}

export function removeCookie() {
  return cookie.remove(cookieKey);
}
