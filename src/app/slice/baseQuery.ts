/* eslint-disable prefer-const */
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../store/store";
import { setLogout } from "../features/userSlice";

// const baseURL = "http://192.168.0.192:9009/api/v1"; //jobayer server
// const baseURL = "http://192.168.0.190:9009/api/v1"; //iquball server
const baseURL = "https://hraoeivnaieurh-server.hotel360.world/api/v1"; // server Url

// const token = localStorage.getItem("access-token");

export const imageURL =
  "https://m360ict.s3.ap-south-1.amazonaws.com/reservation-storage/";
export const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include",
  prepareHeaders: async (headers, { getState }) => {
    const token = (getState() as RootState).userSlice.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result?.error?.status === 401 ||
    result?.error?.status === "CUSTOM_ERROR" ||
    result?.error?.status === "FETCH_ERROR" ||
    result?.error?.status === "PARSING_ERROR" ||
    result?.error?.status === "TIMEOUT_ERROR"
  ) {
    api.dispatch(setLogout());
  }

  return result;
};
