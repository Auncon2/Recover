import { api } from "../../../app/api/userApi/api";
import { expire } from "../../../app/api/utils/unUsedExpireTimer";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../components/utils/Notification";
import { ROOMBOOKING } from "../../BookRoom/api/RoomBookingConstant";
import { HALL } from "../../HallModule/api/HallConstant";
import { MONEYRECEIPT } from "../../MoneyReceipt/api/MoneyReceiptsConstant";
import {
  IInvoiceList,
  ISingleViewInvoice,
  createInvoice,
} from "../types/InvoiceTypes";
import { BOOKINGINVOICE } from "./BookingInvoiceConstant";
import { INVOICE } from "./constant";

// import asyncWrapper from "../../../app/utils/asyncWrapper";
// import notification from "../../../components/utils/Notification";

const bookingInvoiceApi = api.injectEndpoints({
  endpoints: (build) => ({
    createInvoice: build.mutation<unknown, createInvoice>({
      query: (data) => ({
        url: "/reservation/invoice",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ id: INVOICE, type: "Invoice" }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    updateAgent: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/admin/agents/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: () => [{ id: BOOKINGINVOICE, type: "BookingInvoice" }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getInvoiceList: build.query<IInvoiceList, any>({
      query: (params) => {
        return {
          url: `/reservation/invoice`,
          params,
        };
      },
      providesTags: () => [
        { type: "Invoice", id: INVOICE },
        { type: "Moneyreceipt", id: MONEYRECEIPT },
        { type: "Roombooking", id: ROOMBOOKING },
        { type: "Hall", id: HALL },
      ],
    }),
    getAllInvoiceList: build.query<any, any>({
      query: (params) => {
        return {
          url: `/reservation/invoice/for/money-receipt`,
          params,
        };
      },
      providesTags: () => [
        { type: "Invoice", id: INVOICE },
        { type: "Moneyreceipt", id: MONEYRECEIPT },
        { type: "Roombooking", id: ROOMBOOKING },
        { type: "Hall", id: HALL },
      ],
    }),

    getInvoiceDetails: build.query<ISingleViewInvoice, number>({
      query: (id) => `/reservation/invoice/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [
        { type: "Invoice", id: INVOICE },
        { type: "Moneyreceipt", id: MONEYRECEIPT },
        { type: "Roombooking", id: ROOMBOOKING },
        { type: "Hall", id: HALL },
      ],
    }),

    deleteAgent: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ id: BOOKINGINVOICE, type: "BookingInvoice" }],
    }),

    getAgentDetails: build.query<HTTPResponse<any>, number>({
      query: (id) => `/admin/agent/info/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [{ id: BOOKINGINVOICE, type: "BookingInvoice" }],
    }),

    getSingleAgent: build.query<HTTPResponse<void>, number>({
      query: (id) => `/admin/agent/info/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [{ id: BOOKINGINVOICE, type: "BookingInvoice" }],
    }),

    getAgentProperties: build.query<HTTPResponse<any>, number>({
      query: (id) => `/admin/property/user/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [{ id: BOOKINGINVOICE, type: "BookingInvoice" }],
    }),
  }),
});

export const {
  useCreateInvoiceMutation,
  useGetInvoiceListQuery,
  useGetInvoiceDetailsQuery,
  useGetAllInvoiceListQuery,
} = bookingInvoiceApi;
