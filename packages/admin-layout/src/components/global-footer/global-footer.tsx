import React, { FC, CSSProperties, ReactNode } from 'react';
import classNames from '@pansy/classnames';
import './global-footer.less';

export interface GlobalFooterProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  copyright?: ReactNode;
}

const GlobalFooter: FC<GlobalFooterProps> = (props) => {
  const { prefixCls, className, style, copyright } = props;

  return <footer className={classNames(prefixCls, className)} style={style}></footer>;
};

GlobalFooter.defaultProps = {
  prefixCls: ''
};

export default GlobalFooter;
