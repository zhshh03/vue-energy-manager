import { post } from "@/utils/http";

export const getSystemListApi = (pageAuthority:string) => {
  return post("/userAuth", {pageAuthority});
};

export const setAuthApi = (account:string,btnList:string[],pageList:string[]) => {
  return post("/updateAuth", {account, btnList, pageList});
};
