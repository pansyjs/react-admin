import { Get, Post, Put, Delete } from '@/utils/request';

// 获取用户组列表
export async function fetchList(params) {
  return Get('groups/list', params);
}
