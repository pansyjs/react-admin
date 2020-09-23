import React from 'react';
import numeral from 'numeral';
import Card from '@ant-design/pro-card';
import { Donut } from '@ant-design/charts';
import { Radio, Typography } from 'antd';
import { DonutConfig } from '@ant-design/charts/es/donut'
import { RadioChangeEvent } from 'antd/es/radio';

export type SalesType = 'all' | 'online' | 'stores';

interface ProportionSalesProps {
  salesType?: SalesType;
  onChangeSalesType?: (value: SalesType) => void;
}

const { Text } = Typography;
const salesTypeData = [
  { x: '家用电器', y: 4544 },
  { x: '食用酒水', y: 3321 },
  { x: '个护健康', y: 3113 },
  { x: '服饰箱包', y: 2341 },
  { x: '母婴产品', y: 1231 },
  { x: '其他', y: 1231 },
];

const ProportionSales: React.FC<ProportionSalesProps> = ({
  salesType,
  onChangeSalesType
}) => {
  const handleChangeSalesType = (e: RadioChangeEvent) => {
    onChangeSalesType?.(e.target.value);
  }

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
      <Donut
        forceFit
        height={382}
        radius={0.8}
        angleField="y"
        colorField="x"
        data={salesTypeData}
        legend={{
          visible: false
        }}
        label={{
          visible: true,
          type: 'spider',
          formatter: (text, item) => {
            // eslint-disable-next-line no-underscore-dangle
            return `${item._origin.x}: ${numeral(item._origin.y).format('0,0')}`;
          }
        }}
        statistic={{
          totalLabel: '销售额'
        } as DonutConfig['statistic']}
      />
    </Card>
  )
}

export default ProportionSales;
