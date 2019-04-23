import React from 'react';
import { connect } from 'dva';
import {Button, Card, Tooltip, Typography} from 'antd';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import StandardTable from '@/components/standard-table';
import { ConnectProps } from '@/models/connect';

interface IProps extends ConnectProps {

}

const { Paragraph } = Typography;

const ActionPage: React.FC<IProps> = (props) => {
  const { dispatch } = props;

  const columns = [
    {
      title: '所属模块',
      dataIndex: 'mould'
    },
    {
      title: '操作名称',
      dataIndex: 'type'
    },
    {
      title: '类型',
      dataIndex: 'type'
    },
    {
      title: '备注',
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
        title="操作管理"
        extra={[
          <Button key="1" type="primary" >
            新建操作
          </Button>
        ]}
      >
        <div className="content">
          <Paragraph>
            操作是指对具体资源的操作，多数情况下 Action 与系统的 API 一一对应，但也有例外。
          </Paragraph>
        </div>
      </PageHeaderWrapper>
      <div>
        <Card bordered={false}>
          <StandardTable
            list={[]}
            columns={columns}
          />
        </Card>
      </div>
    </React.Fragment>
  )
};

export default connect(({  }) => ({

}))(ActionPage);
