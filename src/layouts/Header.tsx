import React from 'react';
import { Layout, message } from 'antd';
import Animate from 'rc-animate';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import GlobalHeader from '@/components/GlobalHeader';

const { Header } = Layout;

export interface HeaderProps {
  isMobile?: boolean;
  collapsed?: boolean;
  fetchingNotices?: boolean;
  handleMenuCollapse?: (collapsed: boolean) => any;
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

    const HeaderDom = visible ? <Header>123</Header> : null;
    return (
      <Animate component="" transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

export default HeaderView;
