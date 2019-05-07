import React from 'react';
import classNames from 'classnames';
import './static-info.less';

interface IItemData {
  label: string;
  value: string;
}

interface IProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  list: IItemData[];
  labelWidth?: number;
}

const StaticInfo: React.FC<IProps> = (props) => {
  const { prefixCls, className, style, list, labelWidth } = props;

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      {list && list.map((item, index) => (
        <div key={index} className={`${prefixCls}__item`}>
          <div
            className={`${prefixCls}__label`}
            style={{
              width: `${labelWidth}px`
            }}
          >
            <span>{item.label}</span>
          </div>
          <div className={`${prefixCls}__text`}>
            <span>{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
};

StaticInfo.defaultProps = {
  prefixCls: 'city-static-info',
  labelWidth: 80,
  list: []
};

export default StaticInfo;
