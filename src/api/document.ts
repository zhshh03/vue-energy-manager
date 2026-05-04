import { get } from "@/utils/http";

export const getDocumentList = () => {
  return get("/investmentList");
}
