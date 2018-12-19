import React from 'react';
import { Component } from '@/components/BaseComponent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

export interface AccountProps {}

class Account extends Component<AccountProps, any> {
  render() {
    return <PageHeaderWrapper title="账户管理">Account</PageHeaderWrapper>;
  }
}

export default Account;
