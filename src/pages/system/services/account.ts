import { GET, DELETE, POST, PUT } from '@/utils/request';

// 用户分页查询
export function fetchPage(params) {
  return GET('/users/page', params);
}

// 删除用户
export function fetchRemove(data) {
  return DELETE(`/users/${data.id}`);
}

// 创建用户
export function fetchCreate(data) {
  return POST('/users', data);
}

// 更新用户
export function fetchUpdate(data) {
  return PUT('/users', data);
}
