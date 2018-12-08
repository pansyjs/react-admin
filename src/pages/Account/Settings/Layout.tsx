import React from 'react';
import BaseComponent from '@/components/BaseComponent';

class SettingsLayout extends BaseComponent {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

export default SettingsLayout;
