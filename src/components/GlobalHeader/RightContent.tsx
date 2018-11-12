import React, { PureComponent } from 'react';
import { Spin, Tag, Icon, Menu, Dropdown, Avatar, Tooltip } from 'antd';
import groupBy from 'lodash/groupBy';
import { ClickParam } from './index';
import HeaderSearch from '../HeaderSearch';

import styles from 'index.less';

export interface GlobalHeaderRightProps {
  currentUser: object;
  onNoticeVisibleChange: Function;
  onMenuClick: (param: ClickParam) => void;
  onNoticeClear: Function;
  theme: string;
  notices: any[];
}

class GlobalHeaderRight extends PureComponent<GlobalHeaderRightProps, any> {
  constructor(props) {
    super(props);
  }

  getNoticeData() {
    const { notices = [] } = this.props;

    if (notices.length === 0) {
      return {};
    }

    const newNotices = notices.map((notice) => {
      console.log(notice);
    });

    return groupBy(newNotices, 'type');
  }

  render() {
    const {
      currentUser,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      theme
    } = this.props;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="userCenter">
          <Icon type="user" />
          个人中心
        </Menu.Item>
        <Menu.Item key="setting">
          <Icon type="setting" />
          账户设置
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />
          触发报错
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );

    const noticeData = this.getNoticeData();

    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }

    return <div className={className} />;
  }
}

export default GlobalHeaderRight;
