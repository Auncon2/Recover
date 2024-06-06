/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../../app/api/userApi/api";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { toasterNotification } from "../../../components/toasterNotification/ToasterNotification";

export const forgetPassEndpoint = api.injectEndpoints({
  endpoints: (build) => ({
    getOTP: build.mutation<void, any>({
      query: (body) => ({
        url: `/common/send-email-otp`,
        method: "POST",
        body: body,
      }),
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          toasterNotification("success", "Successfully OTP Send");
        });
      },
    }),

    sendOTP: build.mutation<any, any>({
      query: (body) => ({
        url: `/common/match-email-otp`,
        method: "POST",
        body: body,
      }),
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          toasterNotification("success", "Successfully OTP Match");
        });
      },
    }),

    changePassword: build.mutation<any, any>({
      query: (body) => ({
        url: `/auth/hotel-admin/forget-password`,
        method: "POST",
        body: body,
      }),
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          toasterNotification("success", "Successfully change password");
        });
      },
    }),
  }),
});

export const {
  useGetOTPMutation,
  useSendOTPMutation,
  useChangePasswordMutation,
} = forgetPassEndpoint;
