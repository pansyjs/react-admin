import React from 'react';
import { Form, Button, Row, Col } from 'antd';
import ItemMap from './map';
import LoginContext from './LoginContext';

const FormItem = Form.Item;

export interface LoginItemProps {
  type: string;
}

class WarpFormItem extends React.Component<LoginItemProps, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const { type } = this.props;

    if (type === 'Captcha') {
      return (
        <div>123</div>
      )
    }
  }
}

const LoginItem = {};

export default LoginItem;

