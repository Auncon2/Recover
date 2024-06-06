/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { api } from "../../../../app/api/userApi/api";
import asyncWrapper from "../../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../../app/utils/commonTypes";
import notification from "../../../../components/utils/Notification";
import { SUPPLIER } from "./constant";

export const supplierEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    // getExpenseHeadlist: build.query<HTTPResponse<IExpenseHeadlist[]>, void>({
    //   query: () => "/reservation/expense/head",
    //   providesTags: () => [{ type: "ExpenseHead", id: EXPENSEHEAD }],
    // }),

    deleteSupplier: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/restaurant/supplier/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Supplier", id: SUPPLIER }],
    }),

    updateSupplier: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/restaurant/supplier/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "Supplier", id: SUPPLIER }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    createSupplier: build.mutation<unknown, any>({
      query: (data) => ({
        url: "/restaurant/supplier",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Supplier", id: SUPPLIER }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getSupplierlist: build.query<HTTPResponse<any[]>, { params?: string }>({
      query: (params) => {
        return {
          url: `/restaurant/supplier`,
          params,
        };
      },
      providesTags: () => [{ type: "Supplier", id: SUPPLIER }],
    }),
  }),
});

export const {
  useCreateSupplierMutation,
  useDeleteSupplierMutation,
  useGetSupplierlistQuery,
  useUpdateSupplierMutation,
} = supplierEndPoint;
