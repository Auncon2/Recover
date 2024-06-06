/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { api } from "../../../../app/api/userApi/api";
import { expire } from "../../../../app/api/utils/unUsedExpireTimer";
import asyncWrapper from "../../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../../app/utils/commonTypes";
import notification from "../../../../components/utils/Notification";
import { PURCHASE } from "./constant";

export const purchaseEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    // getExpenseHeadlist: build.query<HTTPResponse<IExpenseHeadlist[]>, void>({
    //   query: () => "/reservation/expense/head",
    //   providesTags: () => [{ type: "ExpenseHead", id: EXPENSEHEAD }],
    // }),

    deletePurchase: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/reservation/setting/room/room-type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Purchase", id: PURCHASE }],
    }),

    updatePurchase: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/reservation/setting/room/room-type/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "Purchase", id: PURCHASE }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    createPurchase: build.mutation<unknown, any>({
      query: (data) => ({
        url: "/reservation/setting/room/room-type",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Purchase", id: PURCHASE }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getPurchaselist: build.query<HTTPResponse<any[]>, { params?: string }>({
      query: (params) => {
        return {
          url: `/reservation/setting/room/room-type`,
          params,
        };
      },
      providesTags: () => [{ type: "Purchase", id: PURCHASE }],
    }),
    getPurchaseSingleDetails: build.query<HTTPResponse<any>, number>({
      query: (id) => `/reservation/room-perchase/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [{ type: "Purchase", id: PURCHASE }],
    }),
  }),
});

export const {
  useCreatePurchaseMutation,
  useDeletePurchaseMutation,
  useGetPurchaselistQuery,
  useUpdatePurchaseMutation,
  useGetPurchaseSingleDetailsQuery,
} = purchaseEndPoint;
