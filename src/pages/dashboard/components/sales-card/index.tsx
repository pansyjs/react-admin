import React from 'react';
import { Row, Col } from 'antd';
import numeral from 'numeral';
import Card from '@ant-design/pro-card';
import { DaysRange } from '@alitajs/antd-plus';
import { Column } from '@pansy/react-charts';
import styles from './index.less';

interface SalesCardProps {
  data?: { time: string; value: number }[];
}

interface RankData {
  title: string;
  total: number;
}

interface RankProps {
  title?: string;
  list?: RankData[];
}

const rankingListData: RankData[] = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

const Rank: React.FC<RankProps> = ({
  title,
  list = []
}) => {
  return (
    <div className={styles.salesRank}>
      <h4 className={styles.rankingTitle}>
        {title}
      </h4>
      <ul className={styles.rankingList}>
        {list.map((item, i) => (
          <li key={item.title}>
            <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
              {i + 1}
            </span>
            <span className={styles.rankingItemTitle} title={item.title}>
              {item.title}
            </span>
            <span>{numeral(item.total).format('0,0')}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const SalesCard: React.FC<SalesCardProps> = ({
  data = []
}) => {
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
        <Row>
          <Col xl={16} lg={12} md={12} sm={24} xs={24}>
            <Column
              height={300}
              data={data}
              xField= 'date'
              yField='value'
              meta= {{
                type: { alias: '类别' },
                sales: { alias: '销售额' },
              }}
            />
          </Col>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <Rank title="门店销售额排名" list={rankingListData} />
          </Col>
        </Row>
      </Card.TabPane>
      <Card.TabPane key="views" tab="访问量">
      <Row>
        <Col xl={16} lg={12} md={12} sm={24} xs={24}>
          <Column
            height={300}
            data={data}
            xField="date"
            yField="value"
            meta= {{
              type: { alias: '类别' },
              sales: { alias: '访问量' },
            }}
          />
        </Col>
        <Col xl={8} lg={12} md={12} sm={24} xs={24}>
          <Rank title="门店访问量排名" list={rankingListData} />
        </Col>
      </Row>
    </Card.TabPane>
    </Card>
  )
}

export default SalesCard;
