import type { RowType } from "@/types/station";
import { post, get } from "@/utils/http";

const Api = {
  addList: "/addStation",
  editorList: "/editStation",
  deleteList: "/deleteStation",
  getList: "/revenueChart",
} as const;

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
  return get(Api.getList);
};
