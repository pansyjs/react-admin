import React from 'react';
import { Form, Tabs } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import ClassNames from 'classnames';
import LoginTab from './LoginTab';
import LoginSubmit from './LoginSubmit';
import styles from './index.less';

export interface LoginProps extends FormComponentProps {
  className?: string;
  defaultActiveKey?: string;
  onTabChange?: (key: string) => void;
  onSubmit?: (error: any, values: any) => void;
}

export interface LoginStates {
  type: string;
  tabs: any[];
  active: object;
}

export interface LoginStore {
  tabUtil: {
    addTab: (id: string) => void;
    removeTab: (id: string) => void;
  };
  updateActive: (activeItem: string) => void;
}

const Context = React.createContext({} as LoginStore);

class Login extends React.Component<LoginProps, LoginStates> {
  static Tab: typeof LoginTab;
  static Submit: typeof LoginSubmit;

  constructor(props: LoginProps) {
    super(props);
    this.state = {
      type: props.defaultActiveKey,
      tabs: [],
      active: {}
    };
  }

  // 设置默认的props
  static defaultProps: Partial<LoginProps> = {
    className: ''
  };

  getContext() {
    const { tabs } = this.state;
    return {
      tabUtil: {
        addTab: (id) => {
          this.setState({
            tabs: [...tabs, id]
          });
        },
        removeTab: (id) => {
          this.setState({
            tabs: tabs.filter((currentId) => currentId !== id)
          });
        }
      },
      updateActive: (activeItem) => {
        const { type, active } = this.state;
        if (active[type]) {
          active[type].push(activeItem);
        } else {
          active[type] = [activeItem];
        }
        this.setState({
          active
        });
      }
    };
  }

  handleSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { onSubmit } = this.props;
  };

  onSwitch = (type) => {
    this.setState({
      type
    });
    const { onTabChange } = this.props;
    onTabChange && onTabChange(type);
  };

  render() {
    const { className, children } = this.props;
    const { type, tabs } = this.state;
    const TabChildren = [];
    const otherChildren = [];

    React.Children.forEach(
      children as React.ReactNode,
      (child: React.ReactElement<any>) => {
        if (!child) {
          return;
        }
        if (child.type['typeName'] === 'LoginTab') {
          TabChildren.push(child);
        } else {
          otherChildren.push(child);
        }
      }
    );

    return (
      <div>
        <Context.Provider value={this.getContext()}>
          <div className={ClassNames(className, styles.login)}>
            <Form onSubmit={this.handleSubmit}>
              {tabs.length ? (
                <React.Fragment>
                  <Tabs
                    animated={false}
                    className={styles.tabs}
                    activeKey={type}
                    onChange={this.onSwitch}
                  >
                    {TabChildren}
                  </Tabs>
                  {otherChildren}
                </React.Fragment>
              ) : (
                [...(children as React.ReactNode[])]
              )}
            </Form>
          </div>
        </Context.Provider>
      </div>
    );
  }
}

Login.Tab = LoginTab;
Login.Submit = LoginSubmit;

export const Consumer = Context.Consumer;

export default Login;
