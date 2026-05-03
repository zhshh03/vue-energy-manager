import { post, get } from "@/utils/http";

const Api = {
  batchDelete: "/deleteOrder",
  cityList: "/cityList",
} as const;

export const batchDelete = (order: string[]) => {
  return post(Api.batchDelete, { order });
};

export const getCityListApi = () => {
  return get(Api.cityList);
};
