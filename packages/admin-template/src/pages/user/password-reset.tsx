import React, { FC } from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import PasswordResetForm from './components/password-reset-form';
import './password-reset.less';

interface PasswordResetProps {
  prefixCls?: string;
  loading: boolean;
  dispatch: (args: any) => void;
}

const PasswordReset: FC<PasswordResetProps> = (props) => {
  const { prefixCls } = props;

  return (
    <div className={prefixCls}>
      <PasswordResetForm prefixCls={prefixCls} />
    </div>
  );
};

PasswordReset.defaultProps = {
  prefixCls: 'user-password-reset-page',
};

export default connect(({ loading }: ConnectState) => ({
  loading: loading.effects['login/fetchRegister'],
}))(PasswordReset);
