import React from 'react';
import { connect } from 'dva';
import { Button, Card, Tooltip, Alert } from 'antd';
import StandardTable from '@/components/standard-table';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import { IGroupTable } from '@/models/user-group';
import GroupDrawer, { TType } from './components/group-drawer';


interface IProps {
  groupTable: IGroupTable
}

const GroupsPage: React.FC<IProps> = (props) => {
  const { groupTable } = props;

  const [visible, setVisible] = React.useState<boolean>(false);
  const [type, setType] = React.useState<TType>('create');

  const showCreateView = () => {
    setVisible(true);
    setType('create');
  };

  const handleClose = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: '用户组名称',
      dataIndex: 'name'
    },
    {
      title: '用户数',
      dataIndex: 'userNumber'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
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
            />
          </Tooltip>
          <Tooltip placement="top" title="删除">
            <Button
              type="danger"
              size="small"
              icon="delete"
            />
          </Tooltip>
        </div>
      )
    }
  ];

  const table = React.useMemo(() => {
    return (
      <StandardTable
        data={groupTable}
        columns={columns}
      />
    )
  }, [props.groupTable]);

  return (
    <React.Fragment>
      <PageHeaderWrapper
        title="用户组管理"
        extra={[
          <Button key="1" type="primary" onClick={showCreateView}>
            新建用户组
          </Button>
        ]}
      >
        <Alert
          message="通过用户组对职责相同的用户进行分类并授权，可以更加高效地管理用户及其权限。对一个用户组进行授权后，用户组内的所有用户会自动继承该用户组的权限。如果一个用户被加入到多个用户组，那么该用户将会继承多个用户组的权限。"
          type="info"
          closable
        />
      </PageHeaderWrapper>

      <Card bordered={false}>
        {table}
      </Card>

      <GroupDrawer
        visible={visible}
        type={type}
        onClose={handleClose}
      />
    </React.Fragment>
  )
};

export default connect(({ userGroup }) => ({
  groupTable: userGroup.table
}))(GroupsPage);
