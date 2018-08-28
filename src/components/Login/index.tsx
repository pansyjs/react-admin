import React from 'react';
import { Form, Tabs } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import ClassNames from 'classnames';
import LoginSubmit from './LoginSubmit';
import LoginTab from './LoginTab';
import LoginContext from './LoginContext';
import styles from './index.scss';

const Provider = LoginContext.Provider;

export interface LoginProps {
  className?: string;
  defaultActiveKey: string;
  onTabChange: (key: string) => void;
  onSubmit: React.FormEventHandler<any>;
  form: WrappedFormUtils;
}

class Login extends React.Component<LoginProps, any> {
  static defaultProps = {
    className: '',
    defaultActiveKey: '',
    onTabChange: () => {},
    onSubmit: () => {}
  };
  static Submit: LoginSubmit;
  static Tab: LoginTab;

  constructor(props) {
    super(props);
    this.state = {
      type: props.defaultActiveKey,
      tabs: [],
      active: {}
    };
  }

  getContext = () => {
    const { tabs } = this.state;
    const { form } = this.props;
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
      form,
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
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { className, children } = this.props;
    const { type, tabs } = this.state;
    const TabChildren = [];
    const OtherChildren = [];
    const clsString = ClassNames(className, styles.login);
    return (
      <Provider value={this.getContext}>
        <div className={clsString}>
          <Form onSubmit={this.handleSubmit}>
            {tabs && tabs.length ? (
              <React.Fragment>
                <Tabs animated={false}>{TabChildren}</Tabs>
                {OtherChildren}
              </React.Fragment>
            ) : (
              [...children]
            )}
          </Form>
        </div>
      </Provider>
    );
  }
}

export default Form.create()(Login);
