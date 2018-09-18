import React from 'react';
import ClassNames from 'classnames';
import { Tooltip } from 'antd';
import EllipsisText, { TooltipOverlayStyle } from './EllipsisText';
import styles from './Ellipsis.scss';

// @ts-ignore
const isSupportLineClamp = document.body.style.webkitLineClamp !== undefined;

export interface EllipsisProps {
  tooltip?: boolean;
  length?: number;
  lines?: number;
  style?: React.CSSProperties;
  className?: string;
  fullWidthRecognition?: boolean;
}

class Ellipsis extends React.Component<EllipsisProps, any> {
  private root: any;
  private content: any;
  private node: any;
  private shadow: any;
  private shadowChildren: any;

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      targetCount: 0
    };
  }

  componentDidMount() {
    if (this.node) {
      this.computeLine();
    }
  }

  componentDidUpdate(nextProps) {
    const { lines } = this.props;
    if (lines !== nextProps.lines) {
      this.computeLine();
    }
  }

  computeLine = () => {
    const { lines } = this.props;
    if (lines && !isSupportLineClamp) {
      const text = this.shadowChildren.innerText;
      const lineHeight = parseInt(getComputedStyle(this.root).lineHeight, 10);
      const targetHeight = lines * lineHeight;
      this.content.style.height = `${targetHeight}px`;
      const totalHeight = this.shadowChildren.offsetHeight;
      const shadowNode = this.shadow.firstChild;

      if (totalHeight <= targetHeight) {
        this.setState({
          text,
          targetCount: text.length
        });
        return;
      }

      // bisection
      const len = text.length;
      const mid = Math.ceil(len / 2);

      const count = this.bisection(targetHeight, mid, 0, len, text, shadowNode);

      this.setState({
        text,
        targetCount: count
      });
    }
  };

  bisection = (th, m, b, e, text, shadowNode) => {
    const suffix = '...';
    let mid = m;
    let end = e;
    let begin = b;
    shadowNode.innerHTML = text.substring(0, mid) + suffix;
    let sh = shadowNode.offsetHeight;

    if (sh <= th) {
      shadowNode.innerHTML = text.substring(0, mid + 1) + suffix;
      sh = shadowNode.offsetHeight;
      if (sh > th || mid === begin) {
        return mid;
      }
      begin = mid;
      if (end - begin === 1) {
        mid = 1 + begin;
      } else {
        mid = Math.floor((end - begin) / 2) + begin;
      }
      return this.bisection(th, mid, begin, end, text, shadowNode);
    }
    if (mid - 1 < 0) {
      return mid;
    }
    shadowNode.innerHTML = text.substring(0, mid - 1) + suffix;
    sh = shadowNode.offsetHeight;
    if (sh <= th) {
      return mid - 1;
    }
    end = mid;
    mid = Math.floor((end - begin) / 2) + begin;
    return this.bisection(th, mid, begin, end, text, shadowNode);
  };

  handleRoot = (n) => {
    this.root = n;
  };

  handleContent = (n) => {
    this.content = n;
  };

  handleNode = (n) => {
    this.node = n;
  };

  handleShadow = (n) => {
    this.shadow = n;
  };

  handleShadowChildren = (n) => {
    this.shadowChildren = n;
  };

  render() {
    const {
      children,
      lines,
      length,
      className,
      tooltip,
      fullWidthRecognition,
      ...restProps
    } = this.props;
    const { text, targetCount } = this.state;

    const cls = ClassNames(styles.ellipsis, className, {
      [styles.lines]: lines && !isSupportLineClamp,
      [styles.lineClamp]: lines && isSupportLineClamp
    });

    if (!lines && !length) {
      return (
        <span className={cls} {...restProps}>
          {children}
        </span>
      );
    }

    // length
    if (!lines) {
      return (
        <EllipsisText
          className={cls}
          length={length}
          text={(children as any) || ''}
          tooltip={tooltip}
          fullWidthRecognition={fullWidthRecognition}
        />
      );
    }

    if (isSupportLineClamp) {
      return (
        <div
          className={cls}
          style={{
            WebkitLineClamp: lines,
            WebkitBoxOrient: 'vertical'
          }}
          {...restProps}
        >
          {tooltip ? (
            <Tooltip overlayStyle={TooltipOverlayStyle as any} title={children}>
              {children}
            </Tooltip>
          ) : (
            children
          )}
        </div>
      );
    }

    const childNode = (
      <span ref={this.handleNode}>
        {targetCount > 0 && text.substring(0, targetCount)}
        {targetCount > 0 && targetCount < text.length && '...'}
      </span>
    );

    return (
      <div ref={this.handleRoot} className={cls} {...restProps}>
        <div ref={this.handleContent}>
          {tooltip ? (
            <Tooltip overlayStyle={TooltipOverlayStyle as any} title={text}>
              {childNode}
            </Tooltip>
          ) : (
            childNode
          )}
          <div className={styles.shadow} ref={this.handleShadowChildren}>
            {children}
          </div>
          <div className={styles.shadow} ref={this.handleShadow}>
            <span>{text}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Ellipsis;
