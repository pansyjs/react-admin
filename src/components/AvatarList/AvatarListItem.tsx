import React from 'react';
import ClassNames from 'classnames';
import { Avatar, Tooltip } from 'antd';
import { size } from './AvatarList';
import styles from './index.scss';

export interface AvatarListItemProps {
  size: size;
  tips: string | React.ReactNode;
  src: string;
  onClick?: () => void;
}

class AvatarListItem extends React.Component<AvatarListItemProps, any> {
  static defaultProps = {
    size: 'default'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { tips, size, src } = this.props;

    const clsString = ClassNames(styles.avatarItem, {
      [styles.avatarItemLarge]: size === 'large',
      [styles.avatarItemSmall]: size === 'small',
      [styles.avatarItemMini]: size === 'mini'
    });

    return (
      <div className={clsString}>
        {tips ? (
          <Tooltip title={tips}>
            <Avatar src={src} size={size} style={{ cursor: 'pointer' }} />
          </Tooltip>
        ) : (
          <Avatar src={src} size={size} />
        )}
      </div>
    );
  }
}

export default AvatarListItem;
