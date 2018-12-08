import React from 'react';
import ClassNames from 'classnames';
import styles from './index.less';

export interface TopNavHeaderProps {
  theme: string;
  contentWidth: string;
}

interface State {
  readonly maxWidth: number;
}

class TopNavHeader extends React.PureComponent<TopNavHeaderProps, State> {
  readonly state: State = {
    maxWidth: 1200
  };

  render() {
    const { theme, contentWidth } = this.props;
    const { maxWidth } = this.state;

    return (
      <div
        className={ClassNames(styles.head, {
          [styles.light]: theme === 'light'
        })}
      >
        <div
          className={ClassNames(styles.main, {
            [styles.wide]: contentWidth === 'Fixed'
          })}
        >
          <div className={styles.left} />
        </div>
      </div>
    );
  }
}

export default TopNavHeader;
