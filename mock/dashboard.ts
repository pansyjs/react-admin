import moment from 'moment';
import { Request, Response } from 'express';
import { packResult } from './utils';

// mock data
const visitData: { date: string; value: number }[] = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    date: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    value: fakeY[i],
  });
}

const salesData: { date: string; value: number }[] = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    date: `${i + 1}月`,
    value: Math.floor(Math.random() * 1000) + 200,
  });
}

const fetchChartData = (_: Request, res: Response) => {
  return res.json(packResult({ data: { visitData, salesData } }));
}

export default {
  'GET  /api/dashboard/chartData': fetchChartData,
};
