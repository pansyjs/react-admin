import React from 'react';
import classNames from '@pansy/classnames';
import { Card, Statistic } from 'antd';
import { CardProps } from 'antd/es/card';
import { StatisticProps } from 'antd/es/statistic/Statistic';
import './chart-card.less';

export interface IChartCardProps extends CardProps {
  contentHeight?: number;
  footer?: React.ReactNode;
  statistic?: StatisticProps;
}

const ChartCard: React.FC<IChartCardProps> = (props) => {
  const prefixCls: string = 'lotus-chart-card';
  const { footer, contentHeight, statistic, loading, children, ...rest } = props;

  return (
    <Card
      bordered={false}
      loading={loading}
      className={prefixCls}
      bodyStyle={{
        padding: 0
      }}
      {...rest}
    >
      {/** 统计信息 */}
      {statistic && <Statistic {...statistic} title={null} />}
      {children && (
        <div className={`${prefixCls}__content`} style={{ height: contentHeight || 'auto' }}>
          <div
            className={classNames({
              [`${prefixCls}__content-fixed`]: true
            })}
          >
            {children}
          </div>
        </div>
      )}
      {footer && (
        <div
          className={classNames(`${prefixCls}__footer`, {
            [`is-margin`]: !children
          })}
        >
          {footer}
        </div>
      )}
    </Card>
  );
};

ChartCard.defaultProps = {
  loading: false,
  contentHeight: 46
};

export default ChartCard;
