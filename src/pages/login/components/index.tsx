import React, {
  FC,
  ReactElement,
  CSSProperties,
  FunctionComponent,
  ReactComponentElement,
  Children,
  useState
} from 'react';
import useMergeValue from 'use-merge-value';
import classNames from 'classnames';
import { Tabs, Form } from 'antd';
import { FormInstance } from 'antd/es/form';
import { LoginParamsType } from '@/common/types/login';
import LoginContext from './context';
import LoginItem, { LoginItemProps } from './item';
import LoginSubmit from './submit';
import LoginTab from './tab';
import styles from './index.less';

export interface LoginProps {
  className?: string;
  style?: CSSProperties;
  activeKey?: string;
  onTabChange?: (key: string) => void;
  onSubmit?: (values: LoginParamsType) => void;
  form?: FormInstance;
  children: ReactElement<typeof LoginTab>[];
}

interface LoginType extends FC<LoginProps> {
  Tab: typeof LoginTab;
  Submit: typeof LoginSubmit;
  Username: FunctionComponent<LoginItemProps>;
  Password: FunctionComponent<LoginItemProps>;
  Mobile: FunctionComponent<LoginItemProps>;
  Captcha: FunctionComponent<LoginItemProps>;
}

const Login: LoginType = (props) => {
  const { className } = props;
  const [tabs, setTabs] = useState<string[]>([]);
  const [active, setActive] = useState({});
  const [type, setType] = useMergeValue('', {
    value: props.activeKey,
    onChange: props.onTabChange,
  });
  const TabChildren: ReactComponentElement<typeof LoginTab>[] = [];
  const otherChildren: ReactElement<unknown>[] = [];
  Children.forEach(
    props.children,
    (child: ReactComponentElement<typeof LoginTab> | ReactElement<unknown>) => {
      if (!child) {
        return;
      }
      if ((child.type as { typeName: string }).typeName === 'LoginTab') {
        TabChildren.push(child as ReactComponentElement<typeof LoginTab>);
      } else {
        otherChildren.push(child);
      }
    },
  );
  return (
    <LoginContext.Provider
      value={{
        tabUtil: {
          addTab: (id) => {
            setTabs([...tabs, id]);
          },
          removeTab: (id) => {
            setTabs(tabs.filter((currentId) => currentId !== id));
          },
        },
        updateActive: (activeItem) => {
          if (!active) return;
          if (active[type]) {
            active[type].push(activeItem);
          } else {
            active[type] = [activeItem];
          }
          setActive(active);
        },
      }}
    >
      <div className={classNames(className, styles.login)}>
        <Form
          form={props.form}
          onFinish={(values) => {
            if (props.onSubmit) {
              props.onSubmit(values as LoginParamsType);
            }
          }}
        >
          {tabs.length ? (
            <>
              <Tabs
                destroyInactiveTabPane
                animated={false}
                className={styles.tabs}
                activeKey={type}
                onChange={(activeKey) => {
                  setType(activeKey);
                }}
              >
                {TabChildren}
              </Tabs>
              {otherChildren}
            </>
          ) : (
            props.children
          )}
        </Form>
      </div>
    </LoginContext.Provider>
  );
};

Login.Tab = LoginTab;
Login.Submit = LoginSubmit;

Login.Username = LoginItem.Username;
Login.Password = LoginItem.Password;
Login.Mobile = LoginItem.Mobile;
Login.Captcha = LoginItem.Captcha;

export default Login;
