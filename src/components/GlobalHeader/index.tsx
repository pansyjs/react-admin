import React from 'react';
import { Icon } from 'antd';
import Link from 'umi/link';
import Debounce from 'lodash-decorators/debounce';
import RightContent from './RightContent';
import styles from './index.less';

export interface GlobalHeaderProps {
  logo: string;
  isMobile: boolean;
  collapsed?: boolean;
  currentUser?: any;
  onCollapse?: (collapse: boolean) => void;
}

class GlobalHeader extends React.PureComponent<GlobalHeaderProps, any> {
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse && onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  render() {
    const { collapsed, isMobile, logo, currentUser } = this.props;
    return (
      <div className={styles.header}>
        {isMobile && (
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>
        )}
        <span className={styles.trigger} onClick={this.toggle}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </span>
        <RightContent currentUser={currentUser} />
      </div>
    );
  }
}

export default GlobalHeader;
