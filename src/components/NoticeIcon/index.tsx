import React from 'react';
import ClassNames from 'classnames';
import { Popover, Icon, Tabs, Badge, Spin } from 'antd';
import styles from './index.scss';

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
    const notificationBox = this.getNotificationBox();

    return (
      <Popover
        placement="bottomRight"
        trigger="click"
        content={notificationBox}
      />
    );
  }
}

export default NoticeIcon;
