import React from 'react';
import { Form, Tabs, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import ClassNames from 'classnames';
import LoginContext from './LoginContext';
import LoginTab from './LoginTab';
import styles from 'index.scss';

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

class Login extends React.Component<LoginProps, LoginStates> {
  static Tab: typeof LoginTab;
  static Submit: typeof Button;

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
    const { from } = this.props;
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
      from,
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

  isLoginTab = (node) => {
    return (
      node &&
      node.type &&
      (node.type.typeName === 'LoginTab' ||
        node.type.displayName === 'LoginTab')
    );
  };

  onSwitch = (type) => {
    this.setState({
      type
    });
    const { onTabChange } = this.props;
    onTabChange(type);
  };

  render() {
    const { className, children } = this.props;
    const { type, tabs } = this.state;
    const cls = ClassNames(className, styles.login);
    const tabChildren = [];
    const otherChildren = [];
    React.Children.forEach(
      children as React.ReactNode,
      (child: React.ReactElement<any>) => {
        if (!child) {
          return;
        }
        if (this.isLoginTab(child)) {
          tabChildren.push(child);
        } else {
          otherChildren.push(child);
        }
      }
    );

    return (
      <div>
        <LoginContext.Provider value={this.getContext()}>
          <div className={cls}>
            <Form onSubmit={this.handleSubmit}>
              {tabs.length ? (
                <React.Fragment>
                  <Tabs
                    animated={false}
                    className={styles.tabs}
                    activeKey={type}
                    onChange={this.onSwitch}
                  >
                    {tabChildren}
                  </Tabs>
                  {otherChildren}
                </React.Fragment>
              ) : (
                { children }
              )}
            </Form>
          </div>
        </LoginContext.Provider>
      </div>
    );
  }
}

export default Form.create()(Login);
