import React, { FC } from 'react';
import { connect } from 'dva';
import store from 'store';
import { STORAGE_KEY_DEFAULT_CONFIG } from '@/config';
import { LoginType } from '@/models/login';
import { ConnectState } from '@/models/connect';
import PasswordLoginForm from './components/password-login-form';
import SMSLoginForm from './components/sms-login-form';
import './login.less';

interface LoginPageProps {
  prefixCls?: string;
  loginType: LoginType;
  loading: boolean;
  dispatch: (args: any) => void;
}

const LoginPage: FC<LoginPageProps> = (props) => {
  const { prefixCls, loginType, loading, dispatch } = props;

  const handleLogin = (values) => {
    dispatch({
      type: 'login/fetchLogin',
      payload: values,
    });
  };

  const handleChangeType = (type) => {
    const { loginType } = STORAGE_KEY_DEFAULT_CONFIG;

    store.set(loginType, type);

    dispatch({
      type: 'login/changeLoginType',
      payload: type,
    });
  };

  return (
    <div className={prefixCls}>
      {/** 账户密码登录 */}
      {loginType === 'password' && (
        <PasswordLoginForm
          prefixCls={prefixCls}
          loading={loading}
          onLogin={handleLogin}
          onChangeType={handleChangeType}
        />
      )}

      {/** 短信验证码登录 */}
      {loginType === 'sms' && (
        <SMSLoginForm
          prefixCls={prefixCls}
          loading={loading}
          onLogin={handleLogin}
          onChangeType={handleChangeType}
        />
      )}
    </div>
  );
}

LoginPage.defaultProps = {
  prefixCls: 'login-page',
};

export default connect(({ login, loading }: ConnectState) => ({
  loginType: login.type,
  loading: loading.effects['login/fetchLogin'],
}))(LoginPage);
