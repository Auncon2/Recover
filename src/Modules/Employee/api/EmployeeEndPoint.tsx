/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "../../../app/api/userApi/api";
import { expire } from "../../../app/api/utils/unUsedExpireTimer";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../components/utils/Notification";
import {
  IViewEmployee,
  IViewSingleEmployee,
  IupdateEmployee,
} from "../types/EmployeeTypes";
import { EMPLOYEE } from "./EmployeeConstant";

export const EmployeeEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getEmployee: build.query<HTTPResponse<IViewEmployee[]>, any>({
      query: (params) => {
        return {
          url: `/reservation/setting/employee`,
          params,
        };
      },
      providesTags: () => [{ type: "Employee", id: EMPLOYEE }],
    }),

    deleteEmployee: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/reservation/setting/employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Employee", id: EMPLOYEE }],
    }),

    updateEmployee: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        console.table(Object.fromEntries(data));

        return {
          url: `/reservation/setting/employee/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "Employee", id: EMPLOYEE }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    createEmployee: build.mutation<IupdateEmployee, FormData>({
      query: (FormData) => ({
        url: "/reservation/setting/employee",
        method: "POST",
        body: FormData,
      }),
      invalidatesTags: () => [{ type: "Employee", id: EMPLOYEE }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getEmployeeDetails: build.query<HTTPResponse<IViewSingleEmployee>, number>({
      query: (id) => `/reservation/setting/employee/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [{ type: "Employee", id: EMPLOYEE }],
    }),
  }),
});

export const {
  useGetEmployeeDetailsQuery,
  useCreateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
} = EmployeeEndPoint;
