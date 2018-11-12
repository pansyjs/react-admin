import React from 'react';
import { Icon } from 'antd';
import ClassNames from 'classnames';
import styles from './index.less';

export interface TrendProps {
  className?: string;
  colorful?: boolean;
  flag: 'up' | 'down';
  reverseColor?: boolean;
}

class Trend extends React.Component<TrendProps, any> {
  static defaultProps = {
    className: '',
    colorful: true,
    reverseColor: false
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { colorful, reverseColor, children, flag } = this.props;
    const clsString = ClassNames(styles.trendItem, {
      [styles.trendItemGrey]: !colorful,
      [styles.reverseColor]: reverseColor && colorful
    });
    return (
      <div
        className={clsString}
        title={typeof children === 'string' ? children : ''}
      >
        <span>{children}</span>
        {flag && (
          <span className={styles[flag]}>
            <Icon type={`caret-${flag}`} />
          </span>
        )}
      </div>
    );
  }
}

export default Trend;
