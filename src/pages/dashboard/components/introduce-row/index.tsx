import React from 'react';
import Card from '@ant-design/pro-card';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import { Tooltip, Statistic } from 'antd';
import { TinyArea, TinyColumn, Progress } from '@pansy/react-charts';
import Trend from '../trend';
import styles from './index.less';

interface IntroduceRowProps {
  loading?: boolean;
}

const IntroduceRow: React.FC<IntroduceRowProps> = ({
  loading
}) => {
  const progressConfig = {
    height: 46,
    percent: 0.7,
    barWidthRatio: 0.2,
  };

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
              height={46}
              autoFit
              smooth
              data={new Array(100).fill(0).map(() => Math.random() * 20)}
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
              height={46}
              data={new Array(20).fill(0).map(() => Math.random() * 100)}
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
            <Progress {...progressConfig} />
          </div>
        </div>
      </Card>
    </Card>
  )
}

export default IntroduceRow;
