import { api } from "../../../app/api/userApi/api";
import { expire } from "../../../app/api/utils/unUsedExpireTimer";
import asyncWrapper from "../../../app/utils/asyncWrapper";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import notification from "../../../components/utils/Notification";
import { IViewProjectList, IViewProjectView } from "../types/ProjectList";
import { PROJECTLIST } from "./ProjectListConstant";

// import asyncWrapper from "../../../app/utils/asyncWrapper";
// import notification from "../../../components/utils/Notification";

const projectListApi = api.injectEndpoints({
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

    updateProject: build.mutation<void, { id: any; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/admin/project/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: () => [{ id: PROJECTLIST, type: "Project" }],
      onQueryStarted: (_arg, { queryFulfilled }) => {
        asyncWrapper(async () => {
          await queryFulfilled;
          notification("success", "Successfully created");
        });
      },
    }),

    getProjectList: build.query<
      HTTPResponse<IViewProjectList[]>,
      { data: string }
    >({
      query: ({ data: filterValue }) => ({
        url: `/admin/project?status=${
          filterValue === "all" ? "null" : filterValue
        }`,
      }),
      providesTags: () => [{ id: PROJECTLIST, type: "Project" }],
    }),

    deleteProjectList: build.mutation<HTTPResponse<void>, { id: number }>({
      query: ({ id }) => ({
        url: `/admin/property/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ id: PROJECTLIST, type: "Project" }],
    }),

    getProjectDetails: build.query<HTTPResponse<IViewProjectView>, number>({
      query: (id) => `/admin/project/${id}`,
      keepUnusedDataFor: expire.min,
      providesTags: () => [{ id: PROJECTLIST, type: "Project" }],
    }),
  }),
});

export const {
  useDeleteProjectListMutation,
  useGetProjectDetailsQuery,
  useGetProjectListQuery,
  useUpdateProjectMutation,
} = projectListApi;
