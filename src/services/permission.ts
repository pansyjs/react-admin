import { Get, Post, Delete } from '@/utils/request';

// 获取权限策略列表
export function fetchList(params) {
  return Get('/permissions/list', params);
}

// 删除权限策略
export function fetchRemove(ids) {
  return Post('/permissions/remove', ids);
}

