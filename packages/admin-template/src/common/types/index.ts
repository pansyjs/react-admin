export * from './global';

export interface MenuDataItem {
  // 权限
  authority?: string[] | string;
  // 子菜单
  children?: MenuDataItem[];
  // 是否隐藏子菜单
  hideChildrenInMenu?: boolean;
  // 是否隐藏当前菜单
  hideInMenu?: boolean;
  // Icon
  icon?: React.ReactNode;
  // 标题多语言
  locale?: string;
  name?: string;
  key?: string;
  path?: string;
  [key: string]: any;
  parentKeys?: string[];
}
