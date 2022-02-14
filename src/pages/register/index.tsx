import React, { useState } from 'react';
import { Link, useRequest, history } from 'umi';
import { Form, Button, Input, Popover, Progress, Select, message } from 'antd';
import { Store } from 'antd/es/form/interface';
import LockOutlined from '@ant-design/icons/LockOutlined';
import UserLayout from '@/layouts/user-layout';
import { fakeRegister, fetchCaptcha } from '@/services/login';
import LoginForm from '../login/components';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { Group } = Input;
const { Captcha } = LoginForm;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <span>强度：强</span>
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <span>强度：中</span>
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <span>强度：太短</span>
    </div>
  ),
};

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

export default () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [prefix, setPrefix] = useState<string>('86');
  const [popover, setPopover] = useState<boolean>(false);
  const confirmDirty = false;
  const [form] = Form.useForm();

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  const handleCaptcha = async () => {
    const { mobile } = await form.validateFields(['mobile']);

    if (mobile) {
      const result = await fetchCaptcha(mobile);
      if (result?.code === 200) {
        return true;
      }
    }

    return false;
  }

  const { loading: submitting, run: register } = useRequest<{ data: any }>(fakeRegister, {
    manual: true,
    onSuccess: (data, params) => {
      if (data.status === 'ok') {
        message.success('注册成功！');
        history.push({
          pathname: '/user/register-result',
          state: {
            account: params.email,
          },
        });
      }
    },
  });
  const onFinish = (values: Store) => {
    register(values);
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('两次输入的密码不匹配!');
    }
    return promise.resolve();
  };

  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setVisible(!!value);
      return promise.reject('请输入密码!');
    }
    // 有值的情况
    if (!visible) {
      setVisible(!!value);
    }
    setPopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };

  const changePrefix = (value: string) => {
    setPrefix(value);
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <UserLayout>
      <div className={styles.main}>
        <Form form={form} name="register" onFinish={onFinish}>
          <Group compact>
            <Select size="large" value={prefix} onChange={changePrefix} style={{ width: '20%' }}>
              <Option value="86">+86</Option>
              <Option value="87">+87</Option>
            </Select>
            <FormItem
              style={{ width: '80%' }}
              name="mobile"
              rules={[
                {
                  required: true,
                  message: '请输入手机号!',
                },
                {
                  pattern: /^\d{11}$/,
                  message: '手机号格式错误!',
                },
              ]}
            >
              <Input size="large" maxLength={11} placeholder="手机号" />
            </FormItem>
          </Group>
          <Captcha
            name="captcha"
            placeholder="验证码"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
            onCaptcha={handleCaptcha}
          />
          <Popover
            getPopupContainer={(node) => {
              if (node && node.parentNode) {
                return node.parentNode as HTMLElement;
              }
              return node;
            }}
            content={
              visible && (
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[getPasswordStatus()]}
                  {renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                  </div>
                </div>
              )
            }
            overlayStyle={{ width: 240 }}
            placement="right"
            visible={visible}
          >
            <FormItem
              name="password"
              className={
                form.getFieldValue('password')?.length > 0 &&
                styles.password
              }
              rules={[
                {
                  validator: checkPassword,
                },
              ]}
            >
              <Input
                size="large"
                prefix={<LockOutlined className={styles.prefixIcon} />}
                type="password"
                placeholder="至少6位密码，区分大小写"
              />
            </FormItem>
          </Popover>
          <FormItem
            name="confirm"
            rules={[
              {
                required: true,
                message: '确认密码',
              },
              {
                validator: checkConfirm,
              },
            ]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className={styles.prefixIcon} />}
              type="password"
              placeholder="确认密码"
            />
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              注册
            </Button>
            <Link className={styles.login} to="/login">
              <span>使用已有账户登录</span>
            </Link>
          </FormItem>
        </Form>
      </div>
    </UserLayout>
  );
};
