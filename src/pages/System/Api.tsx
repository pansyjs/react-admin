import React from 'react';
import { Card, Badge, Button, Modal, message } from 'antd';
import { connect } from 'dva';
import { Component } from '@/components/BaseComponent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';

const statusMap = new Map([
  [
    0,
    {
      text: '禁用',
      badge: 'error'
    }
  ],
  [
    1,
    {
      text: '正常',
      badge: 'success'
    }
  ]
]);

const { confirm } = Modal;

export interface ApiProps {
  loading: boolean;
  tableData: any;
}

@connect(({ systemApi, loading }) => ({
  tableData: systemApi.tableData,
  loading: loading.effects['systemApi/fetchList']
}))
class Api extends Component<ApiProps, any> {
  componentDidMount() {
    this.getTableList();
  }

  getTableList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemApi/fetchList'
    });
  };

  // 表格分页、排序、筛选变化时触发
  handleTableChange = (pagination, filters, sorter) => {
    // 获取当前页以及页面大小
    const { current, pageSize } = pagination;
  };

  // 删除二次确认
  showRemoveConfirm = (record) => {
    confirm({
      title: '确认删除？',
      content: '删除后无法恢复，请谨慎操作！',
      onOk: () => {
        this.handleRemove(record);
      }
    });
  };

  // 触发删除请求
  handleRemove = (record) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'systemApi/fetchRemove',
      payload: {
        id: record.id
      },
      callback: () => {
        message.success('删除成功！');
        this.getTableList();
      }
    });
  };

  render() {
    const { loading, tableData } = this.props;
    const { list = [], pagination } = tableData;

    const columns = [
      {
        title: '接口名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '接口路径',
        dataIndex: 'path',
        key: 'path'
      },
      {
        title: '请求方式',
        dataIndex: 'type',
        key: 'type'
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (val) => {
          const obj: any = statusMap.get(val);
          return <Badge status={obj.badge} text={obj.text} />;
        }
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return (
            <div className="table-active">
              <Button size="small" type="primary">
                编辑
              </Button>
              <Button size="small" type="danger">
                禁用
              </Button>
              <Button
                size="small"
                type="danger"
                onClick={() => {
                  this.showRemoveConfirm(record);
                }}
              >
                删除
              </Button>
            </div>
          );
        }
      }
    ];

    return (
      <PageHeaderWrapper title="接口管理">
        <Card>
          <StandardTable
            rowKey="id"
            loading={loading}
            data={{
              list: list,
              pagination: pagination
            }}
            columns={columns}
            onChange={this.handleTableChange}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Api;
