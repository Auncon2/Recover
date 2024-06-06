/* eslint-disable no-empty */
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { message } from "antd";
import { baseQueryWithReAuth } from "../../slice/baseQuery";
import { setToken } from "../../features/userSlice";
import asyncWrapper from "../../utils/asyncWrapper";
import { ILoginResponse, IUser } from "../../../auth/types/loginTypes";
import { USERLIST } from "../../../Modules/UserList/api/UserListConstant";
import { userApi } from "./userApi";

export const api = createApi({
  reducerPath: "TOAB_Api",
  baseQuery: baseQueryWithReAuth,
  // keepUnusedDataFor: expire.default,
  endpoints: (builder) => ({
    login: builder.mutation<
      ILoginResponse<IUser>,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/hotel-admin/login",
        method: "POST",
        body: body,
        credentials: "include",
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        asyncWrapper(async () => {
          const { data } = await queryFulfilled;

          console.log("Login_data", data);
          dispatch(setToken(data.token!));
          await dispatch(userApi.endpoints.getMe.initiate());
          message.success("Successfully logged in!");
        });
      },
    }),
  }),
  tagTypes: [...USERLIST, "HOTELPROFILE"],
});

export const { useLoginMutation } = api;

// /* eslint-disable no-empty */
// import { createApi } from "@reduxjs/toolkit/dist/query/react";
// import { message } from "antd";
// import { userApi } from "./userApi";
// import { baseQueryWithReAuth } from "../../slice/baseQuery";
// import { setToken } from "../../features/userSlice";
// import asyncWrapper from "../../utils/asyncWrapper";
// import { ILoginResponse, IUser } from "../../../auth/types/loginTypes";

// export const api = createApi({
//   reducerPath: "TOAB_Api",
//   baseQuery: baseQueryWithReAuth,
//   // keepUnusedDataFor: expire.default,
//   endpoints: (builder) => ({
//     login: builder.mutation<
//       ILoginResponse<IUser>,
//       { email: string; password: string }
//     >({
//       query: (body) => ({
//         url: "/auth/admin/login",
//         method: "POST",
//         body: body,
//         credentials: "include",
//       }),
//       onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
//         asyncWrapper(async () => {
//           const { data } = await queryFulfilled;
//           dispatch(setToken(data.token!));
//           await dispatch(userApi.endpoints.getMe.initiate());
//           message.success("Successfully logged in!");
//         });
//       },
//     }),
//   }),
//   tagTypes: ["Amenity"],
// });

// export const { useLoginMutation } = api;
