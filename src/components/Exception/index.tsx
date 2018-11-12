import React from 'react';
import ClassNames from 'classnames';
import { Button } from 'antd';
import config from './typeConfig';
import styles from './index.less';

export interface ExceptionProps {
  className?: string;
  backText?: React.ReactNode;
  type?: '403' | '404' | '500';
  title?: React.ReactNode;
  desc?: React.ReactNode;
  img?: string;
  actions?: React.ReactNode;
  linkElement?: string | React.ReactNode;
  style?: React.CSSProperties;
}

class Exception extends React.Component<ExceptionProps, any> {
  static defaultProps = {
    className: '',
    backText: '返回首页',
    linkElement: 'a'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      className,
      backText,
      img,
      type,
      title,
      desc,
      actions,
      linkElement
    } = this.props;

    const pageType = type in config ? type : '404';

    const cls = ClassNames(styles.exception, className);
    return (
      <div className={cls}>
        <div className={styles.imgBlock}>
          <div
            className={styles.imgEle}
            style={{
              backgroundImage: `url(${img || config[pageType].img})`
            }}
          />
        </div>
        <div className={styles.content}>
          <h1>{title || config[pageType].title}</h1>
          <div className={styles.desc}>{desc || config[pageType].desc}</div>
          <div className={styles.actions}>
            {actions ||
              React.createElement(
                linkElement as any,
                {
                  to: '/',
                  href: '/'
                },
                <Button type="primary">{backText}</Button>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Exception;
