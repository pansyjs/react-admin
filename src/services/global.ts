import { GET } from '@/utils/request';

export function fetchQueryNotices() {
  return GET('/notices');
}
