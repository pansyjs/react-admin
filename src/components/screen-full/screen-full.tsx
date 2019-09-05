import React, { useState } from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import { FullScreen } from '@alitajs/antd-plus';
import './screen-full.less';

interface IProps {
  prefixCls?: string;
  className?: string;
}

const FullScreenIcon: React.FC<IProps> = props => {
  const { prefixCls, className } = props;
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const handleChange = status => {
    setIsFullScreen(status);
  };

  return (
    <FullScreen
      isBody={true}
      className={classNames(className, {
        [`${prefixCls}`]: true,
      })}
      onChange={handleChange}
    >
      {!isFullScreen && <Icon type="fullscreen" />}
      {isFullScreen && <Icon type="fullscreen-exit" />}
    </FullScreen>
  );
};

FullScreenIcon.defaultProps = {
  prefixCls: 'lotus-screen-full',
};

export default FullScreenIcon;
