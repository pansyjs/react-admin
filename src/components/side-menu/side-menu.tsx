import React from 'react';
import { Layout } from 'antd';
import { MenuTheme } from 'antd/es/menu';
import classNames from 'classnames';
import PageLoading from '@/components/page-loading';
import { IMenu } from '@/models/menu';
import { BaseMenu, TCollapse } from './base-menu';
import { getDefaultCollapsedSubMenus } from './utils';
import { APP_DEFAULT_CONFIG } from '@/config';

interface IProps {
  prefixCls?: string;
  // 菜单数据
  menuData: IMenu[];
  flatMenuKeys?: any[];
  location?: Location;
  isMobile: boolean;
  collapsed: boolean;
  theme?: MenuTheme;
  fixedSide?: boolean;
  onCollapse?: (collapsed: boolean, type?: TCollapse) => void;
}

interface IState {
  readonly openKeys: string[];
  readonly flatMenuKeysLen?: number;
}

const { Sider } = Layout;
const { title } = APP_DEFAULT_CONFIG;
let firstMount: boolean = true;

class SideMenu extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'side-menu'
  };
  readonly state: IState = {
    openKeys: getDefaultCollapsedSubMenus(this.props)
  };

  componentDidMount() {
    firstMount = false;
  }

  isMainMenu: (key: string) => boolean = key => {
    const { menuData } = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  handleOpenChange: (openKeys: string[]) => void = openKeys => {
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
    });
  };

  render() {
    const {
      collapsed,
      isMobile,
      onCollapse,
      theme,
      fixedSide,
      prefixCls
    } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };

    return (
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={collapse => {
          if (firstMount || !isMobile) {
            onCollapse(collapse);
          }
        }}
        width={256}
        theme={theme}
        className={classNames(prefixCls, {
          [`${prefixCls}__fixed`]: fixedSide,
          [`${prefixCls}__light`]: theme === 'light',
        })}
      >
        <React.Suspense fallback={<PageLoading />}>
          <BaseMenu
            {...this.props}
            mode="inline"
            onOpenChange={this.handleOpenChange}
            style={{ padding: '16px 0', width: '100%' }}
            {...defaultProps}
          />
        </React.Suspense>
      </Sider>
    )
  }
}

export default SideMenu;
