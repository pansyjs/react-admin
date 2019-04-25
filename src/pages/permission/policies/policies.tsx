import React from 'react';
import router from 'umi/router';
import { Typography, Button, Card, Tooltip, Modal } from 'antd';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import StandardTable from '@/components/standard-table';
import { ConnectProps } from '@/models/connect';
import './policies.less';

interface IProps extends ConnectProps {
  prefixCls?: string;
}

const { Paragraph } = Typography;
const confirm = Modal.confirm;

const PoliciesPage: React.FC<IProps> = (props) => {
  const { prefixCls } = props;

  const showCreateView = () => {
    router.push('/permission/policies/create');
  };

  // 删除权限策略
  const handleConfirmRemove = (record) => {
    confirm({
      title: `确定删除${record.name}策略?`,
      content: '删除不可恢复',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        handleRemove(record);
      }
    });
  };

  const handleRemove = (record) => {

  };

  const list = [
    {
      id: '1',
      name: '胡彦斌',
      attachmentCount: 32,
      remark: '西湖区湖底公园1号'
    },
    {
      id: '2',
      name: '胡彦祖',
      attachmentCount: 42,
      remark: '西湖区湖底公园1号'
    }
  ];

  const columns = [
    {
      title: '权限策略名称',
      dataIndex: 'name'
    },
    {
      title: '策略类型',
      dataIndex: 'type'
    },
    {
      title: '引用次数',
      dataIndex: 'attachmentCount'
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
            onClick={() => {
              handleConfirmRemove(record);
            }}
          />
        </Tooltip>
      )
    }
  ];

  return (
    <React.Fragment>
      <PageHeaderWrapper
        title="支持两种类型的授权策略：由平台管理的系统访问策略和由客户管理的自定义访问策略。"
        extra={[
          <Button key="1" type="primary" onClick={showCreateView}>
            新建权限策略
          </Button>
        ]}
      >
        <div className="content">
          <Paragraph>
            - 对于系统访问策略，统一由平台创建，用户只能使用而不能修改，系统访问策略的版本更新由平台维护。
          </Paragraph>
          <Paragraph>
            - 对于自定义访问策略，用户可以自主创建、更新和删除，自定义策略的版本更新由客户自己维护。
          </Paragraph>
        </div>
      </PageHeaderWrapper>
      <div className={prefixCls}>
        <Card bordered={false}>
          <StandardTable
            data={{
              list
            }}
            columns={columns}
          />
        </Card>
      </div>
    </React.Fragment>
  )
};

PoliciesPage.defaultProps = {
  prefixCls: 'lotus-policies-page'
};

export default PoliciesPage;
