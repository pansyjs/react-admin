import React from 'react';
import router from 'umi/router';
import { Layout } from 'antd';
import { connect } from 'dva';
import GlobalHeader from '@/components/global-header';
import { ConnectProps, ConnectState } from '@/models/connect';
import './header.less';

export interface IHeaderViewProps extends Required<ConnectProps>{
  isMobile?: boolean;
  autoHideHeader?: boolean;
}

const { Header } = Layout;

const HeaderView: React.FC<IHeaderViewProps> = (props) => {
  const { dispatch } = props;

  const handleMenuClick = (key) => {
    // 跳转到个人中心
    if (key === 'account-center') {
      router.push('/account/center');
      return;
    }

    // 退出登录
    if (key === 'logout') {
      dispatch({
        type: 'login/fetchLogout'
      })
    }
  };

  return (
    <Header style={{ padding: 0, zIndex: 2 }}>
      <GlobalHeader
        onMenuClick={handleMenuClick}
        {...props}
      />
    </Header>
  )
};

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(HeaderView);
