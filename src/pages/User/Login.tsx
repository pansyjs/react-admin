import React from 'react';
import { Card, Form, Input, Icon, Button } from 'antd';
import { connect } from 'dva';
import { FormattedMessage } from 'umi/locale';
import { Component } from '@/components/BaseComponent';
import styles from './Login.less';

const FormItem = Form.Item;

export interface LoginPageProps {
  loading?: boolean;
}

interface State {
  readonly showPassword: boolean;
}

@connect(({ loading }) => ({
  loading: loading.effects['login/fetchLogin']
}))
class LoginPage extends Component<LoginPageProps, State> {
  readonly state: State = {
    showPassword: false
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((error, values) => {
      if (error) return;
      dispatch({
        type: 'login/fetchLogin',
        payload: values
      });
    });
  };

  changeShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      loading
    } = this.props;
    const { showPassword } = this.state;

    return (
      <div className={styles.main}>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              })(
                <Input prefix={<Icon type="user" />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              })(
                <Input
                  prefix={<Icon type="lock" />}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  suffix={
                    <Icon
                      onClick={this.changeShowPassword}
                      type="eye"
                      style={showPassword ? { color: '#1890FF' } : {}}
                    />
                  }
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className={styles.loginButton}
              >
                <FormattedMessage id="app.login.login" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(LoginPage);
