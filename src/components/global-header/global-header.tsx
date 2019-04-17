import React from 'react';
import RightContent from './right-content';
import { ICurrentUser } from '@/models/user';
import './global-header.less';

interface IProps {
  prefixCls?: string;
  isMobile?: boolean;
  onMenuClick?: (key: string) => void;
  currentUser?: ICurrentUser;
}

export class GlobalHeader extends React.Component<IProps, any> {
  static defaultProps = {
    prefixCls: 'global-header'
  };

  render() {
    const { prefixCls, onMenuClick, currentUser } = this.props;

    return (
      <div className={prefixCls}>

        <RightContent
          prefixCls={prefixCls}
          onMenuClick={onMenuClick}
          currentUser={currentUser}
        />
      </div>
    )
  }
}
