import { api } from "../../../app/api/userApi/api";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import { IViewAppLogs } from "../types/AppLogs";
import { APPLOGSLIST } from "./AppLogsConstant";

// import asyncWrapper from "../../../app/utils/asyncWrapper";
// import notification from "../../../components/utils/Notification";

const appLogsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAppLogs: build.query<HTTPResponse<IViewAppLogs[]>, { data: string }>({
      query: ({ data: filterValue }) => ({
        url: `/admin/app/logs?status=${
          filterValue === "all" ? "null" : filterValue
        }`,
      }),
      providesTags: () => [{ id: APPLOGSLIST, type: "AppLogs" }],
    }),
  }),
});

export const { useGetAppLogsQuery } = appLogsApi;
