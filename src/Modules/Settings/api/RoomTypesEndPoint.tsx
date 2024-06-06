/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../components/utils/Notification";
import { ICreateRoomTypes, IViewRoomTypes } from "../types/RoomTypes";
import { ROOMTYPES } from "./constant";

export const RoomTypesEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    // getExpenseHeadlist: build.query<HTTPResponse<IExpenseHeadlist[]>, void>({
    //   query: () => "/reservation/expense/head",
    //   providesTags: () => [{ type: "ExpenseHead", id: EXPENSEHEAD }],
    // }),

    deleteRoomType: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/reservation/setting/room/room-type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "RoomTypes", id: ROOMTYPES }],
    }),

    updateRoomtypes: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/reservation/setting/room/room-type/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ type: "RoomTypes", id: ROOMTYPES }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    createRoomType: build.mutation<unknown, ICreateRoomTypes>({
      query: (data) => ({
        url: "/reservation/setting/room/room-type",
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "RoomTypes", id: ROOMTYPES }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getRoomTypelist: build.query<
      HTTPResponse<IViewRoomTypes[]>,
      { params?: string }
    >({
      query: (params) => {
        return {
          url: `/reservation/setting/room/room-type`,
          params,
        };
      },
      providesTags: () => [{ type: "RoomTypes", id: ROOMTYPES }],
    }),
  }),
});

export const {
  useCreateRoomTypeMutation,
  useGetRoomTypelistQuery,
  useDeleteRoomTypeMutation,
  useUpdateRoomtypesMutation,
} = RoomTypesEndPoint;
