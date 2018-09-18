import React from 'react';
import { Tooltip } from 'antd';
import { getStrFullLength, cutStrByFullLength } from './utils';

export interface EllipsisTextProps {
  tooltip?: boolean;
  text: string;
  length?: number;
  fullWidthRecognition?: boolean;
}

export const TooltipOverlayStyle = {
  overflowWrap: 'break-word',
  wordWrap: 'break-word'
};

const tail = '...';

class EllipsisText extends React.Component<EllipsisTextProps, any> {
  static defaultProps = {
    className: ''
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      text,
      tooltip,
      length,
      fullWidthRecognition,
      ...restProps
    } = this.props;

    const textLength = fullWidthRecognition
      ? getStrFullLength(text)
      : text.length;
    if (textLength <= length || length < 0) {
      return <span {...restProps}>{text}</span>;
    }
    let displayText;
    if (length - tail.length <= 0) {
      displayText = '';
    } else {
      displayText = fullWidthRecognition
        ? cutStrByFullLength(text, length)
        : text.slice(0, length);
    }
    if (tooltip) {
      return (
        <Tooltip overlayStyle={TooltipOverlayStyle as any} title={text}>
          <span>
            {displayText}
            {tail}
          </span>
        </Tooltip>
      );
    }

    return (
      <span {...restProps}>
        {displayText}
        {tail}
      </span>
    );
  }
}

export default EllipsisText;
