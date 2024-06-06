/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { api } from "../../../../app/api/userApi/api";
import asyncWrapper from "../../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../../app/utils/commonTypes";
import notification from "../../../../common/Notification/Notification";

import { CREATERESTAURENT } from "./constants";

export const allOrdersEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    createHotelRestaurent: build.mutation<HTTPResponse<any>, any>({
      query: (body) => ({
        url: `/reservation/restaurant`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [
        { type: "CreateRestaurent", id: CREATERESTAURENT },
      ],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Restaurant is created successfully !");
        });
      },
    }),

    updateRestaurant: build.mutation<void, { data: any; id: number }>({
      query: ({ data, id }) => {
        console.log("end-points res_id", id);
        return {
          url: `/reservation/restaurant/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [
        { type: "CreateRestaurent", id: CREATERESTAURENT },
      ],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    getAllHotelRestaurentlist: build.query<HTTPResponse<any[]>, any>({
      query: (params) => {
        return {
          url: `/reservation/restaurant`,
          params,
        };
      },
      providesTags: () => [{ type: "CreateRestaurent", id: CREATERESTAURENT }],
    }),
    getAllHotelRestaurentPermissionlist: build.query<HTTPResponse<any[]>, void>(
      {
        query: () => {
          return {
            url: `/common-things/restaurant/permission-group`,
          };
        },
        providesTags: () => [
          { type: "CreateRestaurent", id: CREATERESTAURENT },
        ],
      }
    ),
  }),
});

export const {
  useCreateHotelRestaurentMutation,
  useGetAllHotelRestaurentlistQuery,
  useUpdateRestaurantMutation,
  useGetAllHotelRestaurentPermissionlistQuery,
} = allOrdersEndPoint;
