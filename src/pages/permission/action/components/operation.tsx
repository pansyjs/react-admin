import React from 'react';
import {
  Select,
  Input,
} from '@formily/antd';
import { FormProvider, Field } from '@formily/react'
import { createForm } from '@formily/core'
import { useRequest } from 'umi';
import { Button, Drawer } from 'antd';
import { UseModalResult } from '@pansy/react-hooks';
import { createAction } from '@/services/permission';
import { modules } from '../../constant';

const TextArea = Input.TextArea;

const Operation: React.FC<UseModalResult> = ({
  visible,
  close
}) => {
  const form = createForm()

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
    form.submit((values) => {
      request.run(values);
    });
  }

  const handleCancel = () => {
    form.reset();
    close?.();
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
      <FormProvider
        form={form}
      >
        <Field
          name="module"
          title="所属模块"
          component={[
            Select,
            {
              placeholder: '请选择',
              options: modules
            },
          ]}
          required
        />

        <Field
          name="name"
          title="操作名称"
          x-component="Input"
          x-component-props={{
            placeholder: '请输入'
          }}
          component={[
            Input,
            {
              placeholder: '请输入'
            },
          ]}
          required
        />

        <Field
          name="code"
          title="操作标识"
          component={[
            Input,
            {
              placeholder: '请输入'
            },
          ]}
          required
          pattern="^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$"
          description="只能包含数字、字母、下划线，且不能以下划线开头和结尾"
        />

        <Field
          name="remark"
          title="备注"
          component={[
            TextArea,
            {
              placeholder: '请输入'
            },
          ]}
        />
      </FormProvider>
    </Drawer>
  )
}

export default Operation;
