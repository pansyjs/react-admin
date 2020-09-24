declare namespace API {
  export interface PermissionCode<T = string[]> {
    group: string;
    actions: T;
  }

  export interface ResponseResult<T = any> {
    data: T,
    code: number;
    message: string;
  }

  export interface ResponsePaginationResult<T = any> {
    data: {
      list: T[];
      total: number;
    },
    code: number;
    message: string;
  }

  export interface CurrentUser {
    /**
     * 用户头像
     */
    avatar?: string;
    /**
     * 用户名
     */
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    unreadCount?: number;
    /**
     * 所有的权限
     */
    permissionCodes?: PermissionCode[];
    /**
     * 赋予的权限
     */
    access?: PermissionCode<'*' | string[]>[];
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}
