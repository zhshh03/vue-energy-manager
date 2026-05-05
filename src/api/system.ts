import { post } from "@/utils/http";

export const getSystemListApi = (pageAuthority:string) => {
  return post("/userAuth", {pageAuthority});
};
