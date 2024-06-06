/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { api } from "../../../../app/api/userApi/api";
import asyncWrapper from "../../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../../app/utils/commonTypes";
import notification from "../../../../components/utils/Notification";
import { INVENTORY } from "./constant";

export const inventoryEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    // getExpenseHeadlist: build.query<HTTPResponse<IExpenseHeadlist[]>, void>({
    //   query: () => "/reservation/expense/head",
    //   providesTags: () => [{ type: "ExpenseHead", id: EXPENSEHEAD }],
    // }),

    deleteInventory: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/restaurant/ingredient/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Inventory", id: INVENTORY }],
    }),

    updateInventory: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/restaurant/ingredient/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "Inventory", id: INVENTORY }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    createInventory: build.mutation<unknown, any>({
      query: (data) => ({
        url: "/restaurant/ingredient",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Inventory", id: INVENTORY }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getInventorylist: build.query<HTTPResponse<any[]>, { params?: string }>({
      query: (params) => {
        return {
          url: `/restaurant/ingredient`,
          params,
        };
      },
      providesTags: () => [{ type: "Inventory", id: INVENTORY }],
    }),
  }),
});

export const {
  useCreateInventoryMutation,
  useDeleteInventoryMutation,
  useGetInventorylistQuery,
  useUpdateInventoryMutation,
} = inventoryEndPoint;
