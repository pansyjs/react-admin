import React from 'react';
import Omit from 'omit.js';
import { Form, Button, Row, Col, Input } from 'antd';
import { FormProps } from 'antd/lib/form';
import { WrappedFormUtils, GetFieldDecoratorOptions } from 'antd/es/form/Form';
import { Consumer } from './index';
import ItemMap from './map';
import styles from './index.less';

const FormItem = Form.Item;

export interface LoginItemProps extends FormProps {
  name?: string;
  rules?: any[];
  style?: React.CSSProperties;
  placeholder?: string;
  // 点击获取验证码的回调
  onGetCaptcha?: () => void | false | Promise<string>;
  // 倒计时
  countDown: number;
  // 点击获取校验码的说明文字
  buttonText?: React.ReactNode;
  updateActive: any;
  type: string;
  form: WrappedFormUtils;
}

class WrapFormItem extends React.Component<LoginItemProps, any> {
  private interval: NodeJS.Timer;

  static defaultProps = {
    buttonText: '获取验证码'
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    const { updateActive, name } = this.props;
    updateActive && updateActive(name);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    const { onGetCaptcha } = this.props;
    const result = onGetCaptcha ? onGetCaptcha() : null;
    if (result === false) {
      return;
    }
    if (result instanceof Promise) {
      result.then(this.runGetCaptchaCountDown);
    } else {
      this.runGetCaptchaCountDown();
    }
  };

  getFormItemOptions = (defaultValue, rules) => {
    const options: GetFieldDecoratorOptions = {
      rules: rules
    };
    if (defaultValue) {
      options.initialValue = defaultValue;
    }
    return options;
  };

  runGetCaptchaCountDown = () => {
    const { countDown } = this.props;
    let count = countDown || 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  render() {
    const { count } = this.state;
    const {
      form: { getFieldDecorator }
    } = this.props;

    const {
      onChange,
      defaultValue,
      rules,
      name,
      buttonText,
      updateActive,
      type,
      ...restProps
    } = this.props;
    const options = this.getFormItemOptions(defaultValue, rules);
    const otherProps = restProps || {};

    if (type === 'Captcha') {
      const inputProps = Omit(otherProps, ['onGetCaptcha', 'countDown']);
      return (
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator(name, options)(<Input {...inputProps} />)}
            </Col>
            <Col span={8}>
              <Button
                disabled={count}
                className={styles.getCaptcha}
                size="large"
                onClick={this.onGetCaptcha}
              >
                {count ? `${count} s` : buttonText}
              </Button>
            </Col>
          </Row>
        </FormItem>
      );
    }
    return (
      <FormItem>
        {getFieldDecorator(name, options)(<Input {...otherProps} />)}
      </FormItem>
    );
  }
}

const LoginItem = {};
Object.keys(ItemMap).forEach((key) => {
  const item = ItemMap[key];
  LoginItem[key] = (props) => (
    <Consumer>
      {(context) => (
        <WrapFormItem
          customprops={item.props}
          rules={item.rules}
          {...props}
          type={key}
          updateActive={context.updateActive}
          form={context.form}
        />
      )}
    </Consumer>
  );
});

export default LoginItem;
