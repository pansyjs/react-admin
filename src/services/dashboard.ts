import { request } from 'umi';

export async function fetchChartData() {
  return request(`/api/dashboard/chartData`);
}
