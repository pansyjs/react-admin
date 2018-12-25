import { GET, DELETE, POST, PUT } from '@/utils/request';

// 角色分页查询
export function fetchPage(params) {
  return GET('/roles/page', params);
}

// 删除角色
export function fetchRemove(data) {
  return DELETE(`/roles/${data.id}`);
}

// 创建角色
export function fetchCreate(data) {
  return POST('/roles', data);
}

// 更新角色
export function fetchUpdate(data) {
  return PUT('/roles', data);
}
