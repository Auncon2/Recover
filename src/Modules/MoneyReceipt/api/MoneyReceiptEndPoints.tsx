/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */

import { api } from "../../../app/api/userApi/api";
// import { expire } from "../../../app/api/utils/unUsedExpireTimer";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../common/Notification/Notification";

import {
  ICreateAdvanceReturnMoneyReceiptData,
  ICreateMoneyReceipt,
  IGetAllAdvanceReturnMoneyReceiptData,
  IMoneyReceiptParams,
  ISingleAdvanceReturnData,
  ISingleMoneyReceiptData,
  IallMoneyReceiptList,
  // ParamsMoneyReceipt,
} from "../Types/MoneyReceiptsTypes";
import { ADVANCERETURN, MONEYRECEIPT } from "./MoneyReceiptsConstant";

// import { HOTELROOM } from "./HotelRoomConstant";

export const RoomBookingEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    CreateMoneyReceipt: build.mutation<ICreateMoneyReceipt, any>({
      query: (body) => ({
        url: `/reservation/money-reciept`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Moneyreceipt", id: MONEYRECEIPT }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Created");
        });
      },
    }),

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
    getAllInvoiceMoneyReceiptList: build.query<
      HTTPResponse<IallMoneyReceiptList[]>,
      IMoneyReceiptParams
    >({
      query: (params) => {
        let url = `/reservation/money-reciept`;

        return {
          url,
          params,
        };
      },
      providesTags: () => [{ type: "Moneyreceipt", id: MONEYRECEIPT }],
    }),

    // getMoneyReceiptSingleDetails: build.query<
    //   HTTPResponse<ISingleMoneyReceiptData>,
    //   any
    // >({
    //   query: (id) => `/reservation/money-reciept/${id}`,
    //   keepUnusedDataFor: expire.min,
    //   providesTags: () => [{ type: "Moneyreceipt", id: MONEYRECEIPT }],
    // }),
    getMoneyReceiptSingleDetails: build.query<
      HTTPResponse<ISingleMoneyReceiptData>,
      any
    >({
      query: (id) => `/reservation/money-reciept/${id}`,
      providesTags: () => [{ type: "Moneyreceipt", id: MONEYRECEIPT }],
    }),
    // ..........................................Advance Return..............................

    getAdvanceReturnList: build.query<
      HTTPResponse<IGetAllAdvanceReturnMoneyReceiptData[]>,
      any
    >({
      query: (params) => {
        return {
          url: `/reservation/money-reciept/advance-return`,
          params,
        };
      },
      providesTags: () => [{ type: "Advancemonceyreturn", id: ADVANCERETURN }],
    }),
    CreateAdvanceReturn: build.mutation<
      ICreateAdvanceReturnMoneyReceiptData,
      any
    >({
      query: (body) => ({
        url: `/reservation/money-reciept/advance-return`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [
        { type: "Advancemonceyreturn", id: ADVANCERETURN },
      ],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Created");
        });
      },
    }),
    getSingleAdvanceReturn: build.query<
      HTTPResponse<ISingleAdvanceReturnData>,
      any
    >({
      query: (id) => `/reservation/money-reciept/advance-return/${id}`,
      providesTags: () => [{ type: "Advancemonceyreturn", id: ADVANCERETURN }],
    }),

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
  useCreateMoneyReceiptMutation,
  useGetAllInvoiceMoneyReceiptListQuery,
  useGetMoneyReceiptSingleDetailsQuery,
  useGetAdvanceReturnListQuery,
  useCreateAdvanceReturnMutation,
  useGetSingleAdvanceReturnQuery,
} = RoomBookingEndPoint;
