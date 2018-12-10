import React from 'react';
import { Dropdown } from 'antd';
import { DropDownProps } from 'antd/es/dropdown';
import ClassNames from 'classnames';
import styles from './index.less';

class HeaderDropDown extends React.PureComponent<DropDownProps, any> {
  render() {
    const { overlayClassName, ...rest } = this.props;
    return (
      <Dropdown
        overlayClassName={ClassNames(overlayClassName, styles.container)}
        {...rest}
      />
    );
  }
}

export default HeaderDropDown;
