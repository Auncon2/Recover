/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */

import { api } from "../../../app/api/userApi/api";
// import { expire } from "../../../app/api/utils/unUsedExpireTimer";
// import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import {
  ExpenseReportParams,
  IExpenseReportAllList,
} from "../Types/ExpenseReportTypes";
// import notification from "../../../common/Notification/Notification";

// import { HOTELROOM } from "./HotelRoomConstant";

export const RoomBookingEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    // createRoomBooking: build.mutation<
    //   HTTPResponse<CreateRoomBooking>,
    //   FormData
    // >({
    //   query: (body) => ({
    //     url: `/reservation/room-booking`,
    //     method: "POST",
    //     body,
    //   }),
    //   //   invalidatesTags: () => [{ type: "Roombooking", id: ROOMBOOKING }],
    //   onQueryStarted: async (_arg, { queryFulfilled }) => {
    //     asyncWrapper(async () => {
    //       await queryFulfilled;
    //       notification("success", "Booking Has Been Confirmed!");
    //     });
    //   },
    // }),

    // getAllRoomBookingList: build.query<HTTPResponse<AllRoomBookingList[]>, any>(
    //   {
    //     query: (params) => {
    //       return {
    //         url: `/reservation/room-booking`,
    //         params,
    //       };
    //     },
    //     providesTags: () => [{ type: "Roombooking", id: ROOMBOOKING }],
    //   }
    // ),
    getAllExpenseReportList: build.query<
      HTTPResponse<IExpenseReportAllList[]>,
      ExpenseReportParams
    >({
      query: (params) => {
        const url = `/reservation/report/expense`;

        // if (params.status) {
        //   url += `?status=${params.status}`;
        // }
        // if (params.status !== undefined && params.status !== "") {
        //   url += `status=${params.status}`;
        // }
        return {
          url,
          params,
        };
      },
      //   providesTags: () => [{ type: "Roombooking", id: ROOMBOOKING }],
    }),

    // getRoomBookingSingleDetails: build.query<
    //   HTTPResponse<SingleRoomBookingData>,
    //   number
    // >({
    //   query: (id) => `/reservation/room-booking/${id}`,
    //   keepUnusedDataFor: expire.min,
    //   providesTags: () => [{ type: "Roombooking", id: ROOMBOOKING }],
    // }),

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
export const { useGetAllExpenseReportListQuery } = RoomBookingEndPoint;
