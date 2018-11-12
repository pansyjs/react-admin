import React from 'react';
import { Spin } from 'antd';

export interface IPromiseRenderProps {
  ok: React.ReactNode;
  error: React.ReactNode;
  promise: Promise<any>;
}

interface State {
  readonly component: React.ReactNode;
}

class PromiseRender extends React.PureComponent<IPromiseRenderProps, State> {
  readonly state: State = {
    component: null
  };

  componentDidMount() {
    this.setRenderComponent(this.props);
  }

  componentDidUpdate(nextProps) {
    // new Props enter
    this.setRenderComponent(nextProps);
  }

  setRenderComponent = (props: IPromiseRenderProps) => {
    const ok = this.checkIsInstantiation(props.ok);
    const error = this.checkIsInstantiation(props.error);

    props.promise
      .then(() => {
        this.setState({
          component: ok
        });
      })
      .catch(() => {
        this.setState({
          component: error
        });
      });
  };

  checkIsInstantiation = (target) => {
    if (React.isValidElement(target)) {
      return target;
    }
    return () => target;
  };

  render() {
    const { component: Component } = this.state;
    const { ok, error, promise, ...rest } = this.props;

    // @ts-ignore
    return Component ? (
      <Component {...rest} />
    ) : (
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center'
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
}

export default PromiseRender;
