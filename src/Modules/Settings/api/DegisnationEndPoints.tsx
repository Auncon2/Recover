/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../components/utils/Notification";
import { ICreateDesignation, IDesignationType } from "../types/RoomTypes";
import { DEGISNATION } from "./constant";

export const DegisnationTypesEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    deleteDegisnationType: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/reservation/setting/designation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "DegisnationTypes", id: DEGISNATION }],
    }),

    updateDegisnationTypes: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/reservation/setting/designation/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "DegisnationTypes", id: DEGISNATION }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    createDegisnationType: build.mutation<unknown, ICreateDesignation>({
      query: (data) => ({
        url: "/reservation/setting/designation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "DegisnationTypes", id: DEGISNATION }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getDegisnationTypelist: build.query<HTTPResponse<IDesignationType[]>, any>({
      query: (params) => {
        return {
          url: `/reservation/setting/designation`,
          params,
        };
      },
      providesTags: () => [{ type: "DegisnationTypes", id: DEGISNATION }],
    }),
  }),
});

export const {
  useCreateDegisnationTypeMutation,
  useDeleteDegisnationTypeMutation,
  useGetDegisnationTypelistQuery,
  useUpdateDegisnationTypesMutation,
} = DegisnationTypesEndPoint;
