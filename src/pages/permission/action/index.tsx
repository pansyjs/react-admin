import React from 'react';
import { Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import Table, { ProColumns } from '@ant-design/pro-table';
import { useModal } from '@pansy/react-hooks';
import { fetchActionList } from '@/services/permission';
import { handleTableRequest } from '@/utils';
import Operation from './components/operation';

const columns: ProColumns<API.PermissionActionData>[] = [
  {
    title: '所属模块',
    dataIndex: 'module'
  },
  {
    title: '操作标识',
    dataIndex: 'code'
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'dateTime'
  },
  {
    title: '创建时间',
    dataIndex: 'updatedAt',
    valueType: 'dateTime'
  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [
      <a key="update">修改</a>
    ]
  },
]

export default  () => {
  const modal = useModal();

  const handleClick = () => {
    modal.open();
  }

  return (
    <PageContainer>
      <Table<API.PermissionActionData>
        columns={columns}
        request={(params, sorter, filter) => {
          // @ts-ignore
          return handleTableRequest(params, sorter, filter, fetchActionList);
        }}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        search={false}
        headerTitle="操作列表"
        toolBarRender={() => [
          <Button type="primary" key="add" onClick={handleClick}>添加</Button>,
        ]}
      />

      <Operation {...modal} />
    </PageContainer>
  )
}
