/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */

import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../common/Notification/Notification";
import { ROOMBOOKING } from "../../BookRoom/api/RoomBookingConstant";
import { EXPENSE } from "../../Expense/api/constant";
import { MONEYRECEIPT } from "../../MoneyReceipt/api/MoneyReceiptsConstant";
import {
  ICreateAccount,
  ITransferBalance,
  IViewAccount,
} from "../AccountTypes/AccountTypes";
import { ACCOUNT } from "./AccountConstant";

export const accountEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    createAccount: build.mutation<HTTPResponse<ICreateAccount>, any>({
      query: (body) => ({
        url: `/reservation/account`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Account", id: ACCOUNT }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Created");
        });
      },
    }),

    getAccountList: build.query<HTTPResponse<IViewAccount[]>, any>({
      query: (params) => {
        return {
          url: `/reservation/account`,
          params,
        };
      },
      providesTags: () => [
        { type: "Account", id: ACCOUNT },
        { type: "Expense", id: EXPENSE },
        { type: "Moneyreceipt", id: MONEYRECEIPT },
        { type: "Roombooking", id: ROOMBOOKING },
      ],
    }),

    // getHotelRoomDetails: build.query<ISingleRoom, number>({
    //   query: (id) => `/reservation/room/${id}`,
    //   keepUnusedDataFor: expire.min,
    //   providesTags: () => [{ type: "Account", id: ACCOUNT }],
    // }),

    // // getRoleList: build.query<HTTPResponse<IViewRole[]>, any>({
    // //   query: () => {
    // //     return {
    // //       url: `/m360/administration/role`,
    // //     };
    // //   },
    // //   providesTags: () => [{ type: "Account", id: ACCOUNT }],
    // // }),

    updateAccount: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/reservation/account/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "Account", id: ACCOUNT }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),
    transferBalance: build.mutation<ITransferBalance, any>({
      query: (body) => ({
        url: `/reservation/account/balance-transfer`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Account", id: ACCOUNT }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Transfered Successfully");
        });
      },
    }),

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
  useCreateAccountMutation,
  useGetAccountListQuery,
  useUpdateAccountMutation,
  useTransferBalanceMutation,
  // useUpdateHotelRoomMutation,
  // useGetProfileQuery,
  // useGetHotelRoomDetailsQuery,
} = accountEndPoint;
