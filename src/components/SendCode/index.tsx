import React from 'react';
import { Button } from 'antd';
import { BaseButtonProps } from 'antd/es/button/button';
import { isPromise } from '@/utils/base';

export interface SendCodeProps extends BaseButtonProps {
  second?: number;
  initText?: string;
  runText?: string;
  resetText?: string;
  visible?: boolean;
  onEnd?: () => void;
  onStart?: () => void;
  onGetCaptcha?: () => boolean | Promise<boolean>;
}

interface DefaultProps {
  readonly second: number;
  readonly initText: string;
  readonly runText: string;
  readonly resetText: string;
}

interface State {
  buttonText: string;
  runSecond: number;
  lastSecond: number;
  start: boolean;
}

// 发送验证码倒计时组件
class SendCode extends React.Component<SendCodeProps, State> {
  private timer: NodeJS.Timer;
  static defaultProps: DefaultProps = {
    second: 60,
    initText: '获取短信验证码',
    runText: '{%s}秒后重新获取',
    resetText: '重新获取验证码'
  };

  readonly state: State = {
    buttonText: this.props.initText,
    runSecond: this.props.second,
    lastSecond: 0,
    start: false
  };

  componentDidMount() {}

  componentWillUnmount() {
    this.timeout();
  }

  // 按钮点击回调
  handleClick = (e) => {
    e.preventDefault();
    const { onGetCaptcha } = this.props;
    const result = onGetCaptcha ? onGetCaptcha() : null;

    if (!result === false) return;

    if (isPromise(result)) {
      result.then(this.start);
    } else {
      this.start();
    }
  };

  // 开始倒计时函数
  start() {
    this.setState({
      start: true
    });
    this.timer = setInterval(() => {
      const { lastSecond, runSecond } = this.state;
      let second = lastSecond ? lastSecond : runSecond;

      this.setState({
        buttonText: this.getButtonText(second),
        runSecond: runSecond - 1
      });
      second <= 0 && this.timeout();
    }, 1000);
  }

  // 倒计时结束处理函数
  timeout() {
    const { resetText, onEnd } = this.props;
    this.setState({
      buttonText: resetText,
      start: false
    });
    onEnd && onEnd();
    // 清除定时器
    clearInterval(this.timer);
  }

  /**
   * 获取按钮文本
   * @param second 当前的倒计时秒数
   */
  getButtonText = (second: number): string => {
    const { runText } = this.props;
    return runText.replace(/\{([^{]*?)%s(.*?)\}/g, second.toString());
  };

  render() {
    const {
      second,
      initText,
      resetText,
      runText,
      onStart,
      onEnd,
      ...rest
    } = this.props;
    const { buttonText, start } = this.state;

    return (
      <Button onClick={this.handleClick} {...rest} disabled={start}>
        {buttonText}
      </Button>
    );
  }
}

export default SendCode;
