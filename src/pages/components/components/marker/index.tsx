import React from 'react';
import LockFilled from '@ant-design/icons/LockFilled';
import styles from './index.less';

// 聚合标记点
const Marker: React.FC = () => {
  return (
    <div className={styles.marker}>
      <LockFilled />
    </div>
  );
};

export default Marker;
