/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../components/utils/Notification";
import { ICreateBedTypes, IViewBedTypes } from "../types/RoomTypes";
import { BEDTYPES } from "./constant";

export const BedTypesEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    deleteBedType: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/reservation/setting/room/bed-type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "BedTypes", id: BEDTYPES }],
    }),

    updateBedtypes: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/reservation/setting/room/bed-type/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "BedTypes", id: BEDTYPES }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    createBedType: build.mutation<unknown, ICreateBedTypes>({
      query: (data) => ({
        url: "/reservation/setting/room/bed-type",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "BedTypes", id: BEDTYPES }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getBedTypelist: build.query<HTTPResponse<IViewBedTypes[]>, any>({
      query: (params) => {
        return {
          url: `/reservation/setting/room/bed-type`,
          params,
        };
      },
      providesTags: () => [{ type: "BedTypes", id: BEDTYPES }],
    }),
  }),
});

export const {
  useCreateBedTypeMutation,
  useDeleteBedTypeMutation,
  useGetBedTypelistQuery,
  useUpdateBedtypesMutation,
} = BedTypesEndPoint;
