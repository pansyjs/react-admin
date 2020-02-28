import React from 'react';
import RightContent from './right-content';
import './global-header.less';

interface GlobalHeaderProps {
  prefixCls?: string;
  isMobile?: boolean;
  onMenuClick?: (key: string) => void;
  currentUser?: APP.ICurrentUser;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = props => {
  const { prefixCls, onMenuClick, currentUser } = props;

  return (
    <div className={prefixCls}>
      <RightContent prefixCls={prefixCls} onMenuClick={onMenuClick} currentUser={currentUser} />
    </div>
  );
};

GlobalHeader.defaultProps = {
  prefixCls: 'lotus-global-header',
};

export default GlobalHeader;
