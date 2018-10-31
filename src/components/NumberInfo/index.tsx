import React from 'react';
import { Icon } from 'antd';
import ClassNames from 'classnames';
import capitalize from 'lodash/capitalize';
import styles from './index.less';

export interface NumberInfoProps {
  title?: React.ReactNode | string;
  subTitle?: React.ReactNode | string;
  total?: React.ReactNode | string;
  subTotal?: number;
  status?: 'up' | 'down';
  theme?: string;
  suffix?: React.ReactNode | string;
  gap?: number;
  style?: React.CSSProperties;
}

class NumberInfo extends React.Component<NumberInfoProps, any> {
  static defaultProps = {
    theme: 'light',
    gap: 8
  };

  render() {
    const {
      theme,
      title,
      subTitle,
      total,
      suffix,
      subTotal,
      gap,
      status
    } = this.props;

    const cls = ClassNames(styles.numberInfo, {
      [styles[`numberInfo${capitalize(theme)}`]]: theme
    });

    return (
      <div className={cls}>
        {title && (
          <div
            className={styles.numberInfoTitle}
            title={typeof title === 'string' ? title : ''}
          >
            {title}
          </div>
        )}
        {subTitle && (
          <div
            className={styles.numberInfoSubTitle}
            title={typeof subTitle === 'string' ? subTitle : ''}
          >
            {subTitle}
          </div>
        )}
        <div
          className={styles.numberInfoValue}
          style={gap ? { marginTop: gap } : null}
        >
          <span>
            {total}
            {suffix && <em className={styles.suffix}>{suffix}</em>}
          </span>
          {(status || subTotal) && (
            <span className={styles.subTotal}>
              {subTotal}
              {status && <Icon type={`caret-${status}`} />}
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default NumberInfo;
