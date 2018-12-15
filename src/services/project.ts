import { GET } from '@/utils/request';

export async function fetchGetNotice() {
  return GET('/project/notice');
}

export async function fetchList() {}
