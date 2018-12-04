import { GET, POST } from '@/utils/request';

export function fetchCurrentUser() {
  return GET('/user/current');
}

export function fetchLogin(data) {
  return POST('/user/login', data);
}
