/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */

import { api } from "../../../app/api/userApi/api";
import { SALARYREPORT } from "./SalaryReportConstant";
import {
  ISalaryReportParam,
  IVIewAllSalaryReport,
} from "../types/SalaryReportTypes";
import { HTTPResponse } from "../../../app/utils/commonTypes";

export const salaryReportEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getSalaryReportList: build.query<
      HTTPResponse<IVIewAllSalaryReport[]>,
      ISalaryReportParam
    >({
      query: (params) => {
        return {
          url: `/reservation/report/salary`,
          params,
        };
      },
      providesTags: () => [{ type: "SalaryReport", id: SALARYREPORT }],
    }),
  }),
});

export const { useGetSalaryReportListQuery } = salaryReportEndPoint;
