import React from 'react';
import ReactDOM from 'react-dom';
import { Icon, Tabs, Badge, Spin } from 'antd';
import { PopoverProps } from 'antd/es/popover';
import ClassNames from 'classnames';
import HeaderDropDown from '../HeaderDropDown';
import { NoticeData } from './NoticeList';
import List from './NoticeList';
import styles from './index.less';

const { TabPane } = Tabs;

export interface NoticeIconProps {
  count?: number;
  bell?: React.ReactNode;
  className?: string;
  loading?: boolean;
  onClear?: (tabName: string) => void;
  onItemClick?: (item: NoticeData, tabProps: NoticeIconProps) => void;
  onTabChange?: (tabTile: string) => void;
  popupAlign?: {
    points?: [string, string];
    offset?: [number, number];
    targetOffset?: [number, number];
    overflow?: any;
    useCssRight?: boolean;
    useCssBottom?: boolean;
    useCssTransform?: boolean;
  };
  style?: React.CSSProperties;
  onPopupVisibleChange?: (visible: boolean) => void;
  popupVisible?: boolean;
  locale?: { emptyText: string; clear: string };
}

interface DefaultProps {}

interface State {
  readonly visible: boolean;
}

class NoticeIcon extends React.PureComponent<NoticeIconProps, State> {
  static Tab = TabPane;
  private popover: React.ReactNode;

  static defaultProps = {
    onItemClick: () => {},
    onPopupVisibleChange: () => {},
    onTabChange: () => {},
    onClear: () => {},
    loading: false,
    locale: {
      emptyText: 'No notifications',
      clear: 'Clear'
    },
    emptyImage:
      'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg'
  };

  readonly state: State = {
    visible: false
  };

  onItemClick = (item, tabProps) => {
    const { onItemClick } = this.props;
    onItemClick(item, tabProps);
  };

  onTabChange = (tabType) => {
    const { onTabChange } = this.props;
    onTabChange(tabType);
  };

  /**
   *
   */
  getNotificationBox() {
    const { children, loading, locale, onClear } = this.props;
    if (!children) {
      return null;
    }
    const panes = React.Children.map(
      children as React.ReactNode,
      (child: React.ReactElement<any>) => {
        const title =
          child.props.list && child.props.list.length > 0
            ? `${child.props.title} (${child.props.list.length})`
            : child.props.title;
        return (
          <TabPane tab={title} key={child.props.name}>
            <List
              {...child.props}
              data={child.props.list}
              onClick={(item) => this.onItemClick(item, child.props)}
              onClear={() => onClear(child.props.name)}
              title={child.props.title}
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
    const { className, count, popupVisible, bell } = this.props;
    const { visible } = this.state;
    const notificationBox = this.getNotificationBox();
    const NoticeBellIcon = bell || <Icon type="bell" className={styles.icon} />;
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
          {NoticeBellIcon}
        </Badge>
      </span>
    );

    if (!notificationBox) {
      return trigger;
    }

    const popoverProps: PopoverProps = {};

    if ('popupVisible' in this.props) {
      popoverProps.visible = popupVisible;
    }

    return (
      <HeaderDropDown
        placement="bottomRight"
        overlay={notificationBox}
        className={styles.popover}
        trigger={['click']}
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
        {...popoverProps}
        ref={(node) => (this.popover = ReactDOM.findDOMNode(node))}
      >
        {trigger}
      </HeaderDropDown>
    );
  }
}

export default NoticeIcon;
