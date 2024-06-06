import { api } from "../../../app/api/userApi/api";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import { IViewExceptionLogs } from "../types/ExceptionLogs";
import { EXCEPTIONLOGSLIST } from "./ExceptionLogsConstant";

// import asyncWrapper from "../../../app/utils/asyncWrapper";
// import notification from "../../../components/utils/Notification";

const exceptionLogsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getExceptionLogs: build.query<
      HTTPResponse<IViewExceptionLogs[]>,
      { data: string }
    >({
      query: ({ data: filterValue }) => ({
        url: `/admin/exception/logs?status=${filterValue}`,
      }),
      providesTags: () => [{ id: EXCEPTIONLOGSLIST, type: "ExceptionLogs" }],
    }),

    getExceptionLogsFilter: build.query<
      HTTPResponse<IViewExceptionLogs[]>,
      { data: string }
    >({
      query: () => ({
        url: `/admin/exception/logs/type`,
      }),
      providesTags: () => [{ id: EXCEPTIONLOGSLIST, type: "ExceptionLogs" }],
    }),
  }),
});

export const { useGetExceptionLogsQuery, useGetExceptionLogsFilterQuery } =
  exceptionLogsApi;
