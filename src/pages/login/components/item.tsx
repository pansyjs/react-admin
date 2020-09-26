import React from 'react';
import { Input, Form } from 'antd';
import { FormItemProps } from 'antd/es/form/FormItem';
import ItemMap from './map';
import LoginContext, { LoginContextProps } from './context';
import Captcha from './captcha';

export type WrappedLoginItemProps = LoginItemProps;
export type LoginItemKeyType = keyof typeof ItemMap;
export interface LoginItemType {
  Username: React.FC<WrappedLoginItemProps>;
  Password: React.FC<WrappedLoginItemProps>;
  Mobile: React.FC<WrappedLoginItemProps>;
  Captcha: React.FC<WrappedLoginItemProps>;
}

export interface LoginItemProps extends Partial<FormItemProps> {
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  customProps?: { [key: string]: unknown };
  tabUtil?: LoginContextProps['tabUtil'];
  updateActive?: LoginContextProps['updateActive'];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * 获取验证码回调
   */
  onCaptcha?: () => Promise<boolean>;
}

/**
 * 获取表单项的参数
 * @param params
 */
const getFormItemOptions = ({
  onChange,
  defaultValue,
  customProps = {},
  rules,
}: LoginItemProps) => {
  const options: {
    rules?: LoginItemProps['rules'];
    onChange?: LoginItemProps['onChange'];
    initialValue?: LoginItemProps['defaultValue'];
  } = {
    rules: rules || (customProps.rules as LoginItemProps['rules']),
  };
  if (onChange) {
    options.onChange = onChange;
  }
  if (defaultValue) {
    options.initialValue = defaultValue;
  }
  return options;
};

const LoginItem: React.FC<LoginItemProps> = (props) => {
  const {
    onChange,
    customProps,
    defaultValue,
    rules,
    name,
    updateActive,
    type,
    tabUtil,
    ...restProps
  } = props;

  if (!name) {
    return null;
  }
  // get getFieldDecorator props
  const options = getFormItemOptions(props);
  const otherProps = restProps || {};

  if (type === 'Captcha') {
    return (
      <Form.Item name={name} {...options}>
        <Captcha {...customProps} {...otherProps}  />
      </Form.Item>
    );
  }
  return (
    <Form.Item name={name} {...options}>
      <Input {...customProps} {...otherProps} />
    </Form.Item>
  );
};

const LoginItems: Partial<LoginItemType> = {};

Object.keys(ItemMap).forEach((key) => {
  const item = ItemMap[key];
  LoginItems[key] = (props: LoginItemProps) => (
    <LoginContext.Consumer>
      {(context) => (
        <LoginItem
          customProps={item.props}
          rules={item.rules}
          {...props}
          type={key}
          {...context}
          updateActive={context.updateActive}
        />
      )}
    </LoginContext.Consumer>
  );
});

export default LoginItems as LoginItemType;
