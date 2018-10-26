import React from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { FormComponentProps } from 'antd/lib/form';
import UserLayout from '@/layouts/UserLayout';
import Login from '@/components/Login';
import styles from './login.less';

const { Tab } = Login;

interface LoginPageProps extends FormComponentProps {
  userName?: string;
}

class LoginPage extends React.Component<LoginPageProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      type: 'account'
    };
  }

  render() {
    const { type } = this.state;
    return (
      <UserLayout>
        <div className={styles.main}>
          <Login defaultActiveKey={type}>
            <Tab
              key="account"
              tab={formatMessage({ id: 'app.login.tab-login-credentials' })}
            />
            <Tab
              key="mobile"
              tab={formatMessage({ id: 'app.login.tab-login-mobile' })}
            />
          </Login>
        </div>
      </UserLayout>
    );
  }
}

export default LoginPage;
