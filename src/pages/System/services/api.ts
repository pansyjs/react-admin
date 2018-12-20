import { GET, POST, DELETE } from '@/utils/request';

// 接口分页查询
export function fetchList(params) {
  return GET('/system/api/list', params);
}

export function fetchRemove(data) {
  return DELETE(`system/api/${data.id}`);
}
