/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */

import { api } from "../../../app/api/userApi/api";
import { expire } from "../../../app/api/utils/unUsedExpireTimer";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../common/Notification/Notification";
import { INVOICE } from "../../BookingInvoice/api/constant";
import {
  IInvoiceList,
  ISingleViewInvoice,
} from "../../BookingInvoice/types/InvoiceTypes";
import { CUSTOMER } from "../../Customer/api/CustomerConstant";
import { ICustomer } from "../../Customer/types/CustomerTypes";
import { MONEYRECEIPT } from "../../MoneyReceipt/api/MoneyReceiptsConstant";
import {
  AllRoomBookingList,
  CreateRoomBooking,
  ICreateCheckIn,
  ICreateCheckOut,
  IMemberParams,
  IViewCheckInAndCheckOut,
  SingleRoomBookingData,
} from "../Types/RoomBookingTypes";
import { ROOMBOOKING } from "./RoomBookingConstant";

// import { HOTELROOM } from "./HotelRoomConstant";

export const RoomBookingEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    createRoomBooking: build.mutation<
      HTTPResponse<CreateRoomBooking>,
      FormData
    >({
      query: (body) => ({
        url: `/reservation/room-booking`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Roombooking", id: ROOMBOOKING }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Booking Has Been Confirmed!");
        });
      },
    }),

    createCheckIn: build.mutation<HTTPResponse<ICreateCheckIn>, any>({
      query: (body) => ({
        url: `/reservation/room-booking/check-in`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Roombooking", id: ROOMBOOKING }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Check In Has Been Confirmed!");
        });
      },
    }),

    createCheckOut: build.mutation<
      HTTPResponse<ICreateCheckOut>,
      { id: number; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/reservation/room-booking/check-out/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Roombooking", id: ROOMBOOKING }],

      onQueryStarted: async (_arg) => {},
    }),

    getCheckInCheckOut: build.query<
      HTTPResponse<IViewCheckInAndCheckOut[]>,
      any
    >({
      query: (params) => {
        return {
          url: "/reservation/room-booking/check-in",
          params,
        };
      },
      providesTags: () => [{ type: "Roombooking", id: ROOMBOOKING }],
    }),

    getAllRoomBookingList: build.query<
      HTTPResponse<AllRoomBookingList[]>,
      IMemberParams
    >({
      query: (params) => {
        const url = `/reservation/room-booking?`;

        return {
          url,
          params,
        };
      },
      providesTags: () => [
        { type: "Roombooking", id: ROOMBOOKING },
        { type: "Moneyreceipt", id: MONEYRECEIPT },
      ],
    }),

    getRoomBookingSingleDetails: build.query<
      HTTPResponse<SingleRoomBookingData>,
      number
    >({
      query: (id) => `/reservation/room-booking/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [{ type: "Roombooking", id: ROOMBOOKING }],
    }),
    getRoomBookingGuestList: build.query<ICustomer, void>({
      query: () => {
        return {
          url: `/reservation/room-guest`,
        };
      },
      providesTags: () => [
        { type: "Customer", id: CUSTOMER },
        { type: "Moneyreceipt", id: MONEYRECEIPT },
        { type: "Roombooking", id: ROOMBOOKING },
      ],
    }),
    roomBookingRefundTypes: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/reservation/room-booking/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "Roombooking", id: ROOMBOOKING }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),
    getRoomBookingInvoiceList: build.query<IInvoiceList, any>({
      query: (params) => {
        return {
          url: `/reservation/invoice/room-booking`,
          params,
        };
      },
      providesTags: () => [
        { type: "Invoice", id: INVOICE },
        { type: "Moneyreceipt", id: MONEYRECEIPT },
        { type: "Roombooking", id: ROOMBOOKING },
      ],
    }),
    getRoomBookingInvoiceDetails: build.query<ISingleViewInvoice, number>({
      query: (id) => `/reservation/invoice/room-booking/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [
        { type: "Invoice", id: INVOICE },
        { type: "Moneyreceipt", id: MONEYRECEIPT },
        { type: "Roombooking", id: ROOMBOOKING },
      ],
    }),
    roomBookingExtend: build.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => ({
        url: `/reservation/room-booking/extend/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Roombooking", id: ROOMBOOKING }],

      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    // getRoleList: build.query<HTTPResponse<IViewRole[]>, any>({
    //   query: () => {
    //     return {
    //       url: `/m360/administration/role`,
    //     };
    //   },
    //   providesTags: () => [{ type: "HotelRoom", id: HOTELROOM }],
    // }),

    // updateHotelRoom: build.mutation<void, { id: number; data: any }>({
    //   query: ({ id, data }) => {
    //     return {
    //       url: `/reservation/room/${id}`,
    //       method: "PATCH",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: () => [{ type: "HotelRoom", id: HOTELROOM }],
    //   onQueryStarted: (_arg, { queryFulfilled }) => {
    //     asyncWrapper(async () => {
    //       await queryFulfilled;
    //       notification("success", "Successfully Updated");
    //     });
    //   },
    // }),

    // getProfile: build.query<HTTPResponse<any>, void>({
    //   query: () => {
    //     return {
    //       url: `/auth/admin/profile`,
    //     };
    //   },
    //   providesTags: () => [{ type: "HotelRoom", id: HOTELROOM }],
    // }),
  }),
});

// eslint-disable-next-line react-refresh/only-export-components
export const {
  useCreateRoomBookingMutation,
  useGetAllRoomBookingListQuery,
  useGetRoomBookingSingleDetailsQuery,
  useCreateCheckInMutation,
  useGetCheckInCheckOutQuery,
  useCreateCheckOutMutation,
  useGetRoomBookingGuestListQuery,
  useRoomBookingRefundTypesMutation,
  useGetRoomBookingInvoiceListQuery,
  useGetRoomBookingInvoiceDetailsQuery,
  useRoomBookingExtendMutation,
} = RoomBookingEndPoint;
