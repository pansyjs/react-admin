import React from 'react';
import { Tabs } from 'antd';
import H from 'history';
import { Route } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'umi-plugin-react/locale';
import IconFont from '@/components/icon-font';
import { IMenu } from '@/components/side-menu';
import './tab-pages.less';

export interface ITab {
  id?: string;
  location?: H.Location,
  menuData?: IMenu
}

interface IProps {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
  tabList?: ITab[];
  onClick?: (data: ITab) => void;
  onRemove?: (id: string) => void;
  activeKey?: string;
}

const { TabPane } = Tabs;

const TabPages: React.FC<IProps> = (props) => {
  const {
    className,
    prefixCls,
    style,
    tabList,
    onClick,
    onRemove,
    activeKey
  } = props;

  const handleTabClick = (key) => {
    tabList.forEach((item) => {
      if (item.id === key) {
        onClick && onClick(item);
      }
    });
  };

  const handleTabEdit = (targetKey, action) => {
    if (action !== 'remove') return;
    onRemove && onRemove(targetKey);
  };

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      {tabList && (
        <Tabs
          activeKey={activeKey}
          tabPosition="top"
          type={tabList.length === 1 ? 'card' : 'editable-card'}
          hideAdd
          onChange={handleTabClick}
          onEdit={handleTabEdit}
        >
          {tabList.map((item) => (
            <TabPane
              tab={
                <span>
                  {item.menuData!.icon && (
                    <IconFont type={item.menuData!.icon} />
                  )}
                    <FormattedMessage id={item.menuData!.locale} />
                </span>
              }
              key={item.id}
            >
              <Route
                key={item.id}
                path={item.menuData.path}
                component={item.menuData.component}
                exact={item.menuData.exact}
              />
            </TabPane>
          ))}
        </Tabs>
      )}
    </div>
  )
};

TabPages.defaultProps = {
  prefixCls: 'lotus-tab-pages',
  tabList: []
};

export default TabPages;
