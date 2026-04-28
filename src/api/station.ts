import type { RowType } from "@/types/station";
import { post, get } from "@/utils/http";

const Api = {
  addList: "/addStation",
  editorList: "/editStation",
  deleteList: "/deleteStation",
  getRevenueEchart: "/revenueChart",
  getRevenueList: "/revenueList",
} as const;

interface ListType {
  page: number;
  pageSize: number;
  name: string;
}

export const addStationApi = (data: RowType) => {
  return post(Api.addList, data);
};
export const editorStationApi = (data: RowType) => {
  return post(Api.editorList, data);
};
export const deleteStationApi = (id: string) => {
  return post(Api.deleteList, { id });
};
export const getRevenueChartApi = () => {
  return get(Api.getRevenueEchart);
};
export const getListApi = (data: ListType) => {
  return post(Api.getRevenueList, data);
};
