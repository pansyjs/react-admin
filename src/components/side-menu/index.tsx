import React from 'react';
import { Drawer } from 'antd';
import { MenuTheme } from 'antd/es/menu';
import { IMenu } from '@/models/menu';
import SideMenu from './side-menu';
import { getFlatMenuKeys } from './utils';

interface IProp {
  isMobile: boolean;
  menuData: IMenu[];
  collapsed: boolean;
  theme?: MenuTheme;
  onCollapse: (payload: boolean) => void;
}

const SideMenuWrapper: React.FC<IProp> = (props) => {
  const { isMobile, menuData, collapsed, onCollapse } = props;
  const flatMenuKeys = getFlatMenuKeys(menuData);

  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      onClose={() => onCollapse(true)}
      style={{
        padding: 0,
        height: '100vh',
      }}
    >
      <SideMenu
        {...props}
        flatMenuKeys={flatMenuKeys}
        collapsed={isMobile ? false : collapsed}
      />
    </Drawer>
  ) : (
    <SideMenu
      {...props}
      flatMenuKeys={flatMenuKeys}
    />
  );
};

export default React.memo(SideMenuWrapper);
