import React from 'react';
import ReactDOM from 'react-dom';
import { Icon, Tabs, Badge, Spin } from 'antd';
import ClassNames from 'classnames';
import HeaderDropDown from '../HeaderDropDown';
import { NoticeData } from './NoticeList';
import List from './NoticeList';
import NoticeTab from './NoticeTab';
import styles from './index.less';

const { TabPane } = Tabs;

export interface NoticeIconProps {
  className?: string;
  // 消息总数
  count?: number;
  // 消息显示的图标
  bell?: React.ReactNode;
  // 弹出卡片加载状态
  loading?: boolean;
  // 点击清空按钮的回调
  onClear?: (tabName: string) => void;
  // 点击列表项的回调
  onItemClick?: (item: NoticeData, tabProps: NoticeIconProps) => void;
  // 切换页签的回调
  onTabChange?: (tabTile: string) => void;
  // 弹出卡片显隐的回调
  onPopupVisibleChange?: (visible: boolean) => void;
  style?: React.CSSProperties;
  // 控制下拉菜单显隐
  dropDownVisible?: boolean;
  // 清空是否关闭菜单
  clearClose?: boolean;
  // 默认文案
  locale?: { emptyText: string; clear: string };
}

interface DefaultProps {
  bell: React.ReactNode;
  loading: boolean;
  clearClose: boolean;
}

interface State {
  readonly visible: boolean;
}

class NoticeIcon extends React.PureComponent<NoticeIconProps, State> {
  static Tab = NoticeTab;
  private dropDown: React.ReactNode;

  static defaultProps: DefaultProps = {
    bell: <Icon type="bell" className={styles.icon} />,
    loading: false,
    clearClose: false
  };

  readonly state: State = {
    visible: false
  };

  onItemClick = (item, tabProps) => {
    const { onItemClick } = this.props;
    const { clickClose } = item;
    onItemClick && onItemClick(item, tabProps);
    if (clickClose) {
      this.setState({
        visible: false
      });
    }
  };

  onTabChange = (tabType) => {
    const { onTabChange } = this.props;
    onTabChange && onTabChange(tabType);
  };

  onClear = (name) => {
    const { onClear, clearClose } = this.props;
    onClear && onClear(name);
    if (clearClose) {
      this.setState({
        visible: false
      });
    }
  };

  getNotificationBox() {
    const { children, loading, locale, onClear } = this.props;
    if (!children) return null;
    const panes = React.Children.map(
      children as React.ReactNode,
      (child: React.ReactElement<any>) => {
        const { list, title, name, count } = child.props;
        const len = list && list.length ? list.length : 0;
        const msgCount = count || count === 0 ? count : len;
        const tabTitle = msgCount > 0 ? `${title} (${msgCount})` : title;
        return (
          <TabPane tab={tabTitle} key={name}>
            <List
              {...child.props}
              data={list}
              onClick={(item) => this.onItemClick(item, child.props)}
              onClear={this.onClear}
              title={title}
              locale={locale}
            />
          </TabPane>
        );
      }
    );
    return (
      <Spin spinning={loading} delay={0}>
        <Tabs className={styles.tabs} onChange={this.onTabChange}>
          {panes}
        </Tabs>
      </Spin>
    );
  }

  handleVisibleChange = (visible: boolean) => {
    const { onPopupVisibleChange } = this.props;
    this.setState({
      visible
    });
    onPopupVisibleChange(visible);
  };

  render() {
    const { className, count, dropDownVisible, bell } = this.props;
    const { visible } = this.state;
    const notificationBox = this.getNotificationBox();
    const trigger = (
      <span
        className={ClassNames(className, styles.noticeButton, {
          opened: visible
        })}
      >
        <Badge
          count={count}
          style={{ boxShadow: 'none' }}
          className={styles.badge}
        >
          {bell}
        </Badge>
      </span>
    );

    if (!notificationBox) {
      return trigger;
    }

    const dropDownProps: { visible?: boolean } = {};

    if ('dropDownVisible' in this.props) {
      dropDownProps.visible = dropDownVisible;
    }

    return (
      <HeaderDropDown
        placement="bottomRight"
        overlay={notificationBox}
        overlayClassName={styles.popover}
        trigger={['click']}
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
        ref={(node) => (this.dropDown = ReactDOM.findDOMNode(node))}
      >
        {trigger}
      </HeaderDropDown>
    );
  }
}

export default NoticeIcon;
