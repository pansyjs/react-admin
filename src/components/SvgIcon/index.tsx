import React from 'react';
import ClassNames from 'classnames';
import styles from './index.scss';

interface SvgIconProps {
  className?: string;
  icon: string;
}

class SvgIcon extends React.Component<SvgIconProps, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, icon } = this.props;
    const clsString = ClassNames(className, styles.main);
    return (
      <svg className={clsString}>
        <use xlinkHref={`#${icon}`} />
      </svg>
    )
  }
}

export default SvgIcon;
