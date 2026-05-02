import { post } from "@/utils/http";

const Api = {
  batchDelete: "/deleteOrder",
} as const;

export const batchDelete = (order: string[]) => {
  return post(Api.batchDelete, { order });
};
