import React from 'react';
import { Drawer } from 'antd';
import SiderMenu, { ISliderMenuProps } from './SiderMenu';

class SiderMenuWrapper extends React.PureComponent<ISliderMenuProps, any> {
  render() {
    const { isMobile, collapsed, onCollapse } = this.props;

    return isMobile ? (
      <Drawer
        visible={!collapsed}
        placement="left"
        onClose={() => onCollapse(true, 'clickTrigger')}
        style={{
          padding: 0,
          height: '100vh'
        }}
      >
        <SiderMenu {...this.props} collapsed={isMobile ? false : collapsed} />
      </Drawer>
    ) : (
      <SiderMenu {...this.props} />
    );
  }
}

export default SiderMenuWrapper;
