import React from 'react';
import { Button, Card } from 'antd';
import { connect } from 'dva';
import { Component } from '@/components/BaseComponent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';
import RoleForm from './components/RoleForm';

export interface RoleProps {
  tableData: {
    list: any[];
    pagination: {
      current: number;
      total: number;
    };
  };
}

interface State {
  readonly visible: boolean;
}

@connect(({ systemRole }) => ({
  tableData: systemRole.tableData
}))
class Role extends Component<RoleProps, State> {
  readonly state: State = {
    visible: false
  };

  // 显示创建视图
  showCreateView = () => {
    this.setState({
      visible: true
    });
  };

  // 关闭modal弹框
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleSubmit = (values) => {
    console.log(values);
  };

  // 表格分页、排序、筛选变化时触发
  handleTableChange = (pagination, filters, sorter) => {
    // 获取当前页以及页面大小
    const { current, pageSize } = pagination;
  };

  getTableColumns = () => {
    return [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '角色描述',
        dataIndex: 'path'
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <div className="table-active">
              <Button size="small">编辑</Button>
              {/** 切换接口状态 */}
              <Button size="small" type="primary">
                禁用
              </Button>
            </div>
          );
        }
      }
    ];
  };

  render() {
    const { tableData } = this.props;
    const { visible } = this.state;
    const columns = this.getTableColumns();

    const action = (
      <Button type="primary" onClick={this.showCreateView}>
        创建接口
      </Button>
    );

    return (
      <PageHeaderWrapper title="角色管理" action={action}>
        <Card>
          <StandardTable
            rowKey="id"
            data={tableData}
            columns={columns}
            onChange={this.handleTableChange}
          />
        </Card>

        <RoleForm
          visible={visible}
          onCancel={this.handleCancel}
          onSubmit={this.handleSubmit}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Role;
