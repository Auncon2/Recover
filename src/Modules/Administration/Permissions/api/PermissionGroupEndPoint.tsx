/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { api } from "../../../../app/api/userApi/api";
import asyncWrapper from "../../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../../app/utils/commonTypes";
import notification from "../../../../common/Notification/Notification";
import {
  ICreatePermissionGroup,
  IPermissionGroup,
  IRole,
} from "../types/PermissionGroupTypes";
import { PERMESSION, PERMESSIONGROUP } from "./constant";

export const PermissionGroupEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getPermissionlist: build.query<HTTPResponse<any[]>, void>({
      query: () => {
        return {
          url: `/reservation/administration/permission`,
        };
      },
      providesTags: () => [{ type: "Permission", id: PERMESSION }],
    }),
    getPermissionGrouplist: build.query<HTTPResponse<IPermissionGroup[]>, void>(
      {
        query: () => {
          return {
            url: `/admin/administration/permission-group`,
          };
        },
        providesTags: () => [{ type: "PermissionGroup", id: PERMESSIONGROUP }],
      }
    ),
    createPermissionGroup: build.mutation<
      HTTPResponse<{ id: number }>,
      ICreatePermissionGroup
    >({
      query: (body) => ({
        url: "/admin/administration/permission-group",
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "PermissionGroup", id: PERMESSIONGROUP }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Created");
        });
      },
    }),
    createPermission: build.mutation<
      HTTPResponse<{ id: number }>,
      ICreatePermissionGroup
    >({
      query: (body) => ({
        url: "/admin/administration/permission",
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Permission", id: PERMESSION }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Created");
        });
      },
    }),
    createRolePermission: build.mutation<HTTPResponse<{ id: number }>, IRole>({
      query: (body) => ({
        url: "/admin/administration/role-permission",
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Permission", id: PERMESSION }],
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully Created");
        });
      },
    }),
  }),
});

export const {
  useGetPermissionGrouplistQuery,
  useCreatePermissionGroupMutation,
  useCreatePermissionMutation,
  useCreateRolePermissionMutation,
  useGetPermissionlistQuery,
} = PermissionGroupEndPoint;
