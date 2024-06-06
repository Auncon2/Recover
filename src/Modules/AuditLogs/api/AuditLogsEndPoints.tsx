import { api } from "../../../app/api/userApi/api";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import { IViewAuditLogs } from "../types/AuditLogs";
import { AUDITLOGSLIST } from "./AuditLogsConstant";

// import asyncWrapper from "../../../app/utils/asyncWrapper";
// import notification from "../../../components/utils/Notification";

const projectListApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAuditLogs: build.query<HTTPResponse<IViewAuditLogs[]>, { data: string }>(
      {
        query: ({ data: filterValue }) => ({
          url: `/admin/audit/logs?status=${
            filterValue === "all" ? "null" : filterValue
          }`,
        }),
        providesTags: () => [{ id: AUDITLOGSLIST, type: "AuditLogs" }],
      }
    ),
  }),
});

export const { useGetAuditLogsQuery } = projectListApi;
