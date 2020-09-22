import React from 'react';
import Card from '@ant-design/pro-card';
import { DaysRange } from '@alitajs/antd-plus';
import styles from './index.less';

const SalesCard: React.FC = () => {
  return (
    <Card
      bordered={false}
      tabs={{
        type: 'line',
        tabBarExtraContent: (
          <DaysRange.Fast
            className={styles.salesExtra}
            buttonStyle="outline"
            marks={['day', 'week', 'month', 'year']}
          />
        )
      }}
    >
      <Card.TabPane key="sales" tab="销售额">
        内容一
      </Card.TabPane>
      <Card.TabPane key="views" tab="访问量">
        内容二
      </Card.TabPane>
    </Card>
  )
}

export default SalesCard;
