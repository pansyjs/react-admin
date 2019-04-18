import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Drawer, Icon } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import './drawer-wrapper.less';

interface IProps extends DrawerProps {
  prefixCls?: string;
}

const DrawerWrapper: React.FC<IProps> = (props) => {
  const {
    className,
    prefixCls,
    title,
    children,
    width,
    height,
    placement,
    onClose,
    ...restProps
  } = props;
  // 是否全屏
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [drawerWidth, setDrawerWidth] = useState<string | number>(300);
  const [drawerHeight, setDrawerHeight] = useState<string | number>(300);

  useEffect(() => {
    setDrawerWidth(width);
  }, [props.width]);

  useEffect(() => {
    setDrawerHeight(height);
  }, [props.height]);

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (!isFullScreen) {
      if (placement === 'right' || placement === 'left') {
        setDrawerWidth('100%');
      } else {
        setDrawerHeight('100%');
      }
    } else {
      if (placement === 'right' || placement === 'left') {
        setDrawerWidth(props.width);
      } else {
        setDrawerHeight(props.height);
      }
    }
  };

  const handleClose = (e) => {
    onClose && onClose(e)
  };

  return (
    <Drawer
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`is-full-screen`]: isFullScreen
      })}
      {...restProps}
      height={drawerHeight}
      width={drawerWidth}
      closable={false}
    >
      <div className={`${prefixCls}__header`}>
        <div className={`${prefixCls}__title`}>
          {title}
        </div>
        <div className="buttons">
          <button onClick={handleFullScreen}>
            {!isFullScreen && (
              <Icon type="arrows-alt" />
            )}
            {isFullScreen && (
              <Icon type="shrink" />
            )}
          </button>
          <button onClick={handleClose}>
            <Icon type="close" />
          </button>
        </div>

      </div>
      <div className={`${prefixCls}__body`}>
        {children}
      </div>
    </Drawer>
  )
};

DrawerWrapper.defaultProps = {
  prefixCls: 'lotus-drawer-wrapper',
  placement: 'right',
  height: 300,
  width: 300
};

export default DrawerWrapper;
