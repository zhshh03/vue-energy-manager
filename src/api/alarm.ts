import { get } from "@/utils/http";

const Api = {
  AlarmList: "/alarmList",
} as const;

export const getAlarmListApi = () => {
  return get(Api.AlarmList);
};
