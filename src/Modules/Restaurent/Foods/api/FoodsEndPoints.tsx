/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { api } from "../../../../app/api/userApi/api";
import asyncWrapper from "../../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../../app/utils/commonTypes";
import notification from "../../../../components/utils/Notification";
import { FOODS } from "./constant";

export const foodsEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    // getExpenseHeadlist: build.query<HTTPResponse<IExpenseHeadlist[]>, void>({
    //   query: () => "/reservation/expense/head",
    //   providesTags: () => [{ type: "ExpenseHead", id: EXPENSEHEAD }],
    // }),

    deleteFoods: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/restaurant/ingredient/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Foods", id: FOODS }],
    }),

    updateFoods: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/restaurant/ingredient/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "Foods", id: FOODS }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    createFoods: build.mutation<unknown, any>({
      query: (data) => ({
        url: "/restaurant/ingredient",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Foods", id: FOODS }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getFoodslist: build.query<HTTPResponse<any[]>, { params?: string }>({
      query: (params) => {
        return {
          url: `/restaurant/ingredient`,
          params,
        };
      },
      providesTags: () => [{ type: "Foods", id: FOODS }],
    }),
  }),
});

export const {
  useCreateFoodsMutation,
  useDeleteFoodsMutation,
  useGetFoodslistQuery,
  useUpdateFoodsMutation,
} = foodsEndPoint;
