import React from 'react';
import { connect, useDispatch } from 'dva';
import { Button, Card, Typography, Modal, message } from 'antd';
import Table from '@jiumao/rc-table';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import { ConnectProps, ConnectState } from '@/models/connect';
import useQueryData from '@/hooks/use-query-data';
import UserDrawer, { TType } from './components/user-drawer';
import PoliciesDrawer from './components/policies-drawer';
import UserToGroup from './components/user-to-group';
import { IUserTableData } from './models/system-user';
import { IGroup } from './models/user-group';

interface IProps extends ConnectProps {
  loading: boolean;
  tableData: IUserTableData;
  groups: IGroup[];
}

const { Paragraph } = Typography;
const confirm = Modal.confirm;

const UsersPage: React.FC<IProps> = props => {
  const dispatch = useDispatch();
  const { tableData, loading, groups } = props;
  const [visible, setVisible] = React.useState<boolean>(false);
  const [policiesVisible, setPoliciesVisible] = React.useState<boolean>(false);
  const [groupVisible, setGroupVisible] = React.useState<boolean>(false);
  const [type, setType] = React.useState<TType>('create');
  const [currentUser, setCurrentUser] = React.useState<APP.IUser>({});
  const [queryData, setQueryData] = useQueryData(props.location.pathname);

  React.useEffect(() => {
    getList();
  }, [queryData]);

  const getList = () => {
    dispatch({
      type: 'systemUser/fetchList',
      payload: queryData,
    });
  };

  const showCreateView = () => {
    setType('create');
    setCurrentUser({});
    setVisible(true);
  };

  const showUpdateView = record => {
    setType('update');
    setCurrentUser(record);
    setVisible(true);
  };

  const showPoliciesView = record => {
    setCurrentUser(record);
    setPoliciesVisible(true);
  };

  const showGroupView = record => {
    if (!groups.length) {
      dispatch({
        type: 'userGroup/fetchAll',
      });
    }
    setCurrentUser(record);
    setGroupVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleGroupClose = () => {
    setGroupVisible(false);
  };

  const handleSubmit = values => {
    if (type === 'create') {
      dispatch({
        type: 'systemUser/fetchCreate',
        payload: values,
        callback: () => {
          setVisible(false);
          message.success('创建成功');
          getList();
        },
      });
      return;
    }
    if (type === 'update') {
      dispatch({
        type: 'systemUser/fetchUpdate',
        payload: values,
        callback: () => {
          setVisible(false);
          message.success('修改成功');
          getList();
        },
      });
    }
  };

  const handleConfirmRemove = data => {
    confirm({
      title: '确定删除?',
      content: '操作不可逆，请确定是否删除',
      onOk() {
        handleRemove(data.id);
      },
    });
  };

  const handleRemove = userId => {
    dispatch({
      type: 'systemUser/fetchRemove',
      payload: userId,
      callback: () => {
        message.success('删除成功');
        getList();
      },
    });
  };

  const handleTableChange = pagination => {
    const { current, pageSize } = pagination;
    setQueryData({
      page: current,
      limit: pageSize,
    });
  };

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div className="table-action">
          <Button
            size="small"
            onClick={() => {
              showGroupView(record);
            }}
          >
            添加到用户组
          </Button>
          <Button
            size="small"
            onClick={() => {
              showPoliciesView(record);
            }}
          >
            赋权
          </Button>
          <Button
            size="small"
            onClick={() => {
              showUpdateView(record);
            }}
          >
            更新
          </Button>
          <Button
            type="danger"
            size="small"
            onClick={() => {
              handleConfirmRemove(record);
            }}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];

  const table = React.useMemo(() => {
    return (
      <Table loading={loading} data={tableData} columns={columns} onChange={handleTableChange} />
    );
  }, [props.tableData, props.loading]);

  return (
    <React.Fragment>
      <PageHeaderWrapper
        title="用户管理"
        extra={[
          <Button key="1" type="primary" onClick={showCreateView}>
            新建用户
          </Button>,
        ]}
      >
        <Paragraph>用户可以单独授权，单独授权的用户将不继承已添加的用户组的权限</Paragraph>
      </PageHeaderWrapper>

      <Card bordered={false}>{table}</Card>

      <UserDrawer
        type={type}
        visible={visible}
        currentUser={currentUser}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />

      <PoliciesDrawer
        visible={policiesVisible}
        type="user"
        user={currentUser}
        onClose={() => {
          setPoliciesVisible(false);
        }}
      />

      <UserToGroup
        visible={groupVisible}
        user={currentUser}
        groups={groups}
        onClose={handleGroupClose}
      />
    </React.Fragment>
  );
};

UsersPage.defaultProps = {
  loading: false,
  groups: [],
};

export default connect(({ systemUser, userGroup, loading }: ConnectState) => ({
  tableData: systemUser.tableData,
  groups: userGroup.list,
  loading: loading.effects['systemUser/fetchList'],
}))(UsersPage);
