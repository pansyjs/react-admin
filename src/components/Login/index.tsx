import * as React from 'react';
import { Form, Tabs } from 'antd';

export interface LoginProps {
  className?: string;
  defaultActiveKey: string;
  onTabChange?: () => {},
  onSubmit?: () => {}
}

class Login extends React.Component<LoginProps, any> {
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

  handleSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { onSubmit } = this.props;
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>

        </Form>
      </div>
    )
  }
}
