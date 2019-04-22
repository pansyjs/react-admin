import React from 'react';
import Link from 'umi/link';
import { Layout } from 'antd';
import classNames from 'classnames';
import PageLoading from '@/components/page-loading';
import BaseMenu, { IBaseMenuProps } from './base-menu';
import { getDefaultCollapsedSubMenus } from './utils';
import { APP_DEFAULT_CONFIG } from '@/config';
import './side-menu.less';

export interface ISideMenuProps extends IBaseMenuProps {
  prefixCls?: string;
  logo?: string;
  fixedSide?: boolean;
}

interface IState {
  readonly openKeys: string[];
  readonly flatMenuKeysLen?: number;
}

const { Sider } = Layout;
const { title } = APP_DEFAULT_CONFIG;
let firstMount: boolean = true;

class SideMenu extends React.Component<ISideMenuProps, IState> {
  static defaultProps: Partial<ISideMenuProps> = {
    prefixCls: 'lotus-side-menu',
    flatMenuKeys: [],
    onCollapse: () => void 0,
    isMobile: false,
    openKeys: [],
    collapsed: false,
    menuData: [],
    onOpenChange: () => void 0,
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
    const { prefixCls, collapsed, onCollapse, theme, fixedSide, logo, isMobile } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };

    return (
      <Sider
        collapsible
        trigger={null}
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={(collapse) => {
          if (firstMount) {
            onCollapse!(collapse);
          }
        }}
        width={275}
        theme={theme}
        className={classNames(prefixCls, {
          [`${prefixCls}__fixed`]: fixedSide,
          [`${prefixCls}__light`]: theme === 'light',
        })}
      >
        <div className={`${prefixCls}__logo`}>
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>{title}</h1>
          </Link>
        </div>
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
