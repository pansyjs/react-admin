import React from 'react';
import ClassNames from 'classnames';
import { Button, Form } from 'antd';
import styles from './index.scss';

const FormItem = Form.Item;

export interface LoginSubmitProps {
  className?: string;
}

// 提交登录表单组件
class LoginSubmit extends React.Component<LoginSubmitProps, any> {
  static defaultProps = {
    className: ''
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { className, ...restProps } = this.props;
    const cls = ClassNames(styles.submit, className);

    return (
      <FormItem>
        <Button
          className={cls}
          size="large"
          type="primary"
          htmlType="submit"
          {...restProps}
        />
      </FormItem>
    );
  }
}

export default LoginSubmit;
