/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../components/utils/Notification";
import {
  ICreatePaymentMethod,
  IViewPaymentMethod,
} from "../Types/PaymentMethod";
import { PAYMENT } from "./constant";

export const PaymentMethodEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getPaymentlist: build.query<
      HTTPResponse<IViewPaymentMethod[]>,
      {
        params: string;
      }
    >({
      query: (params) => {
        return {
          url: "/reservation/setting/account/payment-method",
          params,
        };
      },
      providesTags: () => [{ type: "Payment", id: PAYMENT }],
    }),

    deletePaymentList: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/reservation/setting/account/payment-method/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Payment", id: PAYMENT }],
    }),

    updatePayment: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/reservation/setting/account/payment-method/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "Payment", id: PAYMENT }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    createPaymentMethod: build.mutation<unknown, ICreatePaymentMethod>({
      query: (data) => ({
        url: "/reservation/setting/account/payment-method",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Payment", id: PAYMENT }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),
  }),
});

export const {
  useCreatePaymentMethodMutation,
  useDeletePaymentListMutation,
  useGetPaymentlistQuery,
  useUpdatePaymentMutation,
} = PaymentMethodEndPoint;
