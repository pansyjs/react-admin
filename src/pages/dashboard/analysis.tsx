import React from 'react';
import { Pie } from 'rc-charts';
import IntroduceRow from './components/introduce-row';
import SalesCard from './components/sales-card';

const AnalysisPage: React.FC = () => {
  return (
    <div>
      <IntroduceRow />
      <SalesCard />
    </div>
  );
};

export default AnalysisPage;
