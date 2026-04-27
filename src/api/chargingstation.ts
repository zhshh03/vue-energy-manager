import { post } from "@/utils/http";

const Api = {
  List: "/stationList",
} as const;

interface ListType {
  page: number;
  pageSize: number;
  name?: string;
  id?: string;
  status: number;
}

export const getListApi = (data: ListType) => {
  return post(Api.List, data);
};
