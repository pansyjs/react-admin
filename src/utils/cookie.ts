import { TOKEN_KEY } from '@/config';

const cookieKey = TOKEN_KEY;

export function getCookie() {
  return localStorage.get(cookieKey);
}

export function setCookie(value: string | object) {
  return localStorage.set(cookieKey, value);
}

export function removeCookie() {
  return localStorage.remove(cookieKey);
}
