import React from 'react';
import Link from 'umi/link';
import { Form, Input, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

interface IProps extends FormComponentProps {
  prefixCls: string;
  loading?: boolean;
  onLogin?: (values) => void;
  onChangeType?: (type: string) => void;
}

const FormItem = Form.Item;

const SMSLoginForm: React.FC<IProps> = (props) => {
  const {
    prefixCls,
    loading,
    onLogin,
    onChangeType,
    form: { validateFields, getFieldDecorator }
  } = props;
  const loginType = 'password';

  const handleSubmit = (e) => {
    e.preventDefault();

    validateFields((error, values) => {
      if (!error) return;
      onLogin && onLogin({
        ...values,
        type: loginType
      });
    })
  };

  const handleChangeLoginType = () => {
    onChangeType && onChangeType(loginType);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator('mobile', {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'validation.mobile.required' })
            }
          ]
        })(
          <Input
            size="large"
            prefix={<Icon type="mobile" />}
            placeholder={`${formatMessage({ id: 'app.login.mobile' })}`}
          />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('code', {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'validation.verification-code.required' })
            }
          ]
        })(
          <Input
            size="large"
            autoComplete="off"
            placeholder={`${formatMessage({ id: 'app.login.verification-code' })}`}
          />
        )}
      </FormItem>
      <FormItem>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          size="large"
          block
        >
          <FormattedMessage id="app.login.login" />
        </Button>
        <div className={`${prefixCls}__switch`}>
          <span onClick={handleChangeLoginType}>
            <FormattedMessage id="app.login.login-type-password" />
          </span>
        </div>
      </FormItem>
    </Form>
  )
};

SMSLoginForm.defaultProps = {
  loading: false
};

export default Form.create()(SMSLoginForm);
