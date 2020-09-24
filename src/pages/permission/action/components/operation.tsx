import React from 'react';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '@formily/antd';
import { useRequest } from 'umi';
import { Input, Select } from '@formily/antd-components'
import { Button, Drawer } from 'antd';
import { UseModalResult } from '@pansy/hooks/es/use-modal';
import { createAction, updateAction } from '@/services/permission';
import { modules } from '../../constant';

const TextArea = Input.TextArea;
const actions = createFormActions()

const Operation: React.FC<UseModalResult> = ({
  visible,
  closeModal
}) => {
  const request = useRequest(
    (data: API.PermissionActionData) => {
      return createAction(data);
    },
    {
      manual: true,
      onSuccess: () => {
        console.log('创建成功！');
      }
    }
  );

  const handleSubmit = () => {
    actions.submit((values) => {
      request.run(values);
    });
  }

  const handleCancel = () => {
    actions.reset();
    closeModal?.();
  }

  return (
    <Drawer
      title="添加操作"
      visible={visible}
      onClose={handleCancel}
      maskClosable={false}
      width={600}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button onClick={handleSubmit} loading={request.loading} type="primary">
            确认
          </Button>
        </div>
      }
    >
      <SchemaForm
        layout="vertical"
        actions={actions}
        components={{ Input, Select, TextArea }}
        onSubmit={(values) => { console.log(values); }}
      >
        <Field
          name="module"
          type="string"
          title="所属模块"
          enum={modules}
          x-component="Select"
          x-component-props={{
            placeholder: '请选择'
          }}
          required
        />

        <Field
          name="name"
          type="string"
          title="操作名称"
          x-component="Input"
          x-component-props={{
            placeholder: '请输入'
          }}
          required
        />

        <Field
          name="code"
          type="string"
          title="操作标识"
          x-component="Input"
          x-component-props={{
            placeholder: '请输入'
          }}
          required
          pattern="^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$"
          description="只能包含数字、字母、下划线，且不能以下划线开头和结尾"
        />

        <Field
          name="remark"
          type="string"
          title="备注"
          x-component="TextArea"
          x-component-props={{
            placeholder: '请输入'
          }}
          maxLength={100}
        />
      </SchemaForm>
    </Drawer>
  )
}

export default Operation;
