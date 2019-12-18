/**
 * @author wangxingkang
 * @date 2019-07-15 22:20
 * @description Analysis页面
 *
 * @last-modified-by wangxingkang
 * @last-modified-time 2019-07-15 22:20
 */
import React from 'react';
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
