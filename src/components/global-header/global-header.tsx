import React from 'react';
import { Tabs, Icon } from 'antd';
import H from 'history';
import { FormattedMessage } from 'umi-plugin-react/locale';
import RightContent from './right-content';
import { IMenu } from '@/components/side-menu';
import { ICurrentUser } from '@/models/user';
import './global-header.less';

export interface ITabData {
  id: string;
  location: H.Location,
  menuData: IMenu
}

interface IProps {
  prefixCls?: string;
  isMobile?: boolean;
  onMenuClick?: (key: string) => void;
  currentUser?: ICurrentUser;
  tabList?: ITabData[];
  onTabClick?: (data: ITabData) => void;
  onTabRemove?: (id: string) => void;
}

const { TabPane } = Tabs;

export class GlobalHeader extends React.Component<IProps, any> {
  static defaultProps = {
    prefixCls: 'global-header'
  };

  handleTabClick = (key) => {
    const { tabList, onTabClick } = this.props;

    tabList.forEach((item) => {
      if (item.id === key) {
        onTabClick && onTabClick(item);
      }
    });
  };

  handleTabEdit = (targetKey, action) => {
    const { onTabRemove } = this.props;
    if (action !== 'remove') return;
    onTabRemove && onTabRemove(targetKey);
  };

  render() {
    const { prefixCls, onMenuClick, currentUser, tabList } = this.props;

    return (
      <div className={prefixCls}>
        {tabList && (
          <Tabs
            defaultActiveKey="1"
            tabPosition="top"
            type={tabList.length === 1 ? 'card' : 'editable-card'}
            hideAdd
            onTabClick={this.handleTabClick}
            onEdit={this.handleTabEdit}
          >
            {tabList.map((item) => (
              <TabPane
                tab={
                  <span>
                    {item.menuData!.icon && (
                      <Icon type={item.menuData!.icon} />
                    )}
                    <FormattedMessage id={item.menuData!.locale} />
                  </span>
                }
                key={item.id}
              />
            ))}
          </Tabs>
        )}
        <RightContent
          prefixCls={prefixCls}
          onMenuClick={onMenuClick}
          currentUser={currentUser}
        />
      </div>
    )
  }
}
