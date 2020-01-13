import React, { FC } from 'react';
import { Input, Select, Form } from 'antd';
import DrawerWrapper from '@/components/drawer-wrapper';
import { IModule, IAction } from '@/models/action';

export type TFormType = 'create' | 'update';

interface ActionDrawerProps {
  formType: TFormType;
  visible: boolean;
  modules: IModule[];
  currentAction: IAction;
  onClose: () => void;
  onSubmit: (values) => void;
}

const { Option } = Select;
const { TextArea } = Input;

const ActionDrawer: FC<ActionDrawerProps> = (props) => {
  const { visible, modules, onClose, onSubmit, formType, currentAction } = props;
  const [title, setTitle] = React.useState<string>('');

  React.useEffect(() => {
    if (formType) {
      setTitle(formType === 'create' ? '创建操作' : '更新操作');
    }
  }, [props.formType]);

  React.useEffect(() => {
    if (!visible) {
      // form.resetFields();
    }
  }, [props.visible]);

  const handleConfirm = (values) => {
    const data = { ...values };

    if (formType === 'update') {
      // @ts-ignore
      data.id = currentAction.id;
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

  const moduleOptions = React.useMemo(() => {
    return modules.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  }, [props.modules]);

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
          label="操作名称"
          rules={[
            {
              required: true,
              message: '名称不能为空'
            }
          ]}
        >
          <Input placeholder="请输入操作名称" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="displayName"
          label="显示名称"
          rules={[
            {
              required: true,
              message: '显示名称不能为空'
            }
          ]}
        >
          <Input placeholder="请输入显示名称" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="moduleId"
          label="所属模块"
          rules={[
            {
              required: true,
              message: '所属模块不能为空'
            }
          ]}
        >
          <Select showSearch placeholder="请选择所属模块" optionFilterProp="children">
            {moduleOptions}
          </Select>
        </Form.Item>
        <Form.Item {...formItemLayout} name="remark" label="备注">
          <TextArea rows={3} />
        </Form.Item>
      </Form>
    </DrawerWrapper>
  );
};

ActionDrawer.defaultProps = {
  modules: []
};

export default ActionDrawer;
