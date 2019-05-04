import React, { useState, useMemo } from 'react';
import { connect } from 'dva';
import { Button, Card, Tooltip, Typography, Modal } from 'antd';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import StandardTable from '@/components/standard-table';
import { ConnectProps } from '@/models/connect';
import { IModule, IAction } from '@/models/action';
import ActionForm, { TFormType } from '../components/action-form';

interface IProps extends ConnectProps {
  modules: IModule[];
  actions: IAction[];
}

const { Paragraph } = Typography;
const { confirm } = Modal;

const ActionPage: React.FC<IProps> = (props) => {
  const { dispatch, modules, actions } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [formType, setFormType] = useState<TFormType>('create');
  const [currentAction, setCurrentAction] = useState<IAction>({});

  useState(() => {
    dispatch({
      type: 'action/fetchModules'
    });
    dispatch({
      type: 'action/fetchList'
    });
  });

  const showCreateView = () => {
    setVisible(true);
    setFormType('create');
  };

  const showUpdateView = (record) => {
    console.log(record);
    setVisible(true);
    setFormType('update');
  };

  const handleCloseDrawer = () => {
    setVisible(false);
  };

  const handleConfirmRemove = (value) => {
    confirm({
      title: `确定删除${value.name}操作?`,
      content: '删除不可恢复',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        handleRemove(value);
      }
    });
  };

  const handleRemove = (value) => {
    dispatch({
      type: 'action/fetchRemove',
      payload: {
        id: value.id
      }
    }).then(() => {
      dispatch({
        type: 'action/fetchList'
      });
    });
  };

  const columns = [
    {
      title: '所属模块',
      dataIndex: 'module'
    },
    {
      title: '操作名称',
      dataIndex: 'name'
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (text) => {
        return text ? 'API' : '非API';
      }
    },
    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div className="table-action">
          <Tooltip placement="top" title="更新">
            <Button
              size="small"
              icon="edit"
              onClick={() => { showUpdateView(record) }}
            />
          </Tooltip>
          <Tooltip placement="top" title="删除">
            <Button
              type="danger"
              size="small"
              icon="delete"
              onClick={() => { handleConfirmRemove(record) }}
            />
          </Tooltip>
        </div>
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

      <ActionForm
        visible={visible}
        modules={modules}
        formType={formType}
        onClose={handleCloseDrawer}
      />
    </React.Fragment>
  )
};

export default connect(({ action }) => ({
  modules: action.modules,
  actions: action.list
}))(ActionPage);
