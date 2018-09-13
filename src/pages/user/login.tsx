import React from 'react';
import Link from 'umi/link';
import { Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Login from '@components/Login';
import styles from './login.scss';

const { Submit, Tab } = Login;

interface LoginPageProps extends FormComponentProps {
  userName?: string;
}

class LoginPage extends React.Component<LoginPageProps, any> {
  private loginForm: any;
  constructor(props) {
    super(props);
    this.state = {
      type: 'account'
    };
  }

  handleTabChange = (type) => {
    if (!type) return;
    this.setState({
      type
    });
  };

  handleSubmit = (err, values) => {};

  render() {
    const {} = this.props;
    const { type } = this.state;
    return (
      <div className={styles.login}>
        <Submit>登录</Submit>
        <div className={styles.other}>
          其他登录方式
          <Icon
            type="heart"
            theme="twoTone"
            className={styles.icon}
            twoToneColor="#eb2f96"
          />
          <Link className={styles.register} to="/User/Register">
            注册账户
          </Link>
        </div>
      </div>
    );
  }
}

export default LoginPage;
