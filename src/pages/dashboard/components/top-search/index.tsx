import React from 'react';
import { Row, Col, Statistic, Table } from 'antd';
import Card from '@ant-design/pro-card';
import { TinyArea } from '@pansy/react-charts';
import Trend from '../trend';

interface SearchData {
  index: number,
  keyword: string;
  count: number;
  range: number;
  status: number;
}

const searchData: SearchData[] = [];
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  });
}

const TopSearch: React.FC = () => {
  const config = {
    data: new Array(50).fill(0).map(() => Math.random() * 100),
    smooth: true,
    lineStyle: {
      lineDash: [2, 2],
      stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
    },
    areaStyle: { fill: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' },
  };

  const columns = [
    {
      title: '排名',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: '搜索关键词',
      dataIndex: 'keyword',
      key: 'keyword',
      render: (text: React.ReactNode) => <a href="/">{text}</a>,
    },
    {
      title: '用户数',
      dataIndex: 'count',
      key: 'count',
      sorter: (a: { count: number }, b: { count: number }) => a.count - b.count,
    },
    {
      title: '周涨幅',
      dataIndex: 'range',
      key: 'range',
      sorter: (a: { range: number }, b: { range: number }) => a.range - b.range,
      render: (text: React.ReactNode, record: { status: number }) => (
        <Trend flag={record.status === 1 ? 'down' : 'up'}>
          <span style={{ marginRight: 4 }}>{text}%</span>
        </Trend>
      ),
    },
  ];

  return (
    <Card title="线上热门搜索" headerBordered>
      <Row gutter={68} style={{ marginBottom: 24 }}>
        <Col sm={12} xs={24}>
          <Statistic title="搜索用户数" value={112893} />
          <div style={{ height: 45 }}>
            <TinyArea {...config} />
          </div>
        </Col>
        <Col sm={12} xs={24}>
          <Statistic title="人均搜索次数" value={2.7} />
          <div style={{ height: 45 }}>
            <TinyArea {...config} />
          </div>
        </Col>
      </Row>

      <Table<SearchData>
        rowKey={(record) => record.index}
        size="small"
        columns={columns}
        dataSource={searchData}
        pagination={{
          style: { marginBottom: 0 },
          pageSize: 5,
        }}
      />
    </Card>
  )
}

export default TopSearch;
