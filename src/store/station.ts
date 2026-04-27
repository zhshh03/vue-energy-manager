import { defineStore } from "pinia";
import { ref } from "vue";
import type { RowType } from "@/types/station";

export const useStationStore = defineStore("station", () => {
  const rowData = ref<RowType>({
    name: "",
    id: "",
    city: "",
    person: "",
    tel: "",
    fast: "",
    slow: "",
    now: "",
    fault: "",
    status: 2,
  });

  const setRowData = (data: RowType) => {
    rowData.value = data;
  };
  const resizeRowData = () => {
    rowData.value = {
      name: "",
      id: "",
      city: "",
      person: "",
      tel: "",
      fast: "",
      slow: "",
      now: "",
      fault: "",
    };
  };
  return {
    rowData,
    setRowData,
    resizeRowData,
  };
});
