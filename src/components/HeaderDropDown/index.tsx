import React from 'react';
import { Dropdown } from 'antd';
import { DropDownProps } from 'antd/es/dropdown';
import ClassNames from 'classnames';
import styles from './index.less';

class HeaderDropDown extends React.PureComponent<DropDownProps, any> {
  render() {
    const { className, ...rest } = this.props;
    return (
      <Dropdown className={ClassNames(className, styles.container)} {...rest} />
    );
  }
}

export default HeaderDropDown;
