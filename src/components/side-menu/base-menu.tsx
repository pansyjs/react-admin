import React from 'react';
import Link from 'umi/link';
import { Icon, Menu } from 'antd';
import { MenuMode, MenuTheme } from 'antd/es/menu';
import { IconFont } from '@/components/icon-font';
import { urlToList } from '@/utils/pathTools';
import { isUrl } from '@/utils/utils';
import { IMenu } from '@/models/menu';
import { getMenuMatches } from './utils';

export declare type TCollapse = 'clickTrigger' | 'responsive';
interface IProps {
  className?: string;
  style?: React.CSSProperties;
  location?: Location;
  // 菜单类型
  mode?: MenuMode;
  flatMenuKeys?: string[];
  openKeys?: string[];
  // 主题颜色
  theme?: MenuTheme;
  // 是否是手机
  isMobile?: boolean;
  // 菜单数据
  menuData?: IMenu[];
  // 菜单是否收起
  collapsed?: boolean;
  // SubMenu 展开/关闭的回调
  onOpenChange?: (openKeys: string[]) => void;
  onCollapse?: (collapsed: boolean, type?: TCollapse) => void;
}

const { SubMenu } = Menu;
// 获取Icon图标
const getIcon = icon => {
  if (typeof icon === 'string') {
    if (isUrl(icon)) {
      return (
        <Icon
          component={() => (
            <img src={icon} alt="icon" className="side-menu__icon" />
          )}
        />
      );
    }
    if (icon.startsWith('icon-')) {
      return <IconFont type={icon} />;
    }
    return <Icon type={icon} />;
  }
  return icon;
};

export class BaseMenu extends React.Component<IProps, any> {

  // 获得菜单子节点
  getNavMenuItems: (menusData: IMenu[]) => IMenu[] = menus => {
    if (!menus) {
      return [];
    }
    return menus
      .filter(item => item.name && !item.hideInMenu)
      .map(item => this.getSubMenuOrItem(item))
      .filter(item => item);
  };

  getSubMenuOrItem = (item) => {
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
      const { name } = item;
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{name}</span>
              </span>
            ) : (
              name
            )
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item
        key={item.path}
      >
        {this.getMenuItemPath(item)}
      </Menu.Item>
    );
  };

  // 判断是否是http链接.返回 Link 或 a
  getMenuItemPath = (item) => {
    const { location, isMobile, onCollapse } = this.props;
    const { name } = item;
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }

    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
              onCollapse(true);
            }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  // 转换路径
  conversionPath = (path) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  // 获取当前选择的菜单
  getSelectedMenuKeys = (pathname) => {
    const { flatMenuKeys } = this.props;

    return urlToList(pathname).map((item) => {
      return getMenuMatches(flatMenuKeys, item).pop();
    })
  };

  render() {
    const {
      className,
      style,
      mode,
      theme,
      openKeys,
      menuData,
      collapsed,
      onOpenChange,
      location: { pathname }
    } = this.props;

    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }

    let props = {};
    if (openKeys && !collapsed) {
      props = {
        openKeys: openKeys.length === 0
          ? [...selectedKeys]
          : openKeys,
      };
    }

    return (
      <Menu
        style={style}
        mode={mode}
        theme={theme}
        className={className}
        onOpenChange={onOpenChange}
        {...props}
      >
        {this.getNavMenuItems(menuData)}
      </Menu>
    )

  }
}
