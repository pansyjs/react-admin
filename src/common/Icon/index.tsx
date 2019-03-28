import React from 'react';
import ClassNames from 'classnames';
import './index.less';

export interface IconProps {
  className?: string;
  type?: string;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  style?: React.CSSProperties;
}

class Icon extends React.Component<IconProps, any> {
  handleClick = (event) => {
    const { onClick } = this.props;

    onClick && onClick(event);
  };

  render() {
    const { className, type, style } = this.props;
    const cls = ClassNames('lotus-icon', className);

    return (
      <i className={cls} style={style} onClick={this.handleClick}>
        <svg aria-hidden="true">
          <use xlinkHref={`#${type}`} />
        </svg>
      </i>
    );
  }
}

export default Icon;
