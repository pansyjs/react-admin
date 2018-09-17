import React from 'react';
import ClassNames from 'classnames';
import { Popover, Icon, Tabs, Badge, Spin } from 'antd';
import List from './NoticeList';
import styles from './index.scss';

const { TabPane } = Tabs;

export interface NoticeIconProps {
  count?: number;
  bell?: React.ReactNode;
  className?: string;
  loading?: boolean;
  onClear?: (tableTile: string) => void;
  onTabChange?: (tableTile: string) => void;
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

class NoticeIcon extends React.PureComponent<NoticeIconProps, any> {
  static defaultProps = {
    onItemClick: () => {},
    onPopupVisibleChange: () => {},
    onTabChange: () => {},
    onClear: () => {},
    loading: false,
    locale: {
      emptyText: '暂无数据',
      clear: '清空'
    },
    emptyImage:
      'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg'
  };

  constructor(props) {
    super(props);
  }

  getNotificationBox() {
    const { children, loading, locale, onClear } = this.props;
    if (!children) {
      return null;
    }
    const panes = React.Children.map(children, (child) => {});
  }

  render() {
    const {
      className,
      count,
      popupAlign,
      popupVisible,
      onPopupVisibleChange,
      bell
    } = this.props;
    const cls = ClassNames(className, styles.noticeButton);
    const notificationBox = this.getNotificationBox();
    const NoticeBellIcon = bell || <Icon type="bell" className={styles.icon} />;
    const trigger = (
      <span className={cls}>
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

    const popoverProps = {};

    if ('popupVisible' in this.props) {
      popoverProps.visible = popupVisible;
    }

    return (
      <Popover
        placement="bottomRight"
        content={notificationBox}
        overlayClassName={styles.popover}
        trigger="click"
        arrowPointAtCenter
        popupAlign={popupAlign}
        onVisibleChange={onPopupVisibleChange}
        {...popoverProps}
      >
        {trigger}
      </Popover>
    );
  }
}

// @ts-ignore
export default NoticeIcon;
