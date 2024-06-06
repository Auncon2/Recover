/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../components/utils/Notification";
import { ICreateDepartment, IDepartmentType } from "../types/RoomTypes";
import { DEPARTMENT } from "./constant";

export const DepartmentTypesEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    deleteDepartmentType: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/reservation/setting/department/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "DepartmentTypes", id: DEPARTMENT }],
    }),

    updateDepartmentTypes: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/reservation/setting/department/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "DepartmentTypes", id: DEPARTMENT }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    createDepartmentType: build.mutation<unknown, ICreateDepartment>({
      query: (data) => ({
        url: "/reservation/setting/department",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "DepartmentTypes", id: DEPARTMENT }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getDepartmentTypelist: build.query<HTTPResponse<IDepartmentType[]>, any>({
      query: (params) => {
        return {
          url: `/reservation/setting/department`,
          params,
        };
      },
      providesTags: () => [{ type: "DepartmentTypes", id: DEPARTMENT }],
    }),
  }),
});

export const {
  useCreateDepartmentTypeMutation,
  useUpdateDepartmentTypesMutation,
  useDeleteDepartmentTypeMutation,
  useGetDepartmentTypelistQuery,
} = DepartmentTypesEndPoint;
