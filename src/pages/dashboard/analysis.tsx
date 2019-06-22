import React from 'react';
import { Pie } from 'rc-charts';

const AnalysisPage: React.FC = () => {
  return (
    <div>
      <Pie
        data={[{ x: 'chrome', y: 20 }, { x: 'IE', y: 20 }, { x: 'Firefox', y: 20 }]}
        tooltip={true}
        subTitle="总预警数"
        total={100}
      />
    </div>
  );
};

export default AnalysisPage;
