import { GET, DELETE, POST, PUT } from '@/utils/request';

// 权限分页查询
export function fetchPage(params) {
  return GET('/permissions/page', params);
}

// 删除权限
export function fetchRemove(data) {
  return DELETE(`/permissions/${data.id}`);
}

// 创建权限
export function fetchCreate(data) {
  return POST('/permissions', data);
}

// 更新权限
export function fetchUpdate(data) {
  return PUT('/permissions', data);
}
