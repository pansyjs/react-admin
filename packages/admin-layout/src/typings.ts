import * as H from 'history';
import { MenuTheme } from 'antd/es/menu/MenuContext';

export type WithFalse<T> = T | false;
export type ContentWidth = 'Fluid' | 'Fixed';

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

export interface Settings {
  // 布局方式
  layout: 'sidemenu' | 'topmenu';
  // 导航主题
  navTheme: MenuTheme
  contentWidth: ContentWidth;
  // 固定Header
  fixedHeader: boolean;
  // 固定左侧菜单
  fixedSiderbar: boolean;
  // Title
  title: string;
  // 菜单配置
  menu: {
    // 是否使用多语言
    locale?: boolean;
    // 是否打开所有
    defaultOpenAll?: boolean
  };
  iconfontUrl: string;
  primaryColor: string;
}
