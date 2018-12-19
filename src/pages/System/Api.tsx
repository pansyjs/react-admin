import React from 'react';
import { Component } from '@/components/BaseComponent';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

export interface ApiProps {}

class Api extends Component<ApiProps, any> {
  render() {
    return <PageHeaderWrapper title="接口管理">Api</PageHeaderWrapper>;
  }
}

export default Api;
