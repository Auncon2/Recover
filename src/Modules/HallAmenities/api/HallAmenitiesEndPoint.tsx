/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../components/utils/Notification";
import {
  ICreateHallAmenities,
  IViewHallAmenities,
} from "../types/HallAmenitiesTypes";
import { HALLAMENITIES } from "./constant";

export const hallAmenitiesTypesEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    deleteHalAmenitiesType: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/reservation/setting/hall/amenities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "HallAmenities", id: HALLAMENITIES }],
    }),

    updateHallAmenitiestypes: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/reservation/setting/hall/amenities/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "HallAmenities", id: HALLAMENITIES }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    createHallAmenitesType: build.mutation<unknown, ICreateHallAmenities>({
      query: (data) => ({
        url: "/reservation/setting/hall/amenities",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "HallAmenities", id: HALLAMENITIES }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getHallAmenitiesTypelist: build.query<
      HTTPResponse<IViewHallAmenities[]>,
      { params?: string }
    >({
      query: (params) => {
        return {
          url: `/reservation/setting/hall/amenities`,
          params,
        };
      },
      providesTags: () => [{ type: "HallAmenities", id: HALLAMENITIES }],
    }),
  }),
});

export const {
  useCreateHallAmenitesTypeMutation,
  useDeleteHalAmenitiesTypeMutation,
  useGetHallAmenitiesTypelistQuery,
  useUpdateHallAmenitiestypesMutation,
} = hallAmenitiesTypesEndPoint;
