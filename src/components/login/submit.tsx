import React, { FC } from 'react';
import { Button, Form } from 'antd';
import { ButtonProps } from 'antd/es/button';
import classNames from 'classnames';
import styles from './index.less';

const LoginSubmit: FC<ButtonProps> = ({ className, ...rest }) => {
  const clsString = classNames(styles.submit, className);

  return (
    <Form.Item>
      <Button
        size="large"
        className={clsString}
        type="primary"
        htmlType="submit"
        {...rest}
      />
    </Form.Item>
  );
}

export default LoginSubmit;
