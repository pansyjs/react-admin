import React from 'react';
import { Tabs, Icon } from 'antd';
import RightContent from './right-content';
import { ICurrentUser } from '@/models/user';
import './global-header.less';

interface IProps {
  prefixCls?: string;
  isMobile?: boolean;
  onMenuClick?: (key: string) => void;
  currentUser?: ICurrentUser;
}

const { TabPane } = Tabs;

export class GlobalHeader extends React.Component<IProps, any> {
  static defaultProps = {
    prefixCls: 'global-header'
  };

  render() {
    const { prefixCls, onMenuClick, currentUser } = this.props;

    return (
      <div className={prefixCls}>
        <Tabs
          defaultActiveKey="1"
          tabPosition="top"
          type="editable-card"
          hideAdd
        >
          <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="1" />
          <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="2" />
          <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="3" />
          <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="4" />
          <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="5" />
          <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="6" />
          <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="7" />
          <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="8" />
          <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="9" />
          <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="10" />
        </Tabs>

        <RightContent
          prefixCls={prefixCls}
          onMenuClick={onMenuClick}
          currentUser={currentUser}
        />
      </div>
    )
  }
}
