import type { RowType } from "@/types/station";
import { post } from "@/utils/http";

const Api = {
  addList: "/addStation",
  editorList: "/editStation",
  deleteList: "/deleteStation",
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
