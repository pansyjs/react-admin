import React from 'react';
import Card from '@ant-design/pro-card';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import { Tooltip, Statistic } from 'antd';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import Trend from '../trend';
import styles from './index.less';

interface IntroduceRowProps {
  data?: { time: string; value: number }[];
  loading?: boolean;
}

const IntroduceRow: React.FC<IntroduceRowProps> = ({
  loading,
  data = []
}) => {
  return (
    <Card gutter={16} ghost>
      <Card
        title="总销售额"
        extra={
          <Tooltip
            title="指标说明"
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        colSpan={6}
        loading={loading}
      >
        <div className={styles.content}>
          <Statistic value={126560} prefix="¥" />
          <div className={styles.contentFixed}>
            <Trend flag="up" style={{ marginRight: 16 }}>
              周同比
              <span className={styles.trendText}>12%</span>
            </Trend>
            <Trend flag="down">
              日同比
              <span className={styles.trendText}>11%</span>
            </Trend>
          </div>
        </div>
      </Card>
      <Card
        title="访问量"
        extra={
          <Tooltip
            title="指标说明"
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        colSpan={6}
        loading={loading}
      >
        <div className={styles.content}>
          <Statistic value={8846} />
          <div className={styles.contentFixed}>
            <TinyArea
              color="#975FE4"
              xField="date"
              height={46}
              forceFit
              yField="value"
              smooth
              data={data}
            />
          </div>
        </div>
      </Card>
      <Card
        title="支付笔数"
        extra={
          <Tooltip
            title="指标说明"
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        colSpan={6}
        loading={loading}
      >
        <div className={styles.content}>
          <Statistic value={6560} />
          <div className={styles.contentFixed}>
            <TinyColumn
              xField="date"
              height={46}
              forceFit
              yField="value"
              data={data}
            />
          </div>
        </div>
      </Card>
      <Card
        title="运营活动效果"
        extra={
          <Tooltip
            title="指标说明"
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        colSpan={6}
        loading={loading}
      >
        <div className={styles.content}>
          <Statistic value={78} suffix="%" />
          <div className={styles.contentFixed}>
            <Progress
              height={46}
              percent={0.78}
              color="#13C2C2"
              forceFit
              size={8}
              marker={[
                {
                  value: 0.8,
                  style: {
                    stroke: '#13C2C2',
                  },
                }
              ]}
            />
          </div>
        </div>
      </Card>
    </Card>
  )
}

export default IntroduceRow;
