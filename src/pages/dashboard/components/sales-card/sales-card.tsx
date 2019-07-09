import React from 'react';
import { Card, Tabs, Row, Col } from 'antd';
import { Bar } from 'rc-charts';
import SalesExtra from './sales-extra';
import './sales-card.less';

export interface ISalesCardProps {
  loading?: boolean;
}

const { TabPane } = Tabs;

const chartData = [
  { x: '1月', y: 238 },
  { x: '2月', y: 533 },
  { x: '3月', y: 231 },
  { x: '4月', y: 384 },
  { x: '5月', y: 278 },
  { x: '6月', y: 319 },
  { x: '7月', y: 1009 },
  { x: '8月', y: 1067 },
  { x: '9月', y: 1032 },
  { x: '10月', y: 1018 },
  { x: '11月', y: 1133 },
  { x: '12月', y: 297 },
];

const chartResponsiveProps = {
  xl: 16,
  lg: 12,
  md: 12,
  sm: 24,
  xs: 24,
};

const rankingResponsiveProps = {
  xl: 8,
  lg: 12,
  md: 12,
  sm: 24,
  xs: 24,
};

const SalesCard: React.FC<ISalesCardProps> = props => {
  const prefixCls: string = 'lotus-sales-card';
  const { loading } = props;

  return (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }} className={prefixCls}>
      <Tabs tabBarExtraContent={<SalesExtra />}>
        <TabPane tab="销售额" key="sales">
          <Row type="flex">
            <Col {...chartResponsiveProps}>
              <Bar
                title="销售趋势"
                data={chartData}
                colors={['#1890FF']}
                titleMap={{
                  y: '销售额',
                }}
                legend={{
                  visible: false,
                }}
                type="intervalStack"
              />
            </Col>
            <Col {...rankingResponsiveProps}>123</Col>
          </Row>
        </TabPane>
        <TabPane tab="访问量" key="views">
          <Row type="flex">
            <Col {...chartResponsiveProps}>
              <Bar
                title="访问量趋势"
                data={chartData}
                colors={['#1890FF']}
                titleMap={{
                  y: '销售额',
                }}
                legend={{
                  visible: false,
                }}
                type="intervalStack"
              />
            </Col>
            <Col {...rankingResponsiveProps}>123</Col>
          </Row>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default SalesCard;
