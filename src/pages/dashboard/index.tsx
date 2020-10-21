import React, { Suspense } from 'react';
import { Space, Row, Col } from 'antd';
import { useRequest } from 'umi';
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
