import React from 'react';
import { Icon } from 'antd';
import ClassNames from 'classnames';
import styles from './index.less';

export interface NumberInfoProps {
  title?: React.ReactNode | string;
  subTitle?: React.ReactNode | string;
  total?: React.ReactNode | string;
  status?: 'up' | 'down';
  theme?: string;
  gap?: number;
  subTotal?: number;
  suffix?: React.ReactNode | string;
  style?: React.CSSProperties;
}

class NumberInfo extends React.Component<NumberInfoProps, any> {
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
      [styles[`numberInfo${theme}`]]: theme
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
