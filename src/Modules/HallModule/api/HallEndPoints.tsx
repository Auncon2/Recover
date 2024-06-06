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
import { HALLBOOKING } from "../../HallBooking/api/HallBooking";
import { MONEYRECEIPT } from "../../MoneyReceipt/api/MoneyReceiptsConstant";
import {
  ICreateHall,
  ICreateHallParams,
  IViewHall,
  IViewSingleHall,
} from "../Types/HallTypes";
import { HALL } from "./HallConstant";

export const hallEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    createHall: build.mutation<HTTPResponse<ICreateHall>, FormData>({
      query: (body) => ({
        url: `/reservation/hall`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Hall", id: HALL }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Created");
        });
      },
    }),

    getHallList: build.query<HTTPResponse<IViewHall[]>, ICreateHallParams>({
      query: (params) => {
        return {
          url: `/reservation/hall`,
          params,
        };
      },
      providesTags: () => [{ type: "Hall", id: HALL }],
    }),
    getHallAvailableList: build.query<HTTPResponse<IViewHall[]>, any>({
      query: (params) => {
        return {
          url: `/reservation/hall/available`,
          params,
        };
      },
      providesTags: () => [{ type: "Hall", id: HALL }],
    }),
    getHallAvailableUnavailableList: build.query<
      HTTPResponse<IViewHall[]>,
      any
    >({
      query: (params) => {
        return {
          url: `/reservation/hall/available-unavailable`,
          params,
        };
      },
      providesTags: () => [
        { type: "Hall", id: HALL },
        { type: "Hallbooking", id: HALLBOOKING },
      ],
    }),

    getHallDetails: build.query<HTTPResponse<IViewSingleHall[]>, number>({
      query: (id) => `/reservation/hall/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [{ type: "Hall", id: HALL }],
    }),

    updateHall: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/reservation/hall/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "Hall", id: HALL }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),
    getHallBookingInvoiceList: build.query<IInvoiceList, any>({
      query: (params) => {
        return {
          url: `/reservation/invoice/hall-booking`,
          params,
        };
      },
      providesTags: () => [
        { type: "Invoice", id: INVOICE },
        { type: "Moneyreceipt", id: MONEYRECEIPT },
        { type: "Hall", id: HALL },
      ],
    }),
    getHallBookingInvoiceDetails: build.query<ISingleViewInvoice, number>({
      query: (id) => `/reservation/invoice/hall-booking/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [
        { type: "Invoice", id: INVOICE },
        { type: "Moneyreceipt", id: MONEYRECEIPT },
        { type: "Hall", id: HALL },
      ],
    }),
  }),
});

// eslint-disable-next-line react-refresh/only-export-components
export const {
  useCreateHallMutation,
  useGetHallDetailsQuery,
  useGetHallListQuery,
  useUpdateHallMutation,
  useGetHallAvailableListQuery,
  useGetHallAvailableUnavailableListQuery,
  useGetHallBookingInvoiceListQuery,
  useGetHallBookingInvoiceDetailsQuery,
} = hallEndPoint;
