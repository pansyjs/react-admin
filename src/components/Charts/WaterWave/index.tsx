import React from 'react';
import { Chart, Tooltip, Geom, Guide } from 'bizcharts';
import styles from './index.scss';

export interface WaterWaveProps {
  title?: React.ReactNode | string;
  height?: number;
  color?: string;
  percent?: number;
}

const data = [
  {
    gender: 'male',
    path:
      'M381.759 0h292l-.64 295.328-100.127-100.096-94.368 94.368C499.808 326.848 512 369.824 512 415.712c0 141.376-114.56 256-256 256-141.376 0-256-114.624-256-256s114.624-256 256-256c48.8 0 94.272 13.92 133.12 37.632l93.376-94.592L381.76 0zM128.032 415.744c0 70.688 57.312 128 128 128s128-57.312 128-128-57.312-128-128-128-128 57.312-128 128z',
    value: 50
  }
];

class WaterWave extends React.Component<WaterWaveProps, any> {
  static defaultProps = {
    color: '#1890FF'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { title, height = 200, color, percent } = this.props;

    const scale = {
      value: {
        min: 0,
        max: 100
      }
    };

    return (
      <Chart
        height={height}
        data={data}
        scale={scale}
        padding={[20, 20, 20, 20]}
        forceFit
      >
        <Geom
          type="interval"
          position="gender*value"
          color={color}
          shape="liquid-fill-gauge"
          style={{
            lineWidth: 2,
            opacity: 0.75
          }}
        />
      </Chart>
    );
  }
}

export default WaterWave;
