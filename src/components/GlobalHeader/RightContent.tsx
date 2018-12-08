import React from 'react';
import { Dropdown, Avatar, Menu, Icon, Spin } from 'antd';
import { SelectParam } from 'antd/es/menu';
import ClassNames from 'classnames';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { currentUserType } from '@/types/user';
import HeaderSearch, { HeaderSearchProps } from '../HeaderSearch';
import SelectLang from '../SelectLang';
import styles from './index.less';

export interface GlobalHeaderRightProps {
  currentUser: currentUserType;
  onMenuClick: (params: SelectParam) => void;
  headerSearch?: boolean | HeaderSearchProps;
}

class GlobalHeaderRight extends React.PureComponent<
  GlobalHeaderRightProps,
  any
> {
  render() {
    const { onMenuClick, currentUser } = this.props;
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
