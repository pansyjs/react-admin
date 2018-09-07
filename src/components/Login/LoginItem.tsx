import React from 'react';
import { Form, Button, Row, Col } from 'antd';
import ItemMap from './map';
import LoginContext from './LoginContext';

const FormItem = Form.Item;

export interface LoginItemProps {
  name?: string;
  rules?: any[];
  style?: React.CSSProperties;
  onGetCaptcha?: () => void;
  placeholder?: string;
  buttonText?: React.ReactNode;
  form: any;
}

class WarpFormItem extends React.Component<LoginItemProps, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;

    const { buttonText, name } = this.props;

    return <FormItem>{getFieldDecorator}</FormItem>;
  }
}

const LoginItem = {};

export default LoginItem;
