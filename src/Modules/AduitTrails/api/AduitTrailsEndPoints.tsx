import { api } from "../../../app/api/userApi/api";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import { IViewAuditTrails } from "../types/AduitTrails";
import { AUDITTRAILLIST } from "./AduitTrails";

// import asyncWrapper from "../../../app/utils/asyncWrapper";
// import notification from "../../../components/utils/Notification";

const aduitTrailsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAuditTrails: build.query<
      HTTPResponse<IViewAuditTrails[]>,
      { data: string }
    >({
      query: () => ({
        url: `/admin/audit/trail`,
      }),
      providesTags: () => [{ id: AUDITTRAILLIST, type: "AuditTrails" }],
    }),
  }),
});

export const { useGetAuditTrailsQuery } = aduitTrailsApi;
