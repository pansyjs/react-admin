import React from 'react';
import { ClusterComponentProps } from '@pansy/react-amap/es/markers';
import styles from './index.less';

export const Cluster: React.FC<ClusterComponentProps> = ({ count }) => {
  return (
    <div className={styles.markers}>
      {count}
    </div>
  );
};
