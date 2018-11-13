import React from 'react';
import { Drawer } from 'antd';
import SliderMenu, { ISliderMenuProps } from './SliderMenu';

const getFlatMenuKeys = (menuData) => {
  let keys = [];
  menuData.forEach((item) => {
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
    keys.push(item.path);
  });
  return keys;
};

class SliderMenuWrapper extends React.PureComponent<ISliderMenuProps, any> {
  render() {
    const { isMobile, menuData, collapsed, onCollapse } = this.props;

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
        <SliderMenu
          {...this.props}
          flatMenuKeys={getFlatMenuKeys(menuData)}
          collapsed={isMobile ? false : collapsed}
        />
      </Drawer>
    ) : (
      <SliderMenu {...this.props} flatMenuKeys={getFlatMenuKeys(menuData)} />
    );
  }
}

export default SliderMenuWrapper;
