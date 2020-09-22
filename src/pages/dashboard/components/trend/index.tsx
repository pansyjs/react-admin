import React from 'react';
import classNames from 'classnames';
import CaretUpOutlined from '@ant-design/icons/CaretUpOutlined';
import CaretDownOutlined from '@ant-design/icons/CaretDownOutlined';
import styles from './index.less';

export interface TrendProps {
  className?: string;
  style?: React.CSSProperties;
  flag: 'up' | 'down';
  colorful?: boolean;
  reverseColor?: boolean;
}

const Trend: React.FC<TrendProps> = ({
  className,
  style,
  flag,
  colorful,
  reverseColor,
  children
}) => {
  const cls = classNames(
    styles.trendItem,
    {
      [styles.trendItemGrey]: !colorful,
      [styles.reverseColor]: reverseColor && colorful,
    },
    className,
  );

  return (
    <div className={cls} style={style}>
      <span>{children}</span>
      {flag && (
        <span className={styles[flag]}>
          {flag === 'up' ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </span>
      )}
    </div>
  )
}

Trend.defaultProps = {
  colorful: true,
  reverseColor: false
}

export default Trend;
