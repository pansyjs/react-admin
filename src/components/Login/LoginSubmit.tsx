import React from 'react';
import ClassNames from 'classnames';
import { Button, Form } from 'antd';
import styles from './index.scss';

const FormItem = Form.Item;

export interface LoginSubmitProps {
  className?: string;
}

class LoginSubmit extends React.Component<LoginSubmitProps, any> {
  render() {
    const { className, ...restProps } = this.props;
    const clsString = ClassNames(styles.submit, className);

    return (
      <FormItem>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className={clsString}
          {...restProps}
        />
      </FormItem>
    )
  }
}

export default LoginSubmit;
