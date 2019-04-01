import React from 'react';
import { Layout, message } from 'antd';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

interface IProps {
  isMobile: boolean;
  collapsed: boolean;
  dispatch: (args: any) => void;
  autoHideHeader: boolean;
  handleMenuCollapse: (args: boolean) => void;
}

interface IState {
  visible: boolean;
}

const { Header } = Layout;

@connect(({  }) => ({

}))
class HeaderView extends React.Component<IProps, IState> {
  render() {
    return (
      <div>
        123
      </div>
    )
  }
}

export default HeaderView;
