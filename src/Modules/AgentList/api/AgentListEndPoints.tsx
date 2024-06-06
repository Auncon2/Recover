import { api } from "../../../app/api/userApi/api";
import { expire } from "../../../app/api/utils/unUsedExpireTimer";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../components/utils/Notification";
import {
  IViewAgent,
  IViewAgentDetails,
  IViewAgentProperties,
} from "../types/AgentList";
import { AGENTLIST } from "./AgentListConstant";

// import asyncWrapper from "../../../app/utils/asyncWrapper";
// import notification from "../../../components/utils/Notification";

const agentListApi = api.injectEndpoints({
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

    updateAgent: build.mutation<void, { id: number; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/admin/agents/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: () => [{ id: AGENTLIST, type: "AgentList" }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getAgentList: build.query<HTTPResponse<IViewAgent[]>, { data: string }>({
      query: ({ data: filterValue }) => ({
        url: `/admin/agents?verified=${
          filterValue === "all" ? "null" : filterValue
        }`,
      }),
      providesTags: () => [{ id: AGENTLIST, type: "AgentList" }],
    }),

    deleteAgent: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ id: AGENTLIST, type: "AgentList" }],
    }),

    getAgentDetails: build.query<HTTPResponse<IViewAgentDetails>, number>({
      query: (id) => `/admin/agent/info/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [{ id: AGENTLIST, type: "AgentList" }],
    }),

    getSingleAgent: build.query<HTTPResponse<void>, number>({
      query: (id) => `/admin/agent/info/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [{ id: AGENTLIST, type: "AgentList" }],
    }),

    getAgentProperties: build.query<HTTPResponse<IViewAgentProperties>, number>(
      {
        query: (id) => `/admin/property/user/${id}`,
        keepUnusedDataFor: expire.min,
        providesTags: () => [{ id: AGENTLIST, type: "AgentList" }],
      }
    ),
  }),
});

export const {
  useDeleteAgentMutation,
  useGetAgentDetailsQuery,
  useGetAgentListQuery,
  useUpdateAgentMutation,
  useGetSingleAgentQuery,
  useGetAgentPropertiesQuery,
} = agentListApi;
