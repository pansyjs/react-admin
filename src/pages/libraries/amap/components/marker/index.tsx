import React from 'react';
import ShopOutlined from '@ant-design/icons/ShopOutlined';

import styles from './index.less';

// 聚合标记点
export const Marker: React.FC = () => {
  return (
    <div className={styles.marker}>
      <ShopOutlined />
    </div>
  );
};
