import { GET, POST } from '@/utils/request';

export function fetchCurrentUser() {
  return GET('/user/currentUser');
}

export function fetchLogin(data) {
  return POST('/user/login', data);
}
