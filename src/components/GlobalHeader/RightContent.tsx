import React from 'react';
import { Dropdown, Avatar, Menu, Icon, Spin, Tag } from 'antd';
import { SelectParam } from 'antd/es/menu';
import ClassNames from 'classnames';
import Moment from 'moment';
import groupBy from 'lodash/groupBy';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { currentUserType } from '@/types/user';
import HeaderSearch, { HeaderSearchProps } from '../HeaderSearch';
import NoticeIcon, { NoticeIconProps } from '../NoticeIcon';
import { SelectLang } from '@/components/select-lang';
import styles from './index.less';

export interface GlobalHeaderRightProps {
  currentUser?: currentUserType;
  onMenuClick?: (params: SelectParam) => void;
  headerSearch?: boolean | HeaderSearchProps;
  noticeIcon?: false | NoticeIconProps;
  notices?: any[];
}

class GlobalHeaderRight extends React.PureComponent<
  GlobalHeaderRightProps,
  any
> {
  getNoticeData() {
    const { notices = [] } = this.props;

    if (notices.length === 0) {
      return {};
    }

    const newNotices = notices.map((notice) => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = Moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold'
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  // 获取未读消息
  getUnreadData = (noticeData) => {
    const unreadMsg = {};
    Object.entries(noticeData).forEach(([key, value]) => {
      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }
      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter((item) => !item.read).length;
      }
    });
    return unreadMsg;
  };

  getNoticeDom = () => {
    const { noticeIcon, currentUser } = this.props;

    if (!noticeIcon || noticeIcon === false) {
      return null;
    } else {
      const {
        onItemClick,
        onClear,
        onPopupVisibleChange,
        loading
      } = noticeIcon;
      const notices: any = this.getNoticeData();
      const unreadMsg: any = this.getUnreadData(notices);

      return (
        <NoticeIcon
          className={styles.action}
          count={currentUser.unreadCount}
          onItemClick={onItemClick}
          locale={{
            emptyText: formatMessage({ id: 'component.noticeIcon.empty' }),
            clear: formatMessage({ id: 'component.noticeIcon.clear' })
          }}
          onClear={onClear}
          onPopupVisibleChange={onPopupVisibleChange}
          loading={loading}
          clearClose={true}
        >
          <NoticeIcon.Tab
            count={unreadMsg.notification}
            data={notices.notification}
            title={formatMessage({ id: 'component.globalHeader.notification' })}
            name="notification"
            emptyText={formatMessage({
              id: 'component.globalHeader.notification.empty'
            })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
          />
          <NoticeIcon.Tab
            count={unreadMsg.message}
            data={notices.message}
            title={formatMessage({ id: 'component.globalHeader.message' })}
            name="message"
            emptyText={formatMessage({
              id: 'component.globalHeader.message.empty'
            })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          />
          <NoticeIcon.Tab
            count={unreadMsg.event}
            data={notices.event}
            title={formatMessage({ id: 'component.globalHeader.event' })}
            name="event"
            emptyText={formatMessage({
              id: 'component.globalHeader.event.empty'
            })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
          />
        </NoticeIcon>
      );
    }
  };
  render() {
    const { onMenuClick, currentUser } = this.props;

    const NoticeDom = this.getNoticeDom();

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="userCenter">
          <Icon type="user" />
          <FormattedMessage
            id="menu.account.center"
            defaultMessage="account center"
          />
        </Menu.Item>
        <Menu.Item key="userInfo">
          <Icon type="setting" />
          <FormattedMessage
            id="menu.account.settings"
            defaultMessage="account settings"
          />
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />
          <FormattedMessage
            id="menu.account.trigger"
            defaultMessage="Trigger Error"
          />
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.right}>
        <HeaderSearch
          className={ClassNames(styles.action, styles.search)}
          placeholder={formatMessage({ id: 'component.globalHeader.search' })}
          dataSource={[
            formatMessage({ id: 'component.globalHeader.search.example1' }),
            formatMessage({ id: 'component.globalHeader.search.example2' }),
            formatMessage({ id: 'component.globalHeader.search.example3' })
          ]}
          onSearch={(value) => {
            console.log('input', value);
          }}
          onPressEnter={(value) => {
            console.log('enter', value);
          }}
        />
        {/** 消息通知 */}
        {NoticeDom}
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
        {/** 选择语言 */}
        <SelectLang className={styles.action} />
      </div>
    );
  }
}

export default GlobalHeaderRight;
