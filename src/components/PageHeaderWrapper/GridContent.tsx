import React from 'react';
import { connect } from 'dva';
import { contentWidthType } from '@/types/settings';
import { PureComponent } from '../BaseComponent';
import styles from './GridContent.less';

export interface GridContentProps {
  contentWidth?: contentWidthType;
}

@connect(({ setting }) => ({
  contentWidth: setting.contentWidth
}))
class GridContent extends PureComponent<GridContentProps, any> {
  render() {
    const { contentWidth, children } = this.props;
    let className = `${styles.main}`;
    if (contentWidth === 'Fixed') {
      className = `${styles.main} ${styles.wide}`;
    }
    return <div className={className}>{children}</div>;
  }
}

export default GridContent;
