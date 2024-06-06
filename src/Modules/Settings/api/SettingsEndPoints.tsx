import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
// import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../common/Notification/Notification";
// import {
//   ICreateExpenseHead,
//   IExpenseHeadlist,
// } from "../../Expense/types/ExpenseTypes";

import { GetaSingleHotel, IHotelProfileUpdate } from "../types/Settings";

// import asyncWrapper from "../../../app/utils/asyncWrapper";
// import notification from "../../../components/utils/Notification";

const SettingsEndPoints = api.injectEndpoints({
  endpoints: (build) => ({
    // getSingleHotel: build.query<HTTPResponse<GetaSingleHotel>, any>({
    getSingleHotel: build.query<GetaSingleHotel, any>({
      query: () => ({
        url: `/reservation/setting/hotel`,
        method: "GET",
      }),
      providesTags: () => [{ id: "HOTELPROFILE", type: "Hotelprofile" }],
    }),
    updateSingleHotel: build.mutation<void, IHotelProfileUpdate>({
      query: (body) => ({
        url: `/reservation/setting/hotel`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: [{ id: "HOTELPROFILE", type: "Hotelprofile" }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Updated Successfully!");
        });
      },
    }),
    // getExpenseHeadlist: build.query<HTTPResponse<IExpenseHeadlist[]>, any>({
    //   query: (params) => {
    //     return {
    //       url: "/reservation/expense/head",
    //       params,
    //     };
    //   },
    //   // providesTags: () => [{ type: "ExpenseHead", id: EXPENSEHEAD }],
    // }),

    // deleteExpense: build.mutation<HTTPResponse<void>, { id: number }>({
    //   query: ({ id }) => ({
    //     url: `/reservation/expense/head/${id}`,
    //     method: "DELETE",
    //   }),
    //   // invalidatesTags: [{ type: "ExpenseHead", id: EXPENSEHEAD }],
    // }),

    // updateExpense: build.mutation<void, { id: number; data: any }>({
    //   query: ({ id, data }) => {
    //     return {
    //       url: `/reservation/expense/head/${id}`,
    //       method: "PATCH",
    //       body: data,
    //     };
    //   },
    //   // invalidatesTags: () => [{ type: "ExpenseHead", id: EXPENSEHEAD }],
    //   onQueryStarted: (_arg, { queryFulfilled }) => {
    //     asyncWrapper(async () => {
    //       await queryFulfilled;
    //       notification("success", "Successfully Updated");
    //     });
    //   },
    // }),

    // createExpenseHead: build.mutation<unknown, ICreateExpenseHead>({
    //   query: (data) => ({
    //     url: "/reservation/expense/head",
    //     method: "POST",
    //     body: data,
    //   }),
    //   // invalidatesTags: () => [{ type: "ExpenseHead", id: EXPENSEHEAD }],
    //   onQueryStarted: (_arg, { queryFulfilled }) => {
    //     asyncWrapper(async () => {
    //       await queryFulfilled;
    //       notification("success", "Successfully created");
    //     });
    //   },
    // }),
  }),
});

export const { useGetSingleHotelQuery, useUpdateSingleHotelMutation } =
  SettingsEndPoints;
