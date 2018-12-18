import React from 'react';
import { Component } from '@/components/BaseComponent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

export interface RoleProps {}

class Role extends Component<RoleProps, any> {
  render() {
    return <PageHeaderWrapper title="角色管理">Role</PageHeaderWrapper>;
  }
}

export default Role;
