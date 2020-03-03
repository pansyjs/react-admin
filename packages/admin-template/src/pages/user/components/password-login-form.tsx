import React, { FC } from 'react';
import { Link } from 'umi';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, Form } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

interface PasswordLoginFormProps {
  prefixCls: string;
  loading?: boolean;
  onLogin?: (values) => void;
  onChangeType?: (type: string) => void;
}

const PasswordLoginForm: FC<PasswordLoginFormProps> = (props) => {
  const { prefixCls, loading, onLogin, onChangeType } = props;

  // 触发登录
  const handleSubmit = (values) => {
    onLogin &&
      onLogin({
        ...values,
        type: 'password'
      });
  };

  // 切换短信验证码登录
  const handleChangeLoginType = () => {
    onChangeType && onChangeType('sms');
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
        name="password"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'validation.password.required' })
          }
        ]}
      >
        <Input
          size="large"
          prefix={<LockOutlined />}
          autoComplete="off"
          type="password"
          placeholder={`${formatMessage({ id: 'app.login.password' })}`}
          suffix={
            <span className="forgot-link">
              <Link to="/user/password-reset">
                <FormattedMessage id="app.login.forgot-password" />
              </Link>
            </span>
          }
        />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit" size="large" block>
          <FormattedMessage id="app.login.login" />
        </Button>
        <div className={`${prefixCls}__switch`}>
          <span onClick={handleChangeLoginType}>
            <FormattedMessage id="app.login.login-type-sms" />
          </span>
        </div>
      </Form.Item>
    </Form>
  );
};

PasswordLoginForm.defaultProps = {
  loading: false
};

export default PasswordLoginForm;
