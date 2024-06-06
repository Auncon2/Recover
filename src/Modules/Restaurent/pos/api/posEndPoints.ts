import { api } from "../../../../app/api/userApi/api";
import { DELIVERY, DINEIN, TAKEOUT } from "../utils/pos-constant";

const posEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    dineIn: builder.query({
      query: () => "/member/new-tables/dine-in",
      providesTags: ["pos"],
    }),

    addSubDineIn: builder.mutation({
      query: (data) => ({
        url: "/member/new-tables/dine-in-sub-tables",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["pos"],
    }),

    takeOut: builder.query({
      query: () => "/member/new-tables/take-out",
      providesTags: ["pos"],
    }),

    delivary: builder.query({
      query: () => "/member/new-tables/delivary",
      providesTags: ["pos"],
    }),

    checkingOrder: builder.query({
      query: ({ tableId, orderType }): string | any => {
        if (!tableId) {
          return;
        }
        let queryString: string = "/member/new-tables/order/";
        if (orderType === DINEIN) {
          queryString = `/member/new-tables/order/${parseInt(tableId)}`;
        }
        if (orderType === TAKEOUT) {
          queryString = `/member/new-tables/order/takeout/${parseInt(tableId)}`;
        }
        if (orderType === DELIVERY) {
          queryString = `/member/new-tables/order/delivary/${parseInt(
            tableId
          )}`;
        }
        return queryString;
      },
      providesTags: ["pos"],
    }),

    confirmOrder: builder.mutation({
      query: (data) => ({
        url: "/member/new-tables/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["pos"],
    }),

    invoice: builder.query({
      query: (id) => `/member/invoice/${parseInt(id)}`,
      providesTags: ["pos"],
    }),
  }),
});

export const {
  useDineInQuery,
  useAddSubDineInMutation,
  useTakeOutQuery,
  useDelivaryQuery,
  useCheckingOrderQuery,
  useConfirmOrderMutation,
  useInvoiceQuery,
} = posEndpoint;
