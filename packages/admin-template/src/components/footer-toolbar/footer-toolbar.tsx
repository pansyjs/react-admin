import React, { FC, ReactNode, CSSProperties, useState, useEffect } from 'react';
import classNames from '@pansy/classnames';
import './footer-toolbar.less';

interface FooterToolbarProps {
  prefixCls?: string;
  className?: string;
  extra?: ReactNode;
  style?: CSSProperties;
}

const FooterToolbar: FC<FooterToolbarProps> = (props) => {
  const { prefixCls, className, style, extra, children } = props;
  const [width, setWidth] = useState<number | string>(undefined);

  useEffect(() => {
    const handler = () => {
      const width = `calc(100% - 80)`;
      setWidth(width);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [1]);

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={{
        ...style,
        width
      }}
    >
      <div className="left">{extra}</div>
      <div className="right">{children}</div>
    </div>
  );
};

FooterToolbar.defaultProps = {
  prefixCls: 'lotus-footer-toolbar'
};

export default FooterToolbar;
