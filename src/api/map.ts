import { post } from "@/utils/http";

const Api = {
  map: "/mapList",
  addMap: "/addMapStation",
} as const;

export const getMapApi = () => {
  return post(Api.map);
};

export const addMapApi = (data: any) => {
  return post(Api.addMap, data);
};
