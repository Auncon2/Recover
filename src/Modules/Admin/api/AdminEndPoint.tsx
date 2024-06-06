/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */

// import { api } from '../../../../app/api/userApi/api';
// import asyncWrapper from '../../../../app/utils/asyncWrapper';
// import { HTTPResponse } from '../../../../app/utils/commonTypes';
// import notification from '../../../../common/Notification/Notification';
// import { IEventParams } from '../../../Events/types/EventTypes';
import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../common/Notification/Notification";
import { IAllAdmin } from "../types/AdminTypes";
import { admin } from "./constant";

export const AdminEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    // createAdmin: build.mutation<
    //   HTTPResponse<{ id: number; avatar: string }>,
    //   FormData
    // >({
    //   query: (body) => ({
    //     url: `/reservation/administration/admin`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: () => [{ type: "Admin", id: admin }],
    //   onQueryStarted: async (_arg, { queryFulfilled }) => {
    //     asyncWrapper(async () => {
    //       await queryFulfilled;
    //       notification("success", "Successfully Created");
    //     });
    //   },
    // }),
    createAdminRevservation: build.mutation<any, FormData>({
      query: (body) => ({
        url: `/reservation/administration/admin`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Admin", id: admin }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Created");
        });
      },
    }),

    getAdminList: build.query<HTTPResponse<IAllAdmin[]>, any>({
      query: (params) => {
        return {
          url: `/reservation/administration/admin`,
          params,
        };
      },
      providesTags: () => [{ type: "Admin", id: admin }],
    }),

    updateProfile: build.mutation<
      HTTPResponse<{ id: number; avatar: string }>,
      FormData
    >({
      query: (body) => ({
        url: `/auth/admin/profile`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: () => [{ type: "Admin", id: admin }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),

    getProfile: build.query<HTTPResponse<any>, void>({
      query: () => {
        return {
          url: `/auth/admin/profile`,
        };
      },
      providesTags: () => [{ type: "Admin", id: admin }],
    }),
  }),
});

// eslint-disable-next-line react-refresh/only-export-components
export const {
  useCreateAdminRevservationMutation,
  useGetAdminListQuery,
  useUpdateProfileMutation,
  useGetProfileQuery,
} = AdminEndPoint;
