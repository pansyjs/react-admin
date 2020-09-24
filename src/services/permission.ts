import { request } from 'umi';

/**
 * 获取操作列表
 */
export async function fetchActionList(params: any) {
  return request<API.ResponsePaginationResult<API.PermissionActionData>>('/api/permission/action/list', { params });
}

/**
 * 创建操作
 */
export async function createAction(data: API.PermissionActionData) {
  return request<API.ResponseResult<API.PermissionActionData>>('/api/permission/action', {
    method: 'POST',
    data
  });
}

/**
 * 创建操作
 */
export async function updateAction(data: API.PermissionActionData) {
  return request<API.ResponseResult<API.PermissionActionData>>(`/api/permission/action/${data.id}`, {
    method: 'PUT',
    data
  });
}
