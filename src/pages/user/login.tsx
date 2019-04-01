import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import Link from 'umi/link';
import { FormattedMessage } from 'umi-plugin-react/locale';
import './login.less';

interface IProps extends FormComponentProps {
  prefixCls?: string;
  dispatch: (args: any) => void;
  loading?: boolean;
}

const FormItem = Form.Item;

@connect(({ loading }) => ({
  loading: loading.effects['login/fetchLogin']
}))
class LoginPage extends React.Component<IProps, any> {
  static defaultProps = {
    prefixCls: 'user-login'
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFields },
      dispatch
    } = this.props;

    validateFields((error, values) => {
      if (error) return;
      dispatch({
        type: 'login/fetchLogin',
        payload: values
      });
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      prefixCls,
      loading
    } = this.props;

    return (
      <div className={prefixCls}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                size="large"
                prefix={<Icon type="user" />}
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                size="large"
                prefix={<Icon type="lock" />}
                placeholder="Password"
                suffix={
                  <span className="forgot-link">
                    <Link to="/user/password-reset">忘记密码</Link>
                  </span>
                }
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
              <span>验证码登录</span>
            </div>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(LoginPage);
