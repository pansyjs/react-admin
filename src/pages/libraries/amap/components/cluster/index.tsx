import React from 'react';
import styles from './index.less';

export interface ClusterProps {
  count: number;
}

export const Cluster: React.FC<ClusterProps> = ({ count }) => {
  return (
    <div className={styles.markers}>
      {count}
    </div>
  );
};
