import React from 'react';
import { Spin, Tag, Icon, Menu, Dropdown, Avatar, Tooltip } from 'antd';
import groupBy from 'lodash/groupBy';
import ClassNames from 'classnames';
import { currentUserType } from '@/types/user';
import { ClickParam } from './index';
import HeaderSearch from '../HeaderSearch';
import SelectLang from '../SelectLang';
import styles from 'index.less';

export interface GlobalHeaderRightProps {
  currentUser: currentUserType;
  onNoticeVisibleChange: Function;
  onMenuClick: (param: ClickParam) => void;
  onNoticeClear: Function;
  theme: string;
  notices: any[];
}

class GlobalHeaderRight extends React.PureComponent<
  GlobalHeaderRightProps,
  any
> {
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

    return (
      <div className={className}>
        <HeaderSearch
          className={ClassNames(styles.action, styles.search)}
          placeholder={formatMessage({ id: 'component.globalHeader.search' })}
          dataSource={[
            formatMessage({ id: 'component.globalHeader.search.example1' }),
            formatMessage({ id: 'component.globalHeader.search.example2' }),
            formatMessage({ id: 'component.globalHeader.search.example3' })
          ]}
        />
        {/** 使用文档入口 */}
        <Tooltip title={formatMessage({ id: 'component.globalHeader.help' })}>
          <a
            target="_blank"
            href="https://pro.ant.design/docs/getting-started"
            rel="noopener noreferrer"
            className={styles.action}
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip>
        {currentUser.name ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.avatar}
                alt="avatar"
              />
              <span className={styles.name}>{currentUser.name}</span>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
        <SelectLang className={styles.action} />
      </div>
    );
  }
}

export default GlobalHeaderRight;
