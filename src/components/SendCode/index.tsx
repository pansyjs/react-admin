import React from 'react';
import { Button } from 'antd';

export type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'danger';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'small' | 'default' | 'large';
export type ButtonHTMLType = 'submit' | 'button' | 'reset';

export interface BaseButtonProps {
  type?: ButtonType;
  icon?: string;
  shape?: ButtonShape;
  size?: ButtonSize;
  loading?: boolean | { delay?: number };
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
  block?: boolean;
}

interface SendCodeProps extends BaseButtonProps {
  className?: string;
  initStr?: string;
  second?: number;
  runStr?: string;
  resetStr?: string;
  value: boolean;
  storageKey?: string;
}

class SendCode extends React.Component<SendCodeProps, any> {
  render() {
    return (
      <Button />
    )
  }


}
