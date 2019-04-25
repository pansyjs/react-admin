import React, { useState, useMemo } from 'react';
import { connect } from 'dva';
import {Button, Card, Tooltip, Typography} from 'antd';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import DrawerWrapper from '@/components/drawer-wrapper';
import StandardTable from '@/components/standard-table';
import { ConnectProps } from '@/models/connect';
import { IModule, IAction } from '../models/action';

interface IProps extends ConnectProps {
  modules: IModule[];
  actions: IAction[];
}

const { Paragraph } = Typography;

const ActionPage: React.FC<IProps> = (props) => {
  const { dispatch, modules, actions } = props;
  const [visible, setVisible] = useState<boolean>(false);
  useState(() => {
    dispatch({
      type: 'action/fetchModuleList'
    })
  });

  const showCreateView = () => {
    setVisible(true);
  };

  const handleCloseDrawer = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: '所属模块',
      dataIndex: 'mould'
    },
    {
      title: '操作名称',
      dataIndex: 'name'
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

  const table = useMemo(() => {
    return (
      <StandardTable
        data={{
          list: actions
        }}
        columns={columns}
      />
    )
  }, [props.actions]);

  return (
    <React.Fragment>
      <PageHeaderWrapper
        title="操作管理"
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={showCreateView}
          >
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

      <Card bordered={false}>
        {table}
      </Card>

      <DrawerWrapper
        visible={visible}
        onClose={handleCloseDrawer}
        width={600}
        title="添加操作"
      >
        124
      </DrawerWrapper>
    </React.Fragment>
  )
};

export default connect(({ action }) => ({
  modules: action.modules,
  actions: action.list
}))(ActionPage);
