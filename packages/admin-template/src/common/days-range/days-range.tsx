/**
 * 日期范围选择组件，目前只支持 今日/七日/三十日
 */
import React, { FC, useState, useEffect, useCallback } from 'react';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import moment from 'moment';
import classNames from 'classnames';
import { formatMessage } from 'umi';
import { processQueryTimeRange } from './utils';
import './days-range.less';

export type DaysType = 'today' | 'sevenDays' | 'thirtyDays';

export interface TimeData {
  beginTime?: number;
  endTime?: number;
}

export interface DaysRangeData {
  type: DaysType;
  value: TimeData;
}

interface DaysRangeProps {
  className?: string;
  prefixCls?: string;
  // 是否朴素选择器
  plain?: boolean;
  defaultValue?: DaysType;
  onChange?: (data: DaysRangeData) => void;
}

const { Group, Button } = Radio;

const DaysRange: FC<DaysRangeProps> = (props) => {
  const { className, prefixCls, defaultValue, onChange, plain } = props;
  const [daysType, setDaysType] = useState<DaysType>(undefined);

  useEffect(() => {
    setValueCallback(defaultValue || 'today');
  }, [1]);

  const handleChange = (e: RadioChangeEvent) => {
    setValueCallback(e.target.value);
  };

  const setValueCallback = useCallback(
    (nextValue) => {
      // 计算时间间隔的时间戳值
      let beginTime = moment();

      if (nextValue === 'sevenDays') {
        beginTime = moment().subtract(6, 'days');
      }

      if (nextValue === 'thirtyDays') {
        beginTime = moment().subtract(29, 'days');
      }

      const result = processQueryTimeRange([beginTime, moment()]);

      onChange &&
        onChange({
          type: nextValue,
          value: {
            beginTime: result[0],
            endTime: result[1]
          }
        });

      setDaysType(nextValue);
    },
    [setDaysType]
  );

  return (
    <Group
      size="small"
      className={classNames(className, {
        [`${prefixCls}`]: true,
        ['is-plain']: plain
      })}
      value={daysType}
      defaultValue={defaultValue}
      buttonStyle="solid"
      onChange={handleChange}
    >
      <Button value="today">{formatMessage({ id: 'dashboard.today' })}</Button>
      <Button value="sevenDays">{formatMessage({ id: 'dashboard.sevenDay' })}</Button>
      <Button value="thirtyDays">{formatMessage({ id: 'dashboard.thirtyDay' })}</Button>
    </Group>
  );
};

DaysRange.defaultProps = {
  prefixCls: 'city-days-range',
  plain: true,
  defaultValue: 'today'
};

export default DaysRange;
