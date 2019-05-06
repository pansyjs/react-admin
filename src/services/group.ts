import { Get, Post, Put, Delete } from '@/utils/request';

// 获取用户组列表
export async function fetchList(params) {
  return Get('groups/list', params);
}

// 创建用户组
export async function fetchCreate(data) {
  return Post('groups/create', data);
}

// 删除用户组
export async function fetchRemove(id) {
  return Delete(`groups/remove/${id}`);
}
