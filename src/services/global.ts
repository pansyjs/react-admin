import { Get } from '@/utils/request';

export function fetchQueryNotices() {
  return Get('/notices');
}
