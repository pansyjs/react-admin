import React from 'react';
import classNames from 'classnames';
import { Dropdown } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';
import styles from './header-dropdown.less';

export const HeaderDropdown: React.FC<DropDownProps> = (props) => {
  const { overlayClassName, ...restProps } = props;

  return (
    <Dropdown
      overlayClassName={classNames(styles.container, overlayClassName)}
      {...restProps}
    />
  )
};
