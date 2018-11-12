import React from 'react';
import styles from './index.less';
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

    const childrenWithProps = [];

    React.Children.map(
      children as React.ReactNode,
      (child: React.ReactElement<any>, index) => {
        childrenWithProps.push(
          React.cloneElement(child, {
            size,
            key: child.key || index
          })
        );
      }
    );

    return <div className={styles.avatarList}>{childrenWithProps}</div>;
  }
}

export default AvatarList;
