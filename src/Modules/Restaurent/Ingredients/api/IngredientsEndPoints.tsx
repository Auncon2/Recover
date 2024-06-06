/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { api } from "../../../../app/api/userApi/api";
import asyncWrapper from "../../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../../app/utils/commonTypes";
import notification from "../../../../components/utils/Notification";
import { INGREDIENTS } from "./constant";

export const ingredientsEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    deleteIngredients: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/restaurant/ingredient/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Ingredients", id: INGREDIENTS }],
    }),

    updateIngredients: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/restaurant/ingredient/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "Ingredients", id: INGREDIENTS }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    createIngredients: build.mutation<unknown, any>({
      query: (data) => ({
        url: "/restaurant/ingredient",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Ingredients", id: INGREDIENTS }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getIngredientslist: build.query<HTTPResponse<any[]>, { params?: string }>({
      query: (params) => {
        return {
          url: `/restaurant/ingredient`,
          params,
        };
      },
      providesTags: () => [{ type: "Ingredients", id: INGREDIENTS }],
    }),
  }),
});

export const {
  useCreateIngredientsMutation,
  useDeleteIngredientsMutation,
  useGetIngredientslistQuery,
  useUpdateIngredientsMutation,
} = ingredientsEndPoint;
