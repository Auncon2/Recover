import { api } from "../../../app/api/userApi/api";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import { IViewRequest } from "../types/Request";
import { REQUEST } from "./RequestConstant";

// import asyncWrapper from "../../../app/utils/asyncWrapper";
// import notification from "../../../components/utils/Notification";

const requestApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRequest: build.query<HTTPResponse<IViewRequest[]>, void>({
      query: () => ({
        url: "/admin/project/delete",
      }),
      providesTags: () => [{ id: REQUEST, type: "Request" }],
    }),

    deleteRequest: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/admin/project/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ id: REQUEST, type: "Request" }],
    }),
  }),
});

export const { useDeleteRequestMutation, useGetRequestQuery } = requestApi;
