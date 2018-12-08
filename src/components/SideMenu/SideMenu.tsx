import React from 'react';
import { Layout } from 'antd';
import ClassNames from 'classnames';
import { Link } from 'react-router-dom';
import BaseMenu, { BaseMenuProps } from './BaseMenu';
import PageLoading from '../PageLoading';
import ProjectLogo from '../ProjectLogo';
import { getDefaultCollapsedSubMenus } from './utils';
import styles from './index.less';

const { Sider } = Layout;

export interface SideMenuProps extends BaseMenuProps {
  logo: string;
  collapsed?: boolean;
  fixSideBar?: boolean;
}

interface State {
  readonly openKeys: string[];
}

class SideMenu extends React.PureComponent<SideMenuProps, State> {
  readonly state: State = {
    openKeys: getDefaultCollapsedSubMenus(this.props)
  };

  //
  isMainMenu = (key) => {
    const { menuData } = this.props;
    return menuData.some((item) => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  // 菜单打开的回调
  handleOpenChange = (openKeys) => {
    const moreThanOne =
      openKeys.filter((openKey) => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys]
    });
  };

  render() {
    const { logo, theme, collapsed, onCollapse, fixSideBar } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        breakpoint="lg"
        width={256}
        className={ClassNames(styles.sideMenu, {
          [styles.fixSideBar]: fixSideBar,
          [styles.light]: theme === 'light'
        })}
      >
        <ProjectLogo logo={logo} className={styles.logo} />
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
    );
  }
}

export default SideMenu;
