import React, { Suspense } from 'react';
import { Space, Row, Col } from 'antd';
import moment from 'moment';
import { useRequest } from 'umi';
import Watermark from '@pansy/react-watermark';
import { GridContent, PageLoading } from '@ant-design/pro-layout';
import { fetchChartData } from '@/services/dashboard';

const IntroduceRow = React.lazy(() => import('./components/introduce-row'));
const SalesCard = React.lazy(() => import('./components/sales-card'));
const TopSearch = React.lazy(() => import('./components/top-search'));
const ProportionSales = React.lazy(() => import('./components/proportion-sales'));

const Dashboard: React.FC = () => {
  const { data, loading } = useRequest(
    () => { return fetchChartData() }
  )

  return (
    <GridContent>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading}  />

          <Watermark zIndex={998} text={['王某某 6909', moment().format('YYYY-MM-DD HH:mm:ss')]} isBody />
        </Suspense>

        <Suspense fallback={null}>
          <SalesCard data={data?.salesData} />
        </Suspense>

        <Row gutter={16}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopSearch />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ProportionSales />
            </Suspense>
          </Col>
        </Row>
      </Space>
    </GridContent>
  )
}

export default Dashboard;
