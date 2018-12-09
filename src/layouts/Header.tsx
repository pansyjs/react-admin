import React from 'react';
import { Layout, message } from 'antd';
import Animate from 'rc-animate';
import { formatMessage } from 'umi/locale';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import GlobalHeader from '@/components/GlobalHeader';
import { settingsModelState } from '@/types/settings';

const { Header } = Layout;

export interface HeaderProps {
  logo: string;
  isMobile: boolean;
  dispatch: Dispatch<any>;
  collapsed: boolean;
  handleMenuCollapse?: (collapsed: boolean) => any;
  fetchingNotices?: boolean;
  currentUser?: any;
  setting: settingsModelState;
}

@connect(({ global, loading, user }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  notices: global.notices,
  fetchingNotices: loading.effects['global/fetchNotices']
}))
class HeaderView extends React.PureComponent<HeaderProps, any> {
  state = {
    visible: true
  };

  handleNoticeVisibleChange = (visible) => {
    console.log(visible);
    // if (visible) {
    //   const { dispatch } = this.props;
    //   dispatch({
    //     type: 'global/fetchNotices',
    //   });
    // }
  };

  getHeadWidth = () => {
    const { isMobile, collapsed } = this.props;
  };

  render() {
    const {
      isMobile,
      handleMenuCollapse,
      currentUser,
      logo,
      collapsed,
      setting
    } = this.props;
    const { visible } = this.state;

    const HeaderDom = visible ? (
      <Header style={{ padding: 0 }}>
        <GlobalHeader
          logo={logo}
          collapsed={collapsed}
          onCollapse={handleMenuCollapse}
          isMobile={isMobile}
          currentUser={currentUser}
          notice={{
            onPopupVisibleChange: this.handleNoticeVisibleChange
          }}
        />
      </Header>
    ) : null;

    return (
      <Animate component="" transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

export default HeaderView;
