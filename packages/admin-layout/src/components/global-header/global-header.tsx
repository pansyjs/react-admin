import React, { FC, ReactNode } from 'react';
import classNames from '@pansy/classnames';

interface GlobalHeaderProps {
  logo?: ReactNode;
  isMobile?: boolean;
  collapsed?: boolean;
}

const GlobalHeader: FC<GlobalHeaderProps> = (props) => {
  const {} = props;

  return <div></div>;
};

export default GlobalHeader;
