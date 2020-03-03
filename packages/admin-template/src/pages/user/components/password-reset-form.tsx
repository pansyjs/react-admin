import React, { FC } from 'react';
import { history } from 'umi';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, Form } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

interface PasswordResetFormProps {
  prefixCls?: string;
  loading?: boolean;
  onSubmit?: (values) => void;
}

const PasswordResetForm: FC<PasswordResetFormProps> = (props) => {
  const { prefixCls, loading, onSubmit } = props;

  const handleSubmit = (values) => {
    onSubmit && onSubmit(values);
  };

  const handleReturnLogin = () => {
    history.push('/user/login');
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'validation.username.required' })
          }
        ]}
      >
        <Input
          size="large"
          prefix={<UserOutlined />}
          placeholder={`${formatMessage({ id: 'app.login.username' })}`}
        />
      </Form.Item>
      <Form.Item
        name="oldPassword"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'validation.verification-code.required' })
          }
        ]}
      >
        <Input
          size="large"
          prefix={<LockOutlined />}
          placeholder={`${formatMessage({ id: 'app.password-reset.old-password' })}`}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'validation.verification-code.required' })
          }
        ]}
      >
        <Input
          size="large"
          type="password"
          autoComplete="off"
          prefix={<LockOutlined />}
          placeholder={`${formatMessage({ id: 'app.password-reset.new-password' })}`}
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'validation.verification-code.required' })
          }
        ]}
      >
        <Input
          size="large"
          type="password"
          autoComplete="off"
          prefix={<LockOutlined />}
          placeholder={`${formatMessage({ id: 'app.password-reset.confirm-password' })}`}
        />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit" size="large" block>
          <FormattedMessage id="app.password-reset.button" />
        </Button>
        <div className={`${prefixCls}__tools`}>
          <span onClick={handleReturnLogin}>
            <FormattedMessage id="app.password-reset.login" />
          </span>
        </div>
      </Form.Item>
    </Form>
  );
};

PasswordResetForm.defaultProps = {
  loading: false
};

export default PasswordResetForm;
