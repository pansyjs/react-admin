import React from 'react';
import { Component } from '@/components/BaseComponent';

class SettingsLayout extends Component {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

export default SettingsLayout;
