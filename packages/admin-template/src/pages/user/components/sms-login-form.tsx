import React, { FC } from 'react';
import { KeyOutlined, MobileOutlined } from '@ant-design/icons';
import { Input, Button, Form } from 'antd';
import { formatMessage, FormattedMessage } from 'umi';
import { SendCode } from '@alitajs/antd-plus';

interface SMSLoginFormProps {
  prefixCls: string;
  loading?: boolean;
  onLogin?: (values) => void;
  onChangeType?: (type: string) => void;
}

const SMSLoginForm: FC<SMSLoginFormProps> = (props) => {
  const { prefixCls, loading, onLogin, onChangeType } = props;
  const loginType = 'password';
  const [start, setStart] = React.useState<boolean>(false);

  const handleSubmit = (values) => {
    onLogin &&
      onLogin({
        ...values,
        type: loginType
      });
  };

  const handleChangeLoginType = () => {
    onChangeType && onChangeType(loginType);
  };

  const handleSendCode = () => {
    setStart(true);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: formatMessage({ id: 'validation.mobile.required' }) }]}
      >
        <Input
          size="large"
          prefix={<MobileOutlined />}
          placeholder={`${formatMessage({ id: 'app.login.mobile' })}`}
        />
      </Form.Item>
      <Form.Item
        name="code"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'validation.verification-code.required' })
          }
        ]}
      >
        <Input
          size="large"
          autoComplete="off"
          maxLength={6}
          prefix={<KeyOutlined />}
          placeholder={`${formatMessage({ id: 'app.login.verification-code' })}`}
          suffix={
            <SendCode start={start} onClick={handleSendCode} className="verification-code-button" />
          }
        />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit" size="large" block>
          <FormattedMessage id="app.login.login" />
        </Button>
        <div className={`${prefixCls}__switch`}>
          <span onClick={handleChangeLoginType}>
            <FormattedMessage id="app.login.login-type-password" />
          </span>
        </div>
      </Form.Item>
    </Form>
  );
};

SMSLoginForm.defaultProps = {
  loading: false
};

export default SMSLoginForm;
