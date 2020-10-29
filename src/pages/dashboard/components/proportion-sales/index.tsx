import React from 'react';
import Card from '@ant-design/pro-card';
import { Pie } from '@pansy/react-charts';
import { Radio, Typography } from 'antd';
import { PieConfig } from '@pansy/react-charts/es/pie'
import { RadioChangeEvent } from 'antd/es/radio';

export type SalesType = 'all' | 'online' | 'stores';

interface ProportionSalesProps {
  salesType?: SalesType;
  onChangeSalesType?: (value: SalesType) => void;
}

const { Text } = Typography;
const salesTypeData = [
  { type: '家用电器', value: 4544 },
  { type: '食用酒水', value: 3321 },
  { type: '个护健康', value: 3113 },
  { type: '服饰箱包', value: 2341 },
  { type: '母婴产品', value: 1231 },
  { type: '其他', value: 1231 },
];

const ProportionSales: React.FC<ProportionSalesProps> = ({
  salesType,
  onChangeSalesType
}) => {
  const handleChangeSalesType = (e: RadioChangeEvent) => {
    onChangeSalesType?.(e.target.value);
  }

  const config: PieConfig = {
    appendPadding: 10,
    data: salesTypeData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.6,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    height: 382,
    interactions: [{ type: 'pie-legend-active' }],
  };

  return (
    <Card
      title="销售额类别占比"
      headerBordered
      extra={
        <Radio.Group size="small" value={salesType} onChange={handleChangeSalesType}>
          <Radio.Button value="all">
            全部
          </Radio.Button>
          <Radio.Button value="online">
            线上
          </Radio.Button>
          <Radio.Button value="stores">
            门店
          </Radio.Button>
        </Radio.Group>
      }
    >
      <Text>销售额</Text>
      <Pie {...config} />
    </Card>
  )
}

export default ProportionSales;
