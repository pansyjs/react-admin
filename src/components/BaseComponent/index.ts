import React from 'react';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { Dispatch } from 'redux';

export interface BaseComponentProps {
  dispatch: Dispatch<any>;
  form: WrappedFormUtils;
}

class BaseComponent<P = {}, S = {}> extends React.Component<
  P & BaseComponentProps,
  S
> {}

export default BaseComponent;
