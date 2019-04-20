import React, { useState } from 'react';
import router from 'umi/router';
import { Button, Card, Tooltip, Form } from 'antd';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import DrawerWrapper from '@/components/drawer-wrapper';
import StandardTable from '@/components/standard-table';

const CreatePolicies: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const showCreateView = () => {
    setVisible(true);
  };

  const closeCreateView = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: '权限效力',
      dataIndex: 'name'
    },
    {
      title: '模块',
      dataIndex: 'type'
    },
    {
      title: '操作名称',
      dataIndex: 'attachmentCount'
    },
    {
      title: '资源',
      dataIndex: 'remark'
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Tooltip placement="top" title="删除">
          <Button
            type="danger"
            size="small"
            icon="delete"
          />
        </Tooltip>
      )
    }
  ];


  return (
    <React.Fragment>
      <PageHeaderWrapper
        title="新建自定义权限策略"
        extra={[
          <Button key="1" type="primary" onClick={showCreateView}>
            添加授权语句
          </Button>
        ]}
      />

      <DrawerWrapper
        visible={visible}
        width={600}
        title="添加授权语句"
        onClose={closeCreateView}
      >
        13
      </DrawerWrapper>

      <Card bordered={false}>
        <StandardTable
          list={[]}
          columns={columns}
        />
      </Card>
    </React.Fragment>
  )
};

export default CreatePolicies;
