/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */

import { api } from "../../../app/api/userApi/api";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import {
  AccountReportParam,
  IViewAccountReport,
} from "../types/AccountReportTypes";
import { ACCOUNTREPORT } from "./AccountReportConstant";

export const reportEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getAccountReportList: build.query<
      HTTPResponse<IViewAccountReport[]>,
      AccountReportParam
    >({
      query: (params) => {
        return {
          url: `/reservation/report/account`,
          params,
        };
      },
      providesTags: () => [{ type: "AccountReport", id: ACCOUNTREPORT }],
    }),
  }),
});

// eslint-disable-next-line react-refresh/only-export-components
export const { useGetAccountReportListQuery } = reportEndPoint;
