/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { api } from "../../../../app/api/userApi/api";
import asyncWrapper from "../../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../../app/utils/commonTypes";
import notification from "../../../../components/utils/Notification";
import { CATEGORY } from "./constant";

export const ingredientsEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    deleteCategory: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/restaurant/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Category", id: CATEGORY }],
    }),

    updateCategory: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/restaurant/category/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "Category", id: CATEGORY }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    createCategory: build.mutation<unknown, any>({
      query: (data) => ({
        url: "/restaurant/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Category", id: CATEGORY }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getCategorylist: build.query<HTTPResponse<any[]>, { params?: string }>({
      query: (params) => {
        return {
          url: `/restaurant/category`,
          params,
        };
      },
      providesTags: () => [{ type: "Category", id: CATEGORY }],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategorylistQuery,
  useUpdateCategoryMutation,
} = ingredientsEndPoint;
