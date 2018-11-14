import React from 'react';
import H from 'history';
import { Menu, Icon } from 'antd';
import { CollapseType } from 'antd/es/layout/Sider';
import { MenuMode, MenuTheme } from 'antd/es/menu';
import { Link } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import MemoizeOne from 'memoize-one';
import { urlToList } from '@/utils/pathTools';
import { getFlatMenuKeys, getMenuMatches } from './utils';
import styles from './index.less';

const { SubMenu } = Menu;

/**
 * 获取菜单Icon图标
 * 允许菜单icon配置为 `strong` 或者 `ReactNode`
 * @param icon
 * @example
 *   icon: 'setting',
 *   icon: 'http://demo.com/icon.png',
 *   icon: <Icon type="setting" />,
 */
const getIcon = (icon) => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

export interface IBaseMenuProps {
  openKeys?: string[]; // 当前打开的菜单
  theme?: MenuTheme; // 菜单主题
  mode?: MenuMode; // 菜单模式
  onOpenChange?: (openKeys: string[]) => void;
  style?: React.CSSProperties;
  location: H.Location;
  menuData: any[];
  Authorized?: any;
  isMobile: boolean;
  onCollapse: (collapsed: boolean, type: CollapseType) => void;
}

interface DefaultProps {
  readonly theme: MenuTheme;
  readonly mode: MenuMode;
}

class BaseMenu extends React.PureComponent<IBaseMenuProps> {
  private flatMenuKeys: any[];
  static defaultProps: DefaultProps = {
    theme: 'dark',
    mode: 'vertical'
  };

  constructor(props: IBaseMenuProps) {
    super(props);
    this.getSelectedMenuKeys = MemoizeOne(this.getSelectedMenuKeys, isEqual);
    this.flatMenuKeys = getFlatMenuKeys(props.menuData);
  }

  // 获取菜单子节点
  getNavMenuItems = (menusData, parent?: string) => {
    if (!menusData) {
      return [];
    }
    return (
      menusData
        // 处理菜单数据 过滤掉需要隐藏的菜单
        .filter((item) => item.name && !item.hideInMenu)
        .map((item) => {
          // make dom
          const ItemDom = this.getSubMenuOrItem(item);
          return this.checkPermissionItem(item.authority, ItemDom);
        })
    );
  };

  getSubMenuOrItem = (item) => {
    // doc: add hideChildrenInMenu
    if (
      item.children &&
      !item.hideChildrenInMenu &&
      item.children.some((child) => child.name)
    ) {
      console.log(name);
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
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  checkPermissionItem = (authority, ItemDom) => {
    const { Authorized } = this.props;
    if (Authorized && Authorized.check) {
      const { check } = Authorized;
      return check(authority, ItemDom);
    }
    return ItemDom;
  };

  getMenuItemPath = (item) => {
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
    const { location, isMobile, onCollapse } = this.props;
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
                onCollapse(true, 'clickTrigger');
              }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  conversionPath = (path) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  /**
   * 获取当前选定的菜单
   * @param pathname
   */
  getSelectedMenuKeys = (pathname: string) => {
    return urlToList(pathname).map((itemPath) =>
      getMenuMatches(this.flatMenuKeys, itemPath).pop()
    );
  };

  render() {
    const {
      openKeys,
      theme,
      mode,
      location: { pathname },
      onOpenChange,
      menuData,
      style
    } = this.props;

    // 当前选择的菜单
    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }

    let props = {};
    if (openKeys) {
      props = {
        openKeys
      };
    }

    return (
      <Menu
        key="Menu"
        mode={mode}
        theme={theme}
        onOpenChange={onOpenChange}
        selectedKeys={selectedKeys}
        style={style}
        className={mode === 'horizontal' ? 'top-nav-menu' : ''}
        {...props}
      >
        {this.getNavMenuItems(menuData)}
      </Menu>
    );
  }
}

export default BaseMenu;
