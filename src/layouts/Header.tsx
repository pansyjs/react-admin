import React from 'react';
import { Layout, message } from 'antd';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';

const { Header } = Layout;

export interface HeaderProps {
  isMobile: boolean;
  collapsed: boolean;
  fetchingNotices: boolean;
  handleMenuCollapse: (collapsed: boolean) => any;
}

@connect(({ global, loading }) => ({
  collapsed: global.collapsed,
  notices: global.notices,
  fetchingNotices: loading.effects['global/fetchNotices']
}))
class HeaderView extends React.PureComponent<HeaderProps, any> {
  state = {
    visible: true
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true
      };
    }
    return null;
  }

  getHeadWidth = () => {
    const { isMobile, collapsed } = this.props;
  };

  render() {
    const { isMobile, handleMenuCollapse } = this.props;
    const { visible } = this.state;
    return <div />;
  }
}
