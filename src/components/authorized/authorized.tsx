import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { Authorized } from '@alitajs/antd-plus';
import { AuthorizedProps } from '@alitajs/antd-plus/lib/authorized/authorized';

const AuthorizedPus: React.FC<AuthorizedProps> = props => {
  return <Authorized {...props} />;
};

export default connect(({ user }: ConnectState) => ({
  policy: user.policy,
}))(AuthorizedPus);
