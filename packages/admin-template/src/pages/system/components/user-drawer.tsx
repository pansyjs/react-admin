import React from 'react';
import { Input, Form } from 'antd';
import DrawerWrapper from '@/components/drawer-wrapper';
import { IUser } from '../models/system-user';

export type TType = 'create' | 'update';

interface UserDrawerProps {
  type?: TType;
  currentUser?: IUser;
  visible?: boolean;
  onClose?: () => void;
  onSubmit?: (values) => void;
}

const { TextArea } = Input;

const UserDrawer: React.FC<UserDrawerProps> = (props) => {
  const { visible, onClose, onSubmit, type, currentUser } = props;

  const [title, setTitle] = React.useState<string>('');

  React.useEffect(() => {
    setTitle(type === 'create' ? '添加用户' : '更新用户');
  }, [props.type]);

  React.useEffect(() => {
    if (!visible) {
      // form.resetFields();
    }
  }, [props.visible]);

  const handleConfirm = (values) => {
    const data = { ...values };

    if (type === 'update') {
      // @ts-ignore
      data.id = currentUser.id;
    }

    onSubmit && onSubmit(data);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 15 }
    }
  };

  return (
    <DrawerWrapper
      visible={visible}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleConfirm}
      width={600}
      title={title}
    >
      <Form>
        <Form.Item
          {...formItemLayout}
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: '用户名不能为空'
            }
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="mobile"
          label="手机号"
          rules={[
            {
              required: true,
              message: '手机号不能为空'
            }
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="email"
          label="邮箱地址"
          rules={[
            {
              required: true,
              message: '邮箱地址不能为空'
            }
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item {...formItemLayout} name="remark" label="备注">
          <TextArea rows={3} />
        </Form.Item>
      </Form>
    </DrawerWrapper>
  );
};

UserDrawer.defaultProps = {
  visible: false,
  currentUser: {}
};

export default UserDrawer;
