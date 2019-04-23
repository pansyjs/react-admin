import { Get, Post, Put, Delete } from '@/utils/request';

// 获取操作列表
export function fetchList(params) {
  return Get('/actions/list', params);
}

// 创建操作
export async function fetchCreate(data) {
  return Post('/actions/create', data);
}

// 删除操作
export function fetchRemove(ids) {
  return Delete('/actions/remove', ids);
}

// 更新操作
export function fetchUpdate(data) {
  return Put('/actions/update', data);
}
