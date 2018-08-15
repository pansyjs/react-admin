import React from 'react';
import ClassNames from 'classnames';
import { Form, Tabs } from 'antd';
import LoginContext from './LoginContext';
import styles from 'index.scss';

export interface LoginProps {
  className?: string;
  defaultActiveKey: string;
  onTabChange?: () => {},
  onSubmit?: () => {},
  from: any
}

export interface LoginStates {
  type: string;
  tabs: any[];
  active: object;
}

class Login extends React.Component<LoginProps, LoginStates> {
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
    className: '',
  };

  getContext() {
    const { tabs } = this.state;
    const { from } = this.props;
    return {
      tabUtil: {
        addTab: id => {
          this.setState({
            tabs: [...tabs, id]
          })
        },
        removeTab: id => {
          this.setState({
            tabs: tabs.filter(currentId => currentId !== id)
          })
        }
      },
      from,
      updateActive: activeItem => {
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
    }
  }

  handleSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { onSubmit } = this.props;
  };

  render() {
    const { className, children } = this.props;
    const { type, tabs } = this.state;
    const TabChildren = [];
    const OtherChildren = [];
    React.Children.forEach(children, item => {
      if (!item) {
        return;
      }
      // if (item.type.typeName === 'LoginTab') {
      //   TabChildren.push(item);
      // } else {
      //   OtherChildren.push(item);
      // }
    });
    return (
      <div>
        <LoginContext.Provider value={this.getContext()}>
          <div>123</div>
        </LoginContext.Provider>
      </div>
    )
  }
}

export default Login;
