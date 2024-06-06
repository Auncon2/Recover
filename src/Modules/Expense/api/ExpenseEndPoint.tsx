/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../components/utils/Notification";
import { ACCOUNT } from "../../Account/api/AccountConstant";
import { ROOMBOOKING } from "../../BookRoom/api/RoomBookingConstant";
import {
  ICreateExpense,
  ICreateExpenseHead,
  IExpenseHeadlist,
  IExpenseSingle,
  IExpenselist,
} from "../types/ExpenseTypes";
import { EXPENSE, EXPENSEHEAD } from "./constant";

export const ExpenseEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    // getExpenseHeadlist: build.query<HTTPResponse<IExpenseHeadlist[]>, void>({
    //   query: () => "/reservation/expense/head",
    //   providesTags: () => [{ type: "ExpenseHead", id: EXPENSEHEAD }],
    // }),
    getExpenseHeadlist: build.query<HTTPResponse<IExpenseHeadlist[]>, any>({
      query: (params) => {
        return {
          url: "/reservation/expense/head",
          params,
        };
      },
      providesTags: () => [
        { type: "ExpenseHead", id: EXPENSEHEAD },
        { type: "Roombooking", id: ROOMBOOKING },
        { type: "Account", id: ACCOUNT },
      ],
    }),

    deleteExpense: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/reservation/expense/head/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ExpenseHead", id: EXPENSEHEAD }],
    }),

    updateExpense: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/reservation/expense/head/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "ExpenseHead", id: EXPENSEHEAD }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    createExpenseHead: build.mutation<unknown, ICreateExpenseHead>({
      query: (data) => ({
        url: "/reservation/expense/head",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "ExpenseHead", id: EXPENSEHEAD }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    createExpense: build.mutation<unknown, ICreateExpense>({
      query: (data) => ({
        url: "/reservation/expense",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Expense", id: EXPENSE }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getExpenselist: build.query<
      HTTPResponse<IExpenselist[]>,
      { params?: string }
    >({
      query: (params) => {
        return {
          url: `/reservation/expense`,
          params,
        };
      },
      providesTags: () => [{ type: "Expense", id: EXPENSE }],
    }),

    getSingleExpense: build.query<HTTPResponse<IExpenseSingle>, number>({
      query: (id) => `/reservation/expense/${id}`,
      providesTags: () => [{ type: "Expense", id: EXPENSE }],
    }),
  }),
});

export const {
  useCreateExpenseHeadMutation,
  useGetExpenseHeadlistQuery,
  useGetExpenselistQuery,
  useCreateExpenseMutation,
  useGetSingleExpenseQuery,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
} = ExpenseEndPoint;
