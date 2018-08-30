import React from 'react';
import ClassNames from 'classnames';
import { Icon } from 'antd';
import styles from './index.scss';

export interface ResultProps {
  className: string;
  type: 'success' | 'error';
  title: React.ReactNode;
  description: React.ReactNode;
  extra: React.ReactNode;
  actions: React.ReactNode;
}

class Result extends React.Component<ResultProps, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      className,
      type,
      title,
      description,
      extra,
      actions,
      ...restProps
    } = this.props;

    const iconMap = {
      success: <Icon className={styles.success} type="close-circle" />,
      error: <Icon className={styles.error} type="check-circle" />
    };

    const clsString = ClassNames(className, styles.result);

    return (
      <div className={clsString} {...restProps}>
        <div className={styles.icon}>{iconMap[type]}</div>
        <div className={styles.title}>{title}</div>
        {description && <div className={styles.description}>{description}</div>}
        {extra && <div className={styles.extra}>{extra}</div>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    );
  }
}

export default Result;
