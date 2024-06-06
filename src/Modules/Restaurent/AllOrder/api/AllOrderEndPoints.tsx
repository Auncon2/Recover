/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { api } from "../../../../app/api/userApi/api";
import { HTTPResponse } from "../../../../app/utils/commonTypes";
import { ALLORDER } from "./constant";

export const allOrdersEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    // getExpenseHeadlist: build.query<HTTPResponse<IExpenseHeadlist[]>, void>({
    //   query: () => "/reservation/expense/head",
    //   providesTags: () => [{ type: "ExpenseHead", id: EXPENSEHEAD }],
    // }),

    deleteOrder: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/restaurant/ingredient/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "AllOrder", id: ALLORDER }],
    }),

    getAllOrderlist: build.query<HTTPResponse<any[]>, { params?: string }>({
      query: (params) => {
        return {
          url: `/restaurant/ingredient`,
          params,
        };
      },
      providesTags: () => [{ type: "AllOrder", id: ALLORDER }],
    }),
  }),
});

export const { useGetAllOrderlistQuery, useDeleteOrderMutation } =
  allOrdersEndPoint;
