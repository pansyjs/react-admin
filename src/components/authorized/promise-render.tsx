import React from 'react';
import { Spin } from 'antd';
import { isComponent } from './secured';

export type AnyComponent = React.ComponentClass | React.FunctionComponent;

export interface IPromiseRenderProps {
  error?: AnyComponent | React.ReactNode;
  ok?: AnyComponent | React.ReactNode;
  promise: Promise<any>;
}

const PromiseRender: React.FC<IPromiseRenderProps> = (props) => {
  const { ok, error, promise, ...rest } = props;
  const [component, setComponent] = React.useState<AnyComponent>(null);

  React.useEffect(() => {
    setRenderComponent()
  }, []);

  const setRenderComponent = () => {
    const okComponent = checkIsInstantiation(ok);
    const errorComponent = checkIsInstantiation(error);
    promise
      .then(() => {
        setComponent(okComponent);
      })
      .catch(() => {
        setComponent(errorComponent);
      });

  };

  const checkIsInstantiation = (target: AnyComponent | React.ReactNode): AnyComponent => {
    if (isComponent(target)) {
      const Target: React.ComponentClass = target as any;
      return (props: any) => <Target {...props} />;
    }
    if (React.isValidElement(target)) {
      return (props => React.cloneElement(target, props)) as React.FC;
    }
    return (() => target) as React.FC;
  };

  if (component) {
    const Component = component;
    return (
      <Component {...rest} />
    )
  } else {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    )
  }
};

export default PromiseRender;
