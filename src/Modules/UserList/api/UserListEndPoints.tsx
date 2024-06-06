import { api } from "../../../app/api/userApi/api";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import { IViewUserList } from "../types/UserListTypes";

import { USERLIST } from "./UserListConstant";

// import asyncWrapper from "../../../app/utils/asyncWrapper";
// import notification from "../../../components/utils/Notification";

const userListApi = api.injectEndpoints({
  endpoints: (build) => ({
    // createTransaction: build.mutation<unknown, ICreateTransiction>({
    //   query: (data) => ({
    //     url: "/agent/client/transaction",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: () => [{ id: TRANSACTION, type: "Transaction" }],
    //   onQueryStarted: (_arg, { queryFulfilled }) => {
    //     asyncWrapper(async () => {
    //       await queryFulfilled;
    //       notification("success", "Successfully created");
    //     });
    //   },
    // }),

    // updateTransaction: build.mutation<void, { id: number; data: any }>({
    //   query: ({ id, data }) => {
    //     return {
    //       url: `/agent/client/transaction/${id}`,
    //       method: "PUT",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: () => [{ id: TRANSACTION, type: "Transaction" }],
    //   onQueryStarted: (_arg, { queryFulfilled }) => {
    //     asyncWrapper(async () => {
    //       await queryFulfilled;
    //       notification("success", "Successfully created");
    //     });
    //   },
    // }),

    getUserList: build.query<HTTPResponse<IViewUserList[]>, { data: string }>({
      query: ({ data: filterValue }) => ({
        url: `/admin/users?verified=${
          filterValue === "all" ? "null" : filterValue
        }`,
      }),
      providesTags: () => [{ id: USERLIST, type: "UserList" }],
    }),

    deleteUserList: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ id: USERLIST, type: "UserList" }],
    }),

    // getTransactionDetails: build.query<
    //   HTTPResponse<IVIewTransictionDetails>,
    //   number
    // >({
    //   query: (id) => `/agent/client/transaction/${id}`,
    //   keepUnusedDataFor: expire.min,
    //   providesTags: () => [{ id: TRANSACTION, type: "Transaction" }],
    // }),
  }),
});

export const { useDeleteUserListMutation, useGetUserListQuery } = userListApi;
