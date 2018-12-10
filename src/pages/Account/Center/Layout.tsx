import React from 'react';
import { Component } from '@/components/BaseComponent';

class CenterLayout extends Component {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

export default CenterLayout;
