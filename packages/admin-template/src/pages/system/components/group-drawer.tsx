import React, { FC } from 'react';
import { Input, Form } from 'antd';
import DrawerWrapper from '@/components/drawer-wrapper';
import { IGroup } from '../models/user-group';

export type TType = 'create' | 'update';

interface GroupDrawerProps {
  type?: TType;
  visible?: boolean;
  currentGroup?: IGroup;
  onClose?: () => void;
  onSubmit?: (values) => void;
}

const { TextArea } = Input;

const GroupDrawer: FC<GroupDrawerProps> = (props) => {
  const { visible, onClose, onSubmit, currentGroup, type } = props;

  const [title, setTitle] = React.useState<string>('');

  React.useEffect(() => {
    setTitle(type === 'create' ? '添加用户组' : '更新用户组');
  }, [props.type]);

  const handleConfirm = (values) => {
    const data = { ...values };

    if (type === 'update') {
      // @ts-ignore
      data.id = currentGroup.id;
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
          name="name"
          label="用户组名称"
          help="不超过64个字符，允许英文字母、数字，或'-'"
          rules={[
            {
              required: true,
              message: '用户组名称不能为空'
            }
          ]}
        >
          <Input placeholder="请输入用户组名称" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="displayName"
          label="显示名称"
          help="最大长度24个字符或汉字"
          rules={[
            {
              required: true,
              message: '显示名称不能为空'
            }
          ]}
        >
          <Input placeholder="请输入显示名称" />
        </Form.Item>
        <Form.Item {...formItemLayout} name="remark" label="备注">
          <TextArea rows={3} />
        </Form.Item>
      </Form>
    </DrawerWrapper>
  );
};

GroupDrawer.defaultProps = {
  visible: false,
  currentGroup: {}
};

export default GroupDrawer;
