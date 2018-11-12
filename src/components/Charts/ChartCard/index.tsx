import React from 'react';
import { Card } from 'antd';
import ClassNames from 'classnames';
import styles from './index.less';

export interface ChartCardProps {
  loading?: boolean;
  title: React.ReactNode;
  action?: React.ReactNode;
  total?: React.ReactNode | number | (() => React.ReactNode | number);
  footer?: React.ReactNode;
  contentHeight?: number;
  avatar?: React.ReactNode;
  style?: React.CSSProperties;
}

const renderTotal = (total) => {
  let totalDom;
  switch (typeof total) {
    case 'undefined':
      totalDom = null;
      break;
    case 'function':
      totalDom = <div className={styles.total}>{total()}</div>;
      break;
    default:
      totalDom = <div className={styles.total}>{total}</div>;
  }
  return totalDom;
};

class ChartCard extends React.Component<ChartCardProps, any> {
  static defaultProps = {
    loading: false
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      loading,
      children,
      footer,
      avatar,
      title,
      action,
      total,
      contentHeight
    } = this.props;

    return (
      <Card loading={loading} bodyStyle={{ padding: '20px 24px 8px 24px' }}>
        <div className={styles.chartCard}>
          <div
            className={ClassNames(styles.chartTop, {
              [styles.chartTopMargin]: !children && !footer
            })}
          >
            {avatar && <div className={styles.avatar}>{avatar}</div>}
            <div className={styles.metaWrap}>
              <div className={styles.meta}>
                <span className={styles.title}>{title}</span>
                <span className={styles.action}>{action}</span>
              </div>
              {renderTotal(total)}
            </div>
          </div>
          {children && (
            <div
              className={styles.content}
              style={{ height: contentHeight || 'auto' }}
            >
              <div className={contentHeight && styles.contentFixed}>
                {children}
              </div>
            </div>
          )}
          {footer && (
            <div
              className={ClassNames(styles.footer, {
                [styles.footerMargin]: !children
              })}
            >
              {footer}
            </div>
          )}
        </div>
      </Card>
    );
  }
}

export default ChartCard;
