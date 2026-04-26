import get from "@/utils/request";

const Api = {
  chartData: "/energy",
  chartData2: "/revenue",
  chartData3: "/equipment",
} as const;

export const getChartDataAPI = () => {
  return get(Api.chartData);
};
export const getChartData2API = () => {
  return get(Api.chartData2);
};
export const getChartData3API = () => {
  return get(Api.chartData3);
};
