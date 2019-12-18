import React from 'react';
import moment from 'moment';
import classNames from '@pansy/classnames';
import { DatePicker, Radio } from 'antd';
import { RangePickerProps, RangePickerValue } from 'antd/es/date-picker/interface';
import './sales-extra.less';

export type TRangeType = 'today' | 'week' | 'month' | 'year';

export interface ISalesExtraProps {
  className?: string;
  style?: React.CSSProperties;
}

const { RangePicker } = DatePicker;

const SalesExtra: React.FC<ISalesExtraProps> = (props) => {
  const prefixCls: string = 'lotus-sales-card-extra';
  const { className, style } = props;
  const [times, setTimes] = React.useState<RangePickerValue>([moment(), moment()]);
  const [rangeType, setRangeType] = React.useState<TRangeType>('today');

  React.useEffect(() => {}, []);

  const handleChange = (e) => {
    const key = e.target.value;

    if (key === 'today') {
      setTimes([moment(), moment()]);
    }

    if (key === 'week') {
      setTimes([moment().startOf('week'), moment()]);
    }

    if (key === 'month') {
      setTimes([moment().startOf('month'), moment()]);
    }

    if (key === 'year') {
      setTimes([moment().startOf('year'), moment()]);
    }
  };

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      <Radio.Group defaultValue="today" onChange={handleChange}>
        <Radio.Button value="today">今日</Radio.Button>
        <Radio.Button value="week">本周</Radio.Button>
        <Radio.Button value="month">本月</Radio.Button>
        <Radio.Button value="year">本年</Radio.Button>
      </Radio.Group>
      <RangePicker value={times} onChange={handleChange} style={{ width: 256 }} />
    </div>
  );
};

export default SalesExtra;
