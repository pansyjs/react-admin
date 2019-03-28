import React from 'react';
import { Drawer } from 'antd';
import SideMenu, { SideMenuProps } from './SideMenu';
import { getFlatMenuKeys } from './utils';

class SideMenuWrapper extends React.PureComponent<SideMenuProps, any> {
  render() {
    const { menuData, isMobile, collapsed, onCollapse } = this.props;
    const flatMenuKeys = getFlatMenuKeys(menuData);

    return isMobile ? (
      <Drawer
        visible={!collapsed}
        placement="left"
        onClose={() => onCollapse(true)}
        style={{
          padding: 0,
          height: '100vh'
        }}
      >
        <SideMenu
          {...this.props}
          flatMenuKeys={flatMenuKeys}
          collapsed={isMobile ? false : collapsed}
        />
      </Drawer>
    ) : (
      <SideMenu {...this.props} flatMenuKeys={flatMenuKeys} />
    );
  }
}

export default SideMenuWrapper;
