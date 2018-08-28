import React from 'react';
import { NativeButtonProps } from 'antd/lib/button/button';
import { Button } from 'antd';

interface SendCodeProps {
  className?: string;
  initStr?: string;
  second?: number;
  runStr?: string;
  resetStr?: string;
  storageKey?: string;
  start: number;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  buttonProps?: NativeButtonProps;
}

class SendCode extends React.Component<SendCodeProps, any> {
  private timer: NodeJS.Timer;

  static defaultProps = {
    className: '',
    initStr: '获取短信验证码',
    second: 60,
    runStr: '{%s}秒后重新获取',
    resetStr: '重新获取验证码',
    storageKey: ''
  };

  constructor(props: SendCodeProps) {
    super(props);
    this.state = {
      status: 'end',
      count: 0,
      tmpStr: props.initStr
    };
  }

  componentWillReceiveProps(nextProps) {
    const { second } = this.props;
    this.setState({
      start: nextProps.start
    });
    if (nextProps.start) {
      this.run(second);
    }
  }

  handleClick: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > = (e) => {
    const { onClick } = this.props;
    if (onClick) {
      (onClick as React.MouseEventHandler<
        HTMLButtonElement | HTMLAnchorElement
      >)(e);
    }
  };

  run(second) {
    const {} = this.props;
    this.timer = setInterval(() => {
      second--;
      this.setState({
        count: second,
        tmpStr: this.getStr(second)
      });
      second <= 0 && this.timeout();
    }, 1000);
  }

  timeout() {
    const { resetStr } = this.props;
    this.setState({
      count: 0,
      tmpStr: resetStr
    });
    clearInterval(this.timer);
  }

  getStr(second) {
    const { runStr } = this.props;
    return runStr.replace(/\{([^{]*?)%s(.*?)\}/g, second);
  }

  render() {
    const { buttonProps } = this.props;
    const { status, count, tmpStr } = this.state;
    return (
      <Button
        onClick={this.handleClick}
        disabled={count !== 0}
        {...buttonProps}
      >
        {tmpStr}
      </Button>
    );
  }
}

export default SendCode;
