import React from 'react';
import { NoticeListProps } from './NoticeList';

export interface NoticeTabProps extends NoticeListProps {
  count: number;
  name: string;
}

class NoticeTab extends React.PureComponent<NoticeTabProps, any> {
  render() {
    return <div />;
  }
}

export default NoticeTab;
