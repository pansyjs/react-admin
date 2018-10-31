import React from 'react';
import { Icon } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { connect, SubscriptionAPI } from 'dva';
import { FormComponentProps } from 'antd/lib/form';
import UserLayout from '@/layouts/UserLayout';
import Login from '@/components/Login';
import styles from './login.less';

// @ts-ignore
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

interface LoginPageProps extends FormComponentProps, SubscriptionAPI {
  userName?: string;
}

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login']
}))
class LoginPage extends React.Component<LoginPageProps, any> {
  private loginForm: any;

  public state = {
    type: 'account',
    autoLogin: true
  };

  onTabChange = (type: string) => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobile
          })
            // @ts-ignore
            .then(resolve)
            .catch(reject);
        }
      });
    });

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type
        }
      });
    }
  };

  render() {
    const { type } = this.state;
    return (
      <UserLayout>
        <div className={styles.main}>
          <Login
            defaultActiveKey={type}
            onTabChange={this.onTabChange}
            onSubmit={this.handleSubmit}
            ref={(form) => {
              this.loginForm = form;
            }}
          >
            <Tab
              key="account"
              tab={formatMessage({ id: 'app.login.tab-login-credentials' })}
            >
              <UserName name="userName" placeholder="username: admin or user" />
              <Password
                name="password"
                placeholder="password: ant.design"
                onPressEnter={() =>
                  this.loginForm.validateFields(this.handleSubmit)
                }
              />
            </Tab>
            <Tab
              key="mobile"
              tab={formatMessage({ id: 'app.login.tab-login-mobile' })}
            >
              <Mobile name="mobile" />
              <Captcha
                name="captcha"
                countDown={120}
                onGetCaptcha={this.onGetCaptcha}
              />
            </Tab>
            <Submit>
              <FormattedMessage id="app.login.login" />
            </Submit>
            <div className={styles.other}>
              <FormattedMessage id="app.login.sign-in-with" />
              <Icon
                type="alipay-circle"
                className={styles.icon}
                theme="outlined"
              />
              <Icon
                type="taobao-circle"
                className={styles.icon}
                theme="outlined"
              />
              <Icon
                type="weibo-circle"
                className={styles.icon}
                theme="outlined"
              />
              <Link className={styles.register} to="/User/Register">
                <FormattedMessage id="app.login.signup" />
              </Link>
            </div>
          </Login>
        </div>
      </UserLayout>
    );
  }
}

export default LoginPage;
