import React from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi-plugin-react/locale';
import PasswordResetForm from './components/password-reset-form';
import './password-reset.less';

interface IProps {
  prefixCls?: string;
  loading: boolean;
  dispatch: (args: any) => void;
}

const PasswordReset: React.FC<IProps> = (props) => {
  const { prefixCls } = props;

  return (
    <div className={prefixCls}>
      <h2>
        <FormattedMessage id="menu.password-reset" />
      </h2>

      <PasswordResetForm prefixCls={prefixCls} />
    </div>
  )
};

PasswordReset.defaultProps = {
  prefixCls: 'user-password-reset'
};

export default connect(({ loading }) => ({
  loading: loading.effects['login/fetchRegister']
}))(PasswordReset);
