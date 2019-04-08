import React from 'react';
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

class NoticeIcon extends React.Component {

}

export default NoticeIcon;
