import React from 'react';
import { Card, Form, Input, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { FormattedMessage } from 'umi/locale';
import styles from './Login.less';

const FormItem = Form.Item;

export interface LoginPageProps extends FormComponentProps {}

interface State {
  readonly showPassword: boolean;
}

class LoginPage extends React.Component<LoginPageProps, State> {
  readonly state: State = {
    showPassword: false
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  changeShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    const { showPassword } = this.state;

    return (
      <div className={styles.main}>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('userName', {
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
