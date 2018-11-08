import React from 'react';
import TextMask, { MaskedInputProps } from 'react-text-mask';

export interface IMaskedInputProps extends MaskedInputProps {
  className?: string;
  value?: number | string;
}

class MaskedInput extends React.Component<IMaskedInputProps, any> {
  static defaultProps = {
    className: '',
    guide: true,
    placeholderChar: '_',
    keepCharPositions: false
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ''
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return nextProps.value || '';
    }
    return '';
  }

  render() {
    const { className, ...restProps } = this.props;
    return (
      <span className={className}>
        <TextMask className="ant-input" {...restProps} />
      </span>
    );
  }
}

export default MaskedInput;
