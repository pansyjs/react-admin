import React from 'react';
import { Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import Table, { ProColumns } from '@ant-design/pro-table';

const columns: ProColumns<API.UserInfo>[] = [
  {
    title: '用户名',
    dataIndex: 'username'
  },
  {
    title: '用户昵称',
    dataIndex: 'nickname'
  },
  {
    title: '邮箱',
    dataIndex: 'eamil'
  },
  {
    title: '手机号',
    dataIndex: 'mobile'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '创建时间',
    dataIndex: 'updateTime'
  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [
      <a>链路</a>,
      <a>报警</a>,
      <a>监控</a>,
    ],
  },
]

export default () => {
  return (
    <PageContainer>
      <Table<API.UserInfo>
        columns={columns}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
        }}
        search={false}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button key="add" type="primary">添加</Button>,
        ]}
      />
    </PageContainer>
  )
}
