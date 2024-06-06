/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReAuth } from "../../slice/baseQuery";
import { setUser } from "../../features/userSlice";
import notification from "../../../components/utils/Notification";
import { ILoginResponse, IUser } from "../../../auth/types/loginTypes";
import asyncWrapper from "../../utils/asyncWrapper";
import { ROLE } from "../../../Modules/Administration/Role/api/constant";

export const PROFILE = "PROFILE_INFO";

export const userApi = createApi({
  baseQuery: baseQueryWithReAuth,
  reducerPath: "userApi",
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getMe: builder.query<ILoginResponse<IUser>, void>({
      query() {
        return {
          url: "/auth/hotel-admin/profile",
          credentials: "include",
        };
      },
      providesTags: () => [
        { type: "Profile" as any, id: PROFILE },

        { type: "Role", id: ROLE },
      ],

      transformErrorResponse: (response) => {
        if (response.status === 400 && response.data) {
          const { message: err } = response.data as {
            message: string;
            success: boolean;
          };
          //   message.error(`${err}`);
          notification("error", err);
        } else {
          // message.error('User name or password is incorrect!');
        }
      },
      //   result.data.data,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.data) {
            dispatch(setUser(data.data));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateProfile: builder.mutation<void, { data: any }>({
      query: ({ data }) => {
        return {
          // url: `/admin/profile`,
          url: `/auth/hotel-admin/profile`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: () => [{ id: PROFILE, type: "Profile" }],

      onQueryStarted: (_args, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),
    updatePassword: builder.mutation<void, { data: any }>({
      query: ({ data }) => {
        return {
          url: `/auth/hotel-admin/change-password`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: () => [{ id: PROFILE, type: "Profile" }],

      onQueryStarted: (_args, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Password updated successfully");
        });
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} = userApi;
