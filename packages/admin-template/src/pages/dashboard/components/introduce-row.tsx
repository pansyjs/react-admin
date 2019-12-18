import React from 'react';
import { Col, Icon, Row, Tooltip } from 'antd';
import { Area, Bar } from 'rc-charts';
import ChartCard from '@/components/chart-card';
import Trend from '@/components/trend';
import Progress from '@/components/progress';

const responsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const chartData = [
  { x: '2019-07-07', y: 7 },
  { x: '2019-07-08', y: 5 },
  { x: '2019-07-09', y: 4 },
  { x: '2019-07-10', y: 2 },
  { x: '2019-07-11', y: 4 },
  { x: '2019-07-12', y: 7 },
  { x: '2019-07-13', y: 5 },
  { x: '2019-07-14', y: 6 },
  { x: '2019-07-15', y: 5 },
  { x: '2019-07-16', y: 9 },
  { x: '2019-07-17', y: 6 },
  { x: '2019-07-18', y: 3 },
  { x: '2019-07-19', y: 1 },
  { x: '2019-07-20', y: 5 },
  { x: '2019-07-21', y: 3 },
  { x: '2019-07-22', y: 6 },
  { x: '2019-07-23', y: 5 },
];

const IntroduceRow = () => {
  return (
    <Row gutter={24} type="flex">
      <Col {...responsiveProps}>
        <ChartCard
          title="总销售额"
          extra={
            <Tooltip title="指标说明">
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          statistic={{
            value: 126560,
            prefix: '¥',
          }}
        >
          <Trend flag="up" style={{ marginRight: 16 }}>
            周同比 <span>12%</span>
          </Trend>
          <Trend flag="down">
            日同比 <span>11%</span>
          </Trend>
        </ChartCard>
      </Col>
      <Col {...responsiveProps}>
        <ChartCard
          title="访问量"
          extra={
            <Tooltip title="指标说明">
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          statistic={{
            value: 8846,
          }}
        >
          <Area
            colors={['#975FE4']}
            data={chartData}
            smooth={true}
            height={46}
            mini={true}
            titleMap={{
              y: '访问量',
            }}
          />
        </ChartCard>
      </Col>
      <Col {...responsiveProps}>
        <ChartCard
          title="支付笔数"
          extra={
            <Tooltip title="指标说明">
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          statistic={{
            value: 6560,
          }}
        >
          <Bar
            height={46}
            colors={['#1890FF']}
            data={chartData}
            mini={true}
            titleMap={{
              y: '访问量',
            }}
          />
        </ChartCard>
      </Col>
      <Col {...responsiveProps}>
        <ChartCard
          title="运营活动效果"
          extra={
            <Tooltip title="指标说明">
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          statistic={{
            value: 78,
            suffix: '%',
          }}
        >
          <Progress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
        </ChartCard>
      </Col>
    </Row>
  );
};

export default IntroduceRow;
