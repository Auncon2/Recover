import { api } from "../../../app/api/userApi/api";
import { expire } from "../../../app/api/utils/unUsedExpireTimer";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../components/utils/Notification";
import {
  IViewDeveloper,
  IViewDeveloperDetails,
} from "../types/DeveloperListTypes";
import { DEVELOPERLIST } from "./DeveloperListConstant";

// import asyncWrapper from "../../../app/utils/asyncWrapper";
// import notification from "../../../components/utils/Notification";

const developerListApi = api.injectEndpoints({
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

    updateDeveloper: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/admin/dev/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: () => [{ id: DEVELOPERLIST, type: "DeveloperList" }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getDeveloperList: build.query<
      HTTPResponse<IViewDeveloper[]>,
      { data: string }
    >({
      query: ({ data: filterValue }) => ({
        url: `/admin/developers?verified=${
          filterValue === "all" ? "null" : filterValue
        }`,
      }),
      providesTags: () => [{ id: DEVELOPERLIST, type: "DeveloperList" }],
    }),

    deleteDeveloper: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ id: DEVELOPERLIST, type: "DeveloperList" }],
    }),

    getDeveloperDetails: build.query<
      HTTPResponse<IViewDeveloperDetails>,
      number
    >({
      query: (id) => `/admin/dev/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [{ id: DEVELOPERLIST, type: "Developerlist" }],
    }),
  }),
});

export const {
  useDeleteDeveloperMutation,
  useGetDeveloperListQuery,
  useGetDeveloperDetailsQuery,
  useUpdateDeveloperMutation,
} = developerListApi;
