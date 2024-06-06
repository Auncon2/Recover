/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */

import { api } from "../../../app/api/userApi/api";

import {
  IAccountReportViewDashboard,
  IAmountReportViewDashboard,
  IViewDashboard,
} from "../types/dashboard";
import { DASHBOARD } from "./Constant";

export const DashboardEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    geDahsboardList: build.query<IViewDashboard, void>({
      query: () => {
        return {
          url: `/reservation/report/dashboard`,
        };
      },
      providesTags: () => [{ type: "Dashboard", id: DASHBOARD }],
    }),
    geAmountReportDahsboardList: build.query<IAmountReportViewDashboard, any>({
      query: (params) => {
        return {
          url: `/reservation/report/amount-dashboard`,
          params,
        };
      },
      providesTags: () => [{ type: "Dashboard", id: DASHBOARD }],
    }),
    geAllAccountReportDahsboardList: build.query<
      IAccountReportViewDashboard,
      any
    >({
      query: (params) => {
        return {
          url: `/reservation/report/account-dashboard`,
          params,
        };
      },
      providesTags: () => [{ type: "Dashboard", id: DASHBOARD }],
    }),
  }),
});

// eslint-disable-next-line react-refresh/only-export-components
export const {
  useGeDahsboardListQuery,
  useGeAmountReportDahsboardListQuery,
  useGeAllAccountReportDahsboardListQuery,
} = DashboardEndPoint;
