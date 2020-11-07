import { TOKEN_KEY } from '@/config';

const cookieKey = TOKEN_KEY;

export function getCookie() {
  return localStorage.getItem(cookieKey);
}

export function setCookie(value: string) {
  return localStorage.setItem(cookieKey, value);
}

export function removeCookie() {
  return localStorage.removeItem(cookieKey);
}
