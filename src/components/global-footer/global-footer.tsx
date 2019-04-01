import React from 'react';
import classNames from 'classnames';
import './global-footer.less';

type TLink = {
  key?: string;
  title: React.ReactNode;
  href: string;
  blankTarget?: boolean;
};

interface IProps {
  prefixCls?: string;
  links?: TLink[];
  copyright?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const GlobalFooter: React.FC<IProps> = (props) => {
  const { prefixCls, className, links, copyright } = props;

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
    >
      {links && (
        <div className={`${prefixCls}__links`}>
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
      {copyright && (
        <div className={`${prefixCls}__copyright`}>
          {copyright}
        </div>
      )}
    </div>
  )
};

GlobalFooter.defaultProps = {
  prefixCls: 'global-footer'
};
