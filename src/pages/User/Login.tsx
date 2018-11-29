import React from 'react';
import { Card, Form, Input, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { FormattedMessage } from 'umi/locale';
import styles from './Login.less';

const FormItem = Form.Item;

export interface LoginPageProps extends FormComponentProps {}

class LoginPage extends React.Component<LoginPageProps> {
  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;

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
                  type="password"
                  placeholder="Password"
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
