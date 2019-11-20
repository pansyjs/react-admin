import React from 'react';
import { Icon } from 'antd';
import classNames from '@pansy/classnames';
import './trend.less';

export interface ITrendProps {
  className?: string;
  style?: React.CSSProperties;
  colorful?: boolean;
  flag: 'up' | 'down';
  reverseColor?: boolean;
}

const Trend: React.FC<ITrendProps> = (props) => {
  const prefixCls: string = 'lotus-trend';
  const { colorful = true, reverseColor = false, flag, children, className, style } = props;

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`is-grey`]: !colorful,
        [`is-reverse`]: reverseColor && colorful
      })}
      style={style}
    >
      <span>{children}</span>
      {flag && (
        <span
          className={classNames(`${prefixCls}__flag`, {
            [`up`]: flag === 'up',
            [`down`]: flag === 'down'
          })}
        >
          <Icon type={`caret-${flag}`} />
        </span>
      )}
    </div>
  );
};

Trend.defaultProps = {
  colorful: true,
  reverseColor: false
};

export default Trend;
