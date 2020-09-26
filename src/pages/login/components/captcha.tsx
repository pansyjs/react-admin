import React, { useState } from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/es/input';
import { SendCode } from '@alitajs/antd-plus';
import isFunction from 'lodash/isFunction';
import { LoginItemProps } from './item';

interface CaptchaProps extends InputProps {
  onCaptcha?: LoginItemProps['onCaptcha']
}

const Captcha: React.FC<CaptchaProps> = ({
  onCaptcha,
  ...restProps
}) => {
  const [start, setStart] = useState<boolean>(false);
  const [timing, setTiming] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onCaptcha && isFunction(onCaptcha)) {
      onCaptcha()
        ?.then((result) => {
          setStart(result);
        })
      setTiming(true);
    }
  }

  const handleEnd = () => {
    setStart(false);
  }

  return (
    <Input
      {...restProps}
      suffix={
        <SendCode
          type="link"
          start={start}
          disabled={timing}
          onClick={handleClick}
          onEnd={handleEnd}
        />
      }
    />
  )
}

export default Captcha;
