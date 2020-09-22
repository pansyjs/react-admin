import React, { Suspense } from 'react';
import { Space } from 'antd';
import { useRequest } from 'umi';
import { GridContent, PageLoading } from '@ant-design/pro-layout';
import { fetchChartData } from '@/services/dashboard';

const IntroduceRow = React.lazy(() => import('./components/introduce-row'));
const SalesCard = React.lazy(() => import('./components/sales-card'));

const Dashboard: React.FC = () => {
  const { data, loading } = useRequest(
    () => { return fetchChartData() }
  )

  return (
    <GridContent>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow data={data?.visitData || []} loading={loading}  />
        </Suspense>

        <Suspense fallback={null}>
          <SalesCard />
        </Suspense>
      </Space>
    </GridContent>
  )
}

export default Dashboard;
