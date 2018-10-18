import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import UserLayout from '@/layouts/UserLayout';
import styles from './login.scss';

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
    return (
      <UserLayout>
        <div className={styles.login}>
          <div className={styles.other}>其他登录方式</div>
        </div>
      </UserLayout>
    );
  }
}

export default LoginPage;
