/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { api } from "../../../../app/api/userApi/api";
import { expire } from "../../../../app/api/utils/unUsedExpireTimer";
import asyncWrapper from "../../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../../app/utils/commonTypes";
import notification from "../../../../common/Notification/Notification";
import {
  IAllRole,
  ICreateRole,
  INewSingleRolePermission,
} from "../types/RoleTypes";
import { ROLE } from "./constant";

export const RoleEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getRolelist: build.query<HTTPResponse<IAllRole[]>, void>({
      query: () => {
        return {
          url: `/reservation/administration/role`,
        };
      },
      providesTags: () => [{ type: "Role", id: ROLE }],
    }),

    getSingleRole: build.query<HTTPResponse<INewSingleRolePermission>, number>({
      query: (id) => `/reservation/administration/role/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [{ type: "Role", id: ROLE }],
    }),

    createRole: build.mutation<HTTPResponse<{ id: number }>, ICreateRole>({
      query: (body) => ({
        url: "/admin/administration/role",
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Role", id: ROLE }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Created");
        });
      },
    }),
    createRoleAndPermission: build.mutation<HTTPResponse<{ id: number }>, any>({
      query: (body) => ({
        url: "/reservation/administration/role",
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Role", id: ROLE }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Created");
        });
      },
    }),
    updateRoleAndPermission: build.mutation<
      HTTPResponse<{ id: number }>,
      { id: number; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/reservation/administration/role/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Role", id: ROLE }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Updated");
        });
      },
    }),
  }),
});

export const {
  useGetRolelistQuery,
  useCreateRoleMutation,
  useGetSingleRoleQuery,
  useCreateRoleAndPermissionMutation,
  useUpdateRoleAndPermissionMutation,
} = RoleEndPoint;
