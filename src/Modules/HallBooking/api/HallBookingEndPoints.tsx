import { api } from "../../../app/api/userApi/api";
import { expire } from "../../../app/api/utils/unUsedExpireTimer";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../common/Notification/Notification";
import {
  ICreateCheckIn,
  ICreateCheckOut,
  IViewCheckInAndCheckOut,
} from "../../BookRoom/Types/RoomBookingTypes";
import { ICustomer } from "../../Customer/types/CustomerTypes";
import { MONEYRECEIPT } from "../../MoneyReceipt/api/MoneyReceiptsConstant";
import {
  ICreateHallBooking,
  ICreateHallBookingList,
  ISingleHallBookingDetails,
} from "../types/HallBookingTypes";
import { HALLBOOKING } from "./HallBooking";

export const hallBookingEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    createHallBooking: build.mutation<
      HTTPResponse<ICreateHallBooking>,
      FormData
    >({
      query: (body) => ({
        url: `/reservation/hall-booking`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Hallbooking", id: HALLBOOKING }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Booking Has Been Confirmed!");
        });
      },
    }),

    // createCheckIn: build.mutation<HTTPResponse<ICreateCheckIn>, any>({
    //   query: (body) => ({
    //     url: `/reservation/room-booking/check-in`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: () => [{ type: "Hallbooking", id: HALLBOOKING }],
    //   onQueryStarted: async (_arg, { queryFulfilled }) => {
    //     asyncWrapper(async () => {
    //       await queryFulfilled;
    //       notification("success", "Check In Has Been Confirmed!");
    //     });
    //   },
    // }),

    // createCheckOut: build.mutation<
    //   HTTPResponse<ICreateCheckOut>,
    //   { id: number; data: any }
    // >({
    //   query: ({ id, data }) => ({
    //     url: `/reservation/room-booking/check-out/${id}`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: () => [{ type: "Hallbooking", id: HALLBOOKING }],
    //   onQueryStarted: async (_arg, { queryFulfilled }) => {
    //     asyncWrapper(async () => {
    //       await queryFulfilled;
    //       notification("success", "Check Out Has Been Confirmed!");
    //     });
    //   },
    // }),

    // getCheckInCheckOut: build.query<
    //   HTTPResponse<IViewCheckInAndCheckOut[]>,
    //   any
    // >({
    //   query: (params) => {
    //     return {
    //       url: "/reservation/room-booking/check-in",
    //       params,
    //     };
    //   },
    //   providesTags: () => [{ type: "Hallbooking", id: HALLBOOKING }],
    // }),

    getAllHallBookingList: build.query<
      HTTPResponse<ICreateHallBookingList[]>,
      any
    >({
      query: (params) => {
        let url = `/reservation/hall-booking?`;

        return {
          url,
          params,
        };
      },
      providesTags: () => [
        { type: "Hallbooking", id: HALLBOOKING },
        { type: "Moneyreceipt", id: MONEYRECEIPT },
      ],
    }),

    getHallBookingSingleDetails: build.query<
      HTTPResponse<ISingleHallBookingDetails>,
      number
    >({
      query: (id) => `/reservation/hall-booking/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [
        { type: "Hallbooking", id: HALLBOOKING },
        { type: "Moneyreceipt", id: MONEYRECEIPT },
      ],
    }),
    getHallGuestList: build.query<ICustomer, void>({
      query: () => {
        return {
          url: `/reservation/hall-guest`,
        };
      },
      providesTags: () => [
        { type: "Hallbooking", id: HALLBOOKING },
        { type: "Moneyreceipt", id: MONEYRECEIPT },
      ],
    }),
    createHallCheckIn: build.mutation<HTTPResponse<ICreateCheckIn>, any>({
      query: (body) => ({
        url: `/reservation/hall-booking/hall-check-in`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Hallbooking", id: HALLBOOKING }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Check In Has Been Confirmed!");
        });
      },
    }),

    createHallCheckOut: build.mutation<
      HTTPResponse<ICreateCheckOut>,
      { id: number; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/reservation/hall-booking/hall-check-out/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Hallbooking", id: HALLBOOKING }],
      // onQueryStarted: async (_arg, { queryFulfilled }) => {
      //   asyncWrapper(async () => {
      //     await queryFulfilled;
      //     notification("success", "Check Out Has Been Confirmed!");
      //   });
      // },
    }),

    getHallCheckInCheckOut: build.query<
      HTTPResponse<IViewCheckInAndCheckOut[]>,
      any
    >({
      query: (params) => {
        return {
          url: "/reservation/hall-check-in",
          params,
        };
      },
      providesTags: () => [{ type: "Hallbooking", id: HALLBOOKING }],
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
  useCreateHallBookingMutation,
  useGetAllHallBookingListQuery,
  useGetHallBookingSingleDetailsQuery,
  useGetHallGuestListQuery,
  useCreateHallCheckInMutation,
  useCreateHallCheckOutMutation,
  useGetHallCheckInCheckOutQuery,
} = hallBookingEndPoint;
