import { GET } from '@/utils/request';

export async function fetchList() {
  return GET('/article/list');
}
