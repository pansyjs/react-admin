import React from 'react';
import { Modal, Form, Input } from 'antd';
import { Component } from '@/components/BaseComponent';

type actionType = 'create' | 'update';

export interface RoleFormProps {
  visible: boolean;
  actionType?: actionType;
  onCancel?: () => void;
  onSubmit?: (values: any) => void;
}

interface DefaultProps {
  visible: boolean;
  actionType: actionType;
}

const FormItem = Form.Item;
const { TextArea } = Input;

class RoleForm extends Component<RoleFormProps, any> {
  static defaultProps: DefaultProps = {
    visible: false,
    actionType: 'create'
  };

  // modal关闭回调
  handleCancel = (event) => {
    event.preventDefault();
    const { onCancel } = this.props;
    onCancel && onCancel();
  };

  // 提交表单
  handleSubmit = (event) => {
    event.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      onSubmit
    } = this.props;

    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        onSubmit && onSubmit(values);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      visible,
      actionType
    } = this.props;
    const title = actionType === 'create' ? '创建角色' : '修改角色';

    return (
      <Modal
        visible={visible}
        title={title}
        onCancel={this.handleCancel}
        onOk={this.handleSubmit}
      >
        <Form layout="vertical">
          <FormItem label="角色名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your note!' }]
            })(<Input placeholder="请输入角色名称" />)}
          </FormItem>
          <FormItem label="备注">
            {getFieldDecorator('remark', {
              rules: []
            })(<TextArea placeholder="请输入角色备注" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

// @ts-ignore
export default Form.create()(RoleForm);
