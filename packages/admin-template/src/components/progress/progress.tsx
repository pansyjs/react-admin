import React from 'react';
import classNames from '@pansy/classnames';
import { Tooltip } from 'antd';
import './progress.less';

export interface IProgressProps {
  className?: string;
  style?: React.CSSProperties;
  target: number;
  targetLabel?: string;
  color?: string;
  strokeWidth?: number;
  percent?: number;
}

const Progress: React.FC<IProgressProps> = (props) => {
  const prefixCls: string = 'lotus-progress';
  const { targetLabel, target, color, strokeWidth, percent, className, style } = props;

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      <Tooltip title={targetLabel}>
        <div className={`${prefixCls}__target`} style={{ left: target ? `${target}%` : undefined }}>
          <span style={{ backgroundColor: color || undefined }} />
          <span style={{ backgroundColor: color || undefined }} />
        </div>
      </Tooltip>
      <div className={`${prefixCls}__content`}>
        <div
          className={`${prefixCls}__progress`}
          style={{
            backgroundColor: color || undefined,
            width: percent ? `${percent}%` : undefined,
            height: strokeWidth || undefined
          }}
        />
      </div>
    </div>
  );
};

Progress.defaultProps = {
  color: 'rgb(19, 194, 194)'
};

export default Progress;
