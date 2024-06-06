import { api } from "../../../app/api/userApi/api";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import { IViewMonitorLogs } from "../types/MonitorLogs";
import { MONITORLOGSLIST } from "./MonitorLogsConstant";

// import asyncWrapper from "../../../app/utils/asyncWrapper";
// import notification from "../../../components/utils/Notification";

const monitorLogsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMonitorLogs: build.query<
      HTTPResponse<IViewMonitorLogs[]>,
      { data: string }
    >({
      query: ({ data: filterValue }) => ({
        url: `/admin/monitor/logs?status=${filterValue}`,
      }),
      providesTags: () => [{ id: MONITORLOGSLIST, type: "MonitorLogs" }],
    }),
  }),
});

export const { useGetMonitorLogsQuery } = monitorLogsApi;
