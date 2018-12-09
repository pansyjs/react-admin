import React from 'react';
import ClassNames from 'classnames';
import styles from './index.less';

export interface FooterToolbarProps {
  className: string;
  extra: React.ReactNode;
  style?: React.CSSProperties;
}

class FooterToolbar extends React.Component<FooterToolbarProps, any> {
  static defaultProps = {
    className: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      width: undefined
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar);
    this.resizeFooterToolbar();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  resizeFooterToolbar = () => {
    const slider = document.querySelector('.ant-layout-sider');
    if (slider == null) {
      return;
    }
    const width = slider.clientWidth;
    const { width: stateWidth } = this.state;
    if (stateWidth !== width) {
      this.setState({
        width
      });
    }
  };

  render() {
    const { className, children, extra, ...restProps } = this.props;
    const { width } = this.state;
    const cls = ClassNames(className, styles.toolbar);

    return (
      <div className={cls} style={{ width }} {...restProps}>
        <div className={styles.left}>{extra}</div>
        <div className={styles.right}>{children}</div>
      </div>
    );
  }
}

export default FooterToolbar;
