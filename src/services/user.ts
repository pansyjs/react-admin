import { GET } from '@/utils/request';

export function fetchCurrentUser() {
  return GET('/currentUser');
}
