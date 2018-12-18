import React from 'react';
import { Component } from '@/components/BaseComponent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

export interface AuthorityProps {}

class Authority extends Component<AuthorityProps, any> {
  render() {
    return <PageHeaderWrapper title="权限管理">Authority</PageHeaderWrapper>;
  }
}

export default Authority;
