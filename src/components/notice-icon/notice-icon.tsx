import React from 'react';
import classNames from 'classnames';
import { Badge, Icon, Spin, Tabs } from 'antd';
import HeaderDropdown from '@/components/header-dropdown';

export interface INoticeIconData {
  avatar?: string | React.ReactNode;
  clickClose?: boolean;
  description?: React.ReactNode;
  datetime?: React.ReactNode;
  extra?: React.ReactNode;
  key?: string | number;
  read?: boolean;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  [key: string]: any;
}

export interface INoticeIconProps<T extends INoticeIconData = INoticeIconData> {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
  // 图标上的消息总数
  count?: number;
  // Icon图标
  bell?: React.ReactNode;
  // 弹出卡片加载状态
  loading?: boolean;
  // 点击清空按钮的回调
  onClear?: (tabTitle?: string) => void;
  // 点击列表项的回调
  onItemClick?: (item: T, tabProps: INoticeIconProps<T>) => void;
  // 点击查看更多的回调
  onViewMore?: (tabProps: INoticeIconProps<T>, e: React.MouseEvent) => void;
  // 控制弹层显隐
  popupVisible?: boolean;
  // 默认文案
  locale?: {
    emptyText: string;
    clear: string;
    viewMore: string;
    [key: string]: string;
  };
  // 点击清空按钮后关闭通知菜单
  clearClose?: boolean;
}

type FunctionComponent<T extends INoticeIconData = INoticeIconData> = React.FC<INoticeIconProps<T>>

const NoticeIcon: FunctionComponent = (props) => {
  const {
    className,
    children,
    style
  } = props;

  const test = (test) => {

  };

  return (
    <div>
      123
    </div>
  )
};

export default NoticeIcon;
