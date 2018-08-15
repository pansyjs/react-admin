import React from 'react';
import { Icon, Divider } from 'antd';
import { Link } from 'dva/router';
import Debounce from 'lodash-decorators/debounce';
import RightContent from './RightContent';
import styles from './index.scss';

export interface ClickParam {
  key: string;
  keyPath: Array<string>;
  item: any;
  domEvent: any;
}

export interface GlobalHeaderProps {
  collapsed: boolean;
  onCollapse: Function;
  isMobile: boolean;
  logo: string;
  currentUser: object;
  onNoticeVisibleChange: Function;
  onMenuClick: (param: ClickParam) => void;
  onNoticeClear: Function;
  theme: string;
  notices: any[];
}

class GlobalHeader extends React.PureComponent<GlobalHeaderProps> {
  constructor(props) {
    super(props);
  }

  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  toggle() {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  }

  render() {
    const { collapsed, isMobile, logo, ...restProps } = this.props;
    return (
      <div className={styles.header}>
        {isMobile && [
          <Link
            to="/"
            className={styles.logo}
            key="logo"
          >
            <img
              src={logo}
              alt="logo"
              width="32"
            />
          </Link>,
          <Divider
            type="vertical"
            key="line"
          />
        ]}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <RightContent {...restProps} />
      </div>
    )
  }
}

export default GlobalHeader;
