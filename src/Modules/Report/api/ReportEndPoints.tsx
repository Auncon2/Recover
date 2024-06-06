/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */

import { api } from "../../../app/api/userApi/api";
import { IReport, ReportParam } from "../types/ReportType";
import { REPORT } from "./ReportConstant";

export const reportEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getReportList: build.query<IReport, ReportParam>({
      query: (params) => {
        return {
          url: `/reservation/report/room`,
          params,
        };
      },
      providesTags: () => [{ type: "Report", id: REPORT }],
    }),
    getSingleReportList: build.query<any, { id: any; params?: any }>({
      query: ({ id, params }) => {
        return {
          url: `/reservation/report/room/${id}`,
          params: params,
        };
      },
      providesTags: () => [{ type: "Report", id: REPORT }],
    }),
    // getSingleReportList: build.query<any, any>({
    //   query: (id) => {
    //     return {
    //       url: `/reservation/report/room/${id}`,
    //       // params: params,
    //     };
    //   },
    //   providesTags: () => [{ type: "Report", id: REPORT }],
    // }),
  }),
});

// eslint-disable-next-line react-refresh/only-export-components
export const { useGetReportListQuery, useGetSingleReportListQuery } =
  reportEndPoint;
