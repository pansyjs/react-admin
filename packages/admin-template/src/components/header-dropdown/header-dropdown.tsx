import React from 'react';
import { Dropdown } from 'antd';
import { DropDownProps } from 'antd/es/dropdown';
import classNames from '@pansy/classnames';
import './header-dropdown.less';

interface HeaderDropdownProps extends DropDownProps {
  prefixCls?: string;
}

export const HeaderDropdown: React.FC<HeaderDropdownProps> = (props) => {
  const { prefixCls, overlayClassName, ...restProps } = props;

  return <Dropdown overlayClassName={classNames(prefixCls, overlayClassName)} {...restProps} />;
};

HeaderDropdown.defaultProps = {
  prefixCls: 'lotus-header-dropdown'
};
