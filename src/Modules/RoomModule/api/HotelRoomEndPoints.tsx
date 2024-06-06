/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */

import { api } from "../../../app/api/userApi/api";
import { expire } from "../../../app/api/utils/unUsedExpireTimer";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../common/Notification/Notification";
import { ROOMBOOKING } from "../../BookRoom/api/RoomBookingConstant";
import {
  ICreateHotelRoom,
  ICreateRoomParams,
  IRoom,
  ISingleRoom,
  IVewHotelRoom,
} from "../Types/HotelRoomTypes";
import { HOTELROOM } from "./HotelRoomConstant";

export const hotelRoomEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    createHotelRoom: build.mutation<HTTPResponse<ICreateHotelRoom>, FormData>({
      query: (body) => ({
        url: `/reservation/room/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "HotelRoom", id: HOTELROOM }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Created");
        });
      },
    }),

    getHotelRoomList: build.query<HTTPResponse<IRoom[]>, ICreateRoomParams>({
      query: (params) => {
        return {
          url: `/reservation/room`,
          params,
        };
      },
      providesTags: () => [
        { type: "HotelRoom", id: HOTELROOM },
        { type: "Roombooking", id: ROOMBOOKING },
      ],
    }),
    getAvailableHotelRoomList: build.query<
      HTTPResponse<IVewHotelRoom[]>,
      ICreateRoomParams
    >({
      query: (params) => {
        return {
          url: `/reservation/room/available`,
          params,
        };
      },
      providesTags: () => [
        { type: "HotelRoom", id: HOTELROOM },
        { type: "Roombooking", id: ROOMBOOKING },
      ],
    }),
    getAvailableAndUnavaliableHotelRoomList: build.query<
      HTTPResponse<IRoom>,
      any
    >({
      query: (params) => {
        return {
          url: `/reservation/room/available-unavailable`,
          params,
        };
      },
      providesTags: () => [
        { type: "HotelRoom", id: HOTELROOM },
        { type: "Roombooking", id: ROOMBOOKING },
      ],
    }),

    getHotelRoomDetails: build.query<HTTPResponse<ISingleRoom>, number>({
      query: (id) => `/reservation/room/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [{ type: "HotelRoom", id: HOTELROOM }],
    }),

    // getRoleList: build.query<HTTPResponse<IViewRole[]>, any>({
    //   query: () => {
    //     return {
    //       url: `/m360/administration/role`,
    //     };
    //   },
    //   providesTags: () => [{ type: "HotelRoom", id: HOTELROOM }],
    // }),

    updateHotelRoom: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/reservation/room/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "HotelRoom", id: HOTELROOM }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    getProfile: build.query<HTTPResponse<any>, void>({
      query: () => {
        return {
          url: `/auth/admin/profile`,
        };
      },
      providesTags: () => [{ type: "HotelRoom", id: HOTELROOM }],
    }),
  }),
});

// eslint-disable-next-line react-refresh/only-export-components
export const {
  useCreateHotelRoomMutation,
  useGetHotelRoomListQuery,
  useUpdateHotelRoomMutation,
  useGetProfileQuery,
  useGetHotelRoomDetailsQuery,
  useGetAvailableHotelRoomListQuery,
  useGetAvailableAndUnavaliableHotelRoomListQuery,
} = hotelRoomEndPoint;
