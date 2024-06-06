/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../components/utils/Notification";
import {
  IInvoiceCreate,
  IInvoiceList,
  ISingleViewInvoice,
  InvoiceHead,
} from "../types/InvoiceTypes";
// import { IEventParams } from "../../Events/types/EventTypes";
// import { MONEYRECEIPT } from "../../MoneyReceipt/api/constant";

import { INVOICE } from "./constant";

export const InvoiceEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getInvocieist: build.query<HTTPResponse<IInvoiceList[]>, any>({
      // getInvocieist: build.query<HTTPResponse<Invoicelist[]>, IEventParams>({
      query: (params) => {
        return {
          url: `/admin/invoice`,
          params,
        };
      },
      providesTags: () => [{ type: "Invoice", id: INVOICE }],
    }),
    getSingleInvoice: build.query<HTTPResponse<ISingleViewInvoice>, number>({
      query: (id) => `/admin/invoice/${id}`,
      providesTags: (_result, _error) => [{ type: "Invoice", id: INVOICE }],
    }),

    createInvoiceHead: build.mutation<unknown, InvoiceHead>({
      query: (data) => ({
        url: "/admin/invoice-head",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Invoice", id: INVOICE }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getInvoiceItem: build.query<HTTPResponse<any>, void>({
      query: () => "/admin/invoice-head",
      providesTags: () => [{ type: "Invoice", id: INVOICE }],
    }),

    createInvoice: build.mutation<HTTPResponse<{ id: number }>, IInvoiceCreate>(
      {
        query: (body) => ({
          url: "/admin/invoice",
          method: "POST",
          body,
        }),
        invalidatesTags: () => [
          { type: "Invoice", id: INVOICE },
          //   { type: "Moneyreceipt", id: MONEYRECEIPT },
        ],
        onQueryStarted: async (_arg, { queryFulfilled }) => {
          asyncWrapper(async () => {
            await queryFulfilled;
            notification("success", "Successfully Created");
          });
        },
      }
    ),
  }),
});

export const {
  useGetInvocieistQuery,
  useGetSingleInvoiceQuery,
  useCreateInvoiceHeadMutation,
  useGetInvoiceItemQuery,
  useCreateInvoiceMutation,
} = InvoiceEndPoint;
