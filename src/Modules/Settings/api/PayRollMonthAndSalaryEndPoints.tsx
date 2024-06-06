/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../components/utils/Notification";
import {
  ICreatePayrollMonthAndSalary,
  IPayrollMonthAndSalaryType,
} from "../types/RoomTypes";
import { PAYROLLMONTH } from "./constant";

export const DepartmentTypesEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    deletePayRollMonthAndSalaryType: build.mutation<
      HTTPResponse<void>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/reservation/setting/payroll-month/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "PayrollMonthTypes", id: PAYROLLMONTH }],
    }),

    updatePayRollMonthAndSalaryTypes: build.mutation<
      void,
      { id: number; data: any }
    >({
      query: ({ id, data }) => {
        return {
          url: `/reservation/setting/payroll-month/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "PayrollMonthTypes", id: PAYROLLMONTH }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    createPayRollMonthAndSalaryType: build.mutation<
      unknown,
      ICreatePayrollMonthAndSalary
    >({
      query: (data) => ({
        url: "/reservation/setting/payroll-month",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "PayrollMonthTypes", id: PAYROLLMONTH }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getPayRollMonthAndSalaryTypelist: build.query<
      HTTPResponse<IPayrollMonthAndSalaryType[]>,
      any
    >({
      query: (params) => {
        return {
          url: `/reservation/setting/payroll-month`,
          params,
        };
      },
      providesTags: () => [{ type: "PayrollMonthTypes", id: PAYROLLMONTH }],
    }),
  }),
});

export const {
  useCreatePayRollMonthAndSalaryTypeMutation,
  useDeletePayRollMonthAndSalaryTypeMutation,
  useGetPayRollMonthAndSalaryTypelistQuery,
  useUpdatePayRollMonthAndSalaryTypesMutation,
} = DepartmentTypesEndPoint;
