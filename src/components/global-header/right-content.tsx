import React from 'react';
import classNames from 'classnames';
import groupBy from 'lodash/groupBy';
import { Spin, Tag, Menu, Icon, Avatar, Tooltip, message } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { HeaderDropdown } from '@/components/header-dropdown';
import { SelectLang } from '@/components/select-lang';
import { ICurrentUser } from '@/models/user';

interface IProps {
  prefixCls?: string;
  notices?: any[];
  onMenuClick?: (key: string) => void;
  currentUser?: ICurrentUser;
}

class GlobalHeaderRight extends React.Component<IProps> {

  handleMenuClick = ({ key }) => {
    const { onMenuClick } = this.props;
    onMenuClick && onMenuClick(key);
  };

  render() {
    const {
      prefixCls,
      currentUser = {} as any,
    } = this.props;

    const menu = (
      <Menu
        className={`${prefixCls}__menu`}
        selectedKeys={[]}
        onClick={this.handleMenuClick}
      >
        <Menu.Item key="account-center">
          <Icon type="user" />
          <FormattedMessage id="menu.account.center" defaultMessage="account center" />
        </Menu.Item>
        <Menu.Item key="account-settings">
          <Icon type="setting" />
          <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={`${prefixCls}__right`}>
        {currentUser.name ? (
          <HeaderDropdown overlay={menu}>
          <span
            className={classNames({
              [`${prefixCls}__action`]: true,
              [`${prefixCls}__account`]: true
            })}
          >
            <Avatar
              size="small"
              className={`${prefixCls}__avatar`}
              src={currentUser.avatar}
              alt="avatar"
            />
            <span>{currentUser.name}</span>
          </span>
          </HeaderDropdown>
        ) : (
          <Spin
            size="small"
            style={{ marginLeft: 8, marginRight: 8 }}
          />
        )}
        <SelectLang className={`${prefixCls}__action`} />
      </div>
    )

  }
}

export default GlobalHeaderRight;
