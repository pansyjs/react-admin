import React from 'react';
import styles from './index.scss';
import Item from './AvatarListItem';

export type size = 'large' | 'small' | 'default' | number;

export interface AvatarListProps {
  size: size;
}

class AvatarList extends React.Component<AvatarListProps, any> {
  static Item: typeof Item;
  static defaultProps = {
    size: 'default'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { size, children } = this.props;

    const childrenWithProps = React.Children.map(children, (child) => {
      // @ts-ignore
      return React.cloneElement(child, {
        size
      });
    });

    console.log(size);

    return <div className={styles.avatarList}>{childrenWithProps}</div>;
  }
}

export default AvatarList;
