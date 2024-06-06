/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */

import { api } from "../../../app/api/userApi/api";
import { expire } from "../../../app/api/utils/unUsedExpireTimer";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../common/Notification/Notification";
import { ROOMBOOKING } from "../../BookRoom/api/RoomBookingConstant";
import { INVOICE } from "../../BookingInvoice/api/constant";
import { HALLBOOKING } from "../../HallBooking/api/HallBooking";

import { MONEYRECEIPT } from "../../MoneyReceipt/api/MoneyReceiptsConstant";
import {
  ICreateGuest,
  ICustomer,
  IViewCustomerDetails,
} from "../types/CustomerTypes";
import { CUSTOMER } from "./CustomerConstant";

export const customerEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    createGuest: build.mutation<HTTPResponse<ICreateGuest>, FormData>({
      query: (body) => ({
        url: `/reservation/guest`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Customer", id: CUSTOMER }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Created");
        });
      },
    }),

    getCustomerList: build.query<ICustomer, { params: string }>({
      query: (params) => {
        return {
          url: `/reservation/guest`,
          params,
        };
      },
      providesTags: () => [
        { type: "Customer", id: CUSTOMER },
        { type: "Moneyreceipt", id: MONEYRECEIPT },
        { type: "Roombooking", id: ROOMBOOKING },
        { type: "Hallbooking", id: HALLBOOKING },
        { type: "Invoice", id: INVOICE },
      ],
    }),

    getCustomerDetails: build.query<HTTPResponse<IViewCustomerDetails>, number>(
      {
        query: (id) => `/reservation/guest/${id}`,
        keepUnusedDataFor: expire.min,
        providesTags: () => [
          { type: "Customer", id: CUSTOMER },
          { type: "Moneyreceipt", id: MONEYRECEIPT },
          { type: "Roombooking", id: ROOMBOOKING },
          { type: "Hallbooking", id: HALLBOOKING },
        ],
      }
    ),

    // // getRoleList: build.query<HTTPResponse<IViewRole[]>, any>({
    // //   query: () => {
    // //     return {
    // //       url: `/m360/administration/role`,
    // //     };
    // //   },
    // //   providesTags: () => [{ type: "Account", id: ACCOUNT }],
    // // }),

    // updateHotelRoom: build.mutation<void, { id: number; data: any }>({
    //   query: ({ id, data }) => {
    //     return {
    //       url: `/reservation/room/${id}`,
    //       method: "PATCH",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: () => [{ type: "Account", id: ACCOUNT }],
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
    //   providesTags: () => [{ type: "Account", id: ACCOUNT }],
    // }),
  }),
});

// eslint-disable-next-line react-refresh/only-export-components
export const {
  useCreateGuestMutation,
  useGetCustomerListQuery,
  useGetCustomerDetailsQuery,
} = customerEndPoint;
