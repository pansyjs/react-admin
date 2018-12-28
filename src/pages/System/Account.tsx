import React from 'react';
import { connect } from 'dva';
import { Badge, Button, Card } from 'antd';
import { Component } from '@/components/BaseComponent';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

export interface AccountProps {
  tableData: any;
}

@connect(({ systemAccount }) => ({
  tableData: systemAccount.tableData
}))
class Account extends Component<AccountProps, any> {
  getTableColumns = () => {
    return [
      {
        title: '接口名称',
        dataIndex: 'name'
      },
      {
        title: '接口路径',
        dataIndex: 'path'
      },
      {
        title: '请求方式',
        dataIndex: 'type'
      },
      {
        title: '操作',
        render: (text, record) => {
          const { status } = record;
          return (
            <div className="table-active">
              <Button size="small">编辑</Button>
              {/** 切换接口状态 */}
              <Button size="small" type={status ? 'danger' : 'primary'}>
                {status ? '禁用' : '启用'}
              </Button>
              <Button size="small" type="danger">
                删除
              </Button>
            </div>
          );
        }
      }
    ];
  };

  render() {
    const {
      tableData: { list = [], pagination }
    } = this.props;
    const columns = this.getTableColumns();

    return (
      <PageHeaderWrapper title="账户管理">
        <Card>
          <StandardTable
            columns={columns}
            data={{
              list: list,
              pagination: pagination
            }}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Account;
