import React from 'react';
import { Form, Input } from 'antd';
import { FormItemProps } from 'antd/es/form/FormItem';
import { InputProps } from 'antd/es/input';
import { SendCode } from '@alitajs/antd-plus';
import { fetchCaptcha } from '@/services/login';

interface CaptchaProps {
  options?: FormItemProps;
  inputProps: InputProps;
}

const Captcha: React.FC<CaptchaProps> = ({
  options,
  inputProps
}) => {
  const handleSendCodeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(123);
  }

  return (
    <Form.Item shouldUpdate noStyle>
      {({ getFieldValue }) => (
        <Form.Item name={name} {...options}>
          <Input
            {...inputProps}
            suffix={
              <SendCode
                type="link"
                onClick={handleSendCodeClick}
              />
            }
          />
        </Form.Item>
      )}
    </Form.Item>
  )
}

export default Captcha;
