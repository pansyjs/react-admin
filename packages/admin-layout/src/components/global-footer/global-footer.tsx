import React, { FC } from 'react';
import classNames from '@pansy/classnames';
import { WithFalse } from '../../typings';
import './global-footer.less';

export interface GlobalFooterProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  links?: WithFalse<
    {
      key?: string;
      title: React.ReactNode;
      href: string;
      blankTarget?: boolean;
    }[]
  >;
  copyright?: React.ReactNode;
}

const GlobalFooter: FC<GlobalFooterProps> = (props) => {
  const { prefixCls, className, links, copyright, style } = props;

  if (
    (links == null || links === false || (Array.isArray(links) && links.length === 0)) &&
    (copyright == null || copyright === false)
  ) {
    return null;
  }

  return (
    <footer
      className={classNames(className, [
        {
          [`${prefixCls}`]: true
        }
      ])}
      style={style}
    >
      {links && (
        <div className={`${prefixCls}-links`}>
          {links.map((link) => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && <div className={`${prefixCls}-copyright`}>{copyright}</div>}
    </footer>
  );
};

GlobalFooter.defaultProps = {
  prefixCls: 'pansy-layout-global-footer'
};

export default GlobalFooter;
