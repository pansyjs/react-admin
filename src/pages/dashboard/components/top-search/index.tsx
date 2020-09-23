import React from 'react';
import moment from 'moment';
import { Row, Col, Statistic, Table } from 'antd';
import Card from '@ant-design/pro-card';
import { TinyArea } from '@ant-design/charts';
import Trend from '../trend';

interface SearchData {
  index: number,
  keyword: string;
  count: number;
  range: number;
  status: number;
}

const visitData: { x: string, y: number }[] = [];
const beginDay = new Date().getTime();
const fakeY = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
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
          <TinyArea
            xField="x"
            height={45}
            forceFit
            yField="y"
            smooth
            data={visitData}
          />
        </Col>
        <Col sm={12} xs={24}>
          <Statistic title="人均搜索次数" value={2.7} />
          <TinyArea
            xField="x"
            height={45}
            forceFit
            yField="y"
            smooth
            data={visitData}
          />
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
