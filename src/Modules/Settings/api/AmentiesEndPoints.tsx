/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../components/utils/Notification";
import { ICreateAmenites, IViewAmenitiesType } from "../types/RoomTypes";
import { AMENITESTYPES } from "./constant";

export const AmenitiesTypesEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    deleteAmenitiesType: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/reservation/setting/room/room-amenities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "AmenitiesTypes", id: AMENITESTYPES }],
    }),

    updateAmenitiestypes: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/reservation/setting/room/room-amenities/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "AmenitiesTypes", id: AMENITESTYPES }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    createAmenitesType: build.mutation<unknown, ICreateAmenites>({
      query: (data) => ({
        url: "/reservation/setting/room/room-amenities",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "AmenitiesTypes", id: AMENITESTYPES }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getAmenitiesTypelist: build.query<
      HTTPResponse<IViewAmenitiesType[]>,
      { params?: string }
    >({
      query: (params) => {
        return {
          url: `/reservation/setting/room/room-amenities`,
          params,
        };
      },
      providesTags: () => [{ type: "AmenitiesTypes", id: AMENITESTYPES }],
    }),
  }),
});

export const {
  useCreateAmenitesTypeMutation,
  useDeleteAmenitiesTypeMutation,
  useGetAmenitiesTypelistQuery,
  useUpdateAmenitiestypesMutation,
} = AmenitiesTypesEndPoint;
